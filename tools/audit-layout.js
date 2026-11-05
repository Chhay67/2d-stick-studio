// Uses the existing Puppeteer dependency; no Browser plugin or Playwright runtime is installed.
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer-core');
const { spawn } = require('node:child_process');
const { compileLines } = require('../engine/timeline');
async function main() {
  const server = process.argv.includes('--serve') ? spawn(process.execPath, ['server.js'], {
    cwd: path.join(__dirname, '..'), env: { ...process.env, PORT: '8099' }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe']
  }) : null;
  if (server) {
    process.env.PORT = '8099';
    await new Promise((resolve, reject) => {
      server.stdout.once('data', resolve);
      server.once('error', reject);
      server.once('exit', (code) => reject(new Error('QA server exited: ' + code)));
    });
  }
  const executablePath = [process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  ].find((file) => file && fs.existsSync(file));
  if (!executablePath) throw new Error('Set CHROME_PATH to Chrome or Edge');
  let browser;
  const errors = [], layout = [];
  try {
    browser = await puppeteer.launch({ executablePath, headless: true });
    const page = await browser.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`http://localhost:${process.env.PORT || 8080}/?exportMode=1`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const identity = await page.evaluate(() => ({ title: document.title, textLength: document.body.innerText.length,
      decks: [...document.querySelectorAll('#selectEpisodeDeck option')].map((el) => el.value) }));
    if (identity.decks.includes('ep01')) errors.push('Removed episode still selectable');
    const deck = process.argv.slice(2).find((arg) => !arg.startsWith('--')) || 'ep02';
    const info = await page.evaluate((id) => window.ScenePlayer.getExportDeckInfo(id), deck);
    fs.mkdirSync(path.join(__dirname, '..', 'exports', 'qa'), { recursive: true });
    let frames = 0;
    for (const aspect of ['16:9', '9:16', '1:1']) {
      const [width, height] = aspect === '16:9' ? [1920,1080] : aspect === '9:16' ? [1080,1920] : [1080,1080];
      await page.setViewport({ width, height });
      for (const shot of info.shots) {
        const prepared = await page.evaluate((opts) => window.ScenePlayer.prepareExportShot(opts), { deck, shotIndex: shot.index, aspect });
        const duration = prepared.duration;
        const lineTimes = shot.lines ? compileLines(shot.lines).clips.map((clip) => Number(((clip.start + clip.end) / 2).toFixed(2))) : [];
        if (process.argv.includes('--jitter')) {
          const jitter = await page.evaluate((duration) => {
            const findings = [];
            let previous = null;
            for (let frame = 0; frame <= Math.ceil(duration * 10); frame++) {
              const t = frame / 10;
              window.ScenePlayer.stepExportFrame(t, 0.3, false);
              const bubble = [...document.querySelectorAll('.ep02-speaker-dialog')].find((el) => {
                const [start, end] = el.dataset.speakWindow.split(',').map(Number);
                return t > start + 0.4 && t < end - 0.4;
              });
              if (!bubble) { previous = null; continue; }
              const current = { line: bubble.dataset.speakLine, top: parseFloat(bubble.style.top),
                left: parseFloat(bubble.style.left), height: bubble.offsetHeight,
                font: getComputedStyle(bubble.querySelector('.ep02-speaker-dialog-text')).fontSize };
              if (previous && previous.line === current.line && (current.height !== previous.height || current.font !== previous.font ||
                Math.abs(current.top - previous.top) > 2 || Math.abs(current.left - previous.left) > 2)) {
                findings.push(`JITTER: line ${current.line} at ${t.toFixed(1)}s`);
              }
              previous = current;
            }
            return findings;
          }, duration);
          layout.push(...jitter.map((issue) => ({ aspect, shot: shot.id, issue })));
        }
        for (const time of [...new Set([2, 10, Math.max(12, duration - 1), ...lineTimes])]) {
          const findings = await page.evaluate((t) => {
            window.ScenePlayer.stepExportFrame(t, 0.3, false);
            const stage = document.getElementById('animationStage').getBoundingClientRect();
            const children = [...document.querySelectorAll('#infographicContainer > *')].filter((el) => {
              const style = getComputedStyle(el);
              return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.1;
            });
            const rects = children.map((el) => ({ label: el.id || el.className, rect: el.getBoundingClientRect() }));
            const issues = [];
            if (Math.abs(stage.width - innerWidth) > 2 || Math.abs(stage.height - innerHeight) > 2) issues.push('FRAME: stage does not fill export viewport');
            for (const { label, rect: r } of rects) {
              if (r.width && r.height && (r.left < stage.left - 2 || r.top < stage.top - 2 || r.right > stage.right + 2 || r.bottom > stage.bottom + 2)) issues.push('OVERFLOW: ' + label);
            }
            for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
              const a = rects[i], b = rects[j];
              if (Math.min(a.rect.right,b.rect.right) - Math.max(a.rect.left,b.rect.left) > 3 &&
                Math.min(a.rect.bottom,b.rect.bottom) - Math.max(a.rect.top,b.rect.top) > 3) issues.push('OVERLAP: ' + a.label + ' / ' + b.label);
            }
            if (!document.querySelector('#infographicContainer > *')) issues.push('EMPTY: infographic');
            if (document.getElementById('infographicContainer').dataset.aspect === '9:16') {
              children.filter((el) => el.id === 'animCardPrimary' || el.matches('.ep-intro-hook-card, .broll-cutaway-card, .director-outro-card')).forEach((el) => {
                if (Number(getComputedStyle(el).opacity) < 0.99) return;
                const r = el.getBoundingClientRect();
                if (Math.abs((r.left - stage.left) / stage.width - 0.05) > 0.003 || Math.abs(r.width / stage.width - 0.9) > 0.003) issues.push('MARGINS: TikTok info panel must have 5% each side');
              });
            }
            const info = document.getElementById('infographicContainer');
            if (document.querySelector('.km-key-tracker')) {
              const tracker = document.querySelector('.km-key-tracker').getBoundingClientRect();
              children.filter((el) => el.classList.contains('ref-speech-bubble')).forEach((bubble) => {
                const tag = bubble.querySelector('.ref-speaker-tag').getBoundingClientRect();
                const text = bubble.querySelector('.ep02-speaker-dialog-text');
                if (tag.top < tracker.bottom + 4) issues.push('OVERLAP: speaker tag / chapter header');
                if (text.scrollWidth > text.clientWidth + 1 || text.scrollHeight > text.clientHeight + 1) issues.push('OVERFLOW: dialogue text');
              });
            }
            return issues;
          }, time);
          layout.push(...findings.map((issue) => ({ aspect, shot: shot.id, time, issue })));
          if (shot.index === 0 && time === 10) {
            await page.screenshot({ path: path.join(__dirname, '..', 'exports', 'qa', `stage-${aspect.replace(':','x')}.png`) });
          }
          if (shot.index === 1 && time === lineTimes[4]) {
            await page.screenshot({ path: path.join(__dirname, '..', 'exports', 'qa', `shot02-${aspect.replace(':','x')}.png`) });
          }
          if (time === lineTimes[1]) {
            await page.screenshot({ path: path.join(__dirname, '..', 'exports', 'qa', `dialogue-shot${String(shot.index + 1).padStart(2, '0')}-${aspect.replace(':','x')}.png`) });
          }
          if (aspect === '9:16' && time === lineTimes[3]) {
            await page.screenshot({ path: path.join(__dirname, '..', 'exports', 'qa', `info-shot${String(shot.index + 1).padStart(2, '0')}-9x16.png`) });
          }
          if (shot.index === 2 && time === lineTimes[2]) {
            await page.screenshot({ path: path.join(__dirname, '..', 'exports', 'qa', `long-dialogue-shot03-${aspect.replace(':','x')}.png`) });
          }
          frames++;
        }
      }
    }
    // Exercise actual studio controls in normal preview mode.
    await page.goto(`http://localhost:${process.env.PORT || 8080}/`, { waitUntil: 'networkidle0' });
    const previewTextLength = await page.evaluate(() => document.body.innerText.length);
    if (previewTextLength < 100) errors.push('Blank studio');
    await page.click('#btn-aspect-1-1');
    const dimensions = await page.$eval('#stageDimensionsBadge', (el) => el.textContent);
    if (!dimensions.includes('1080')) errors.push('Aspect control did not update dimensions');
    // Format switches must fit immediately while stopped, not only on the first playback frame.
    for (const shot of info.shots) {
      await page.evaluate((index) => window.ScenePlayer.loadShot(index, false), shot.index);
      await page.click('#btn-aspect-9-16');
      await page.click('#btn-aspect-1-1');
      await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 500)));
      const clipped = await page.evaluate(() => {
        const stage = document.getElementById('animationStage').getBoundingClientRect();
        return [...document.querySelectorAll('#infographicContainer > *')].filter((el) => {
          if (getComputedStyle(el).display === 'none') return false;
          const r = el.getBoundingClientRect();
          return r.width && r.height && (r.left < stage.left - 2 || r.right > stage.right + 2 || r.top < stage.top - 2 || r.bottom > stage.bottom + 2);
        }).map((el) => el.id || el.className);
      });
      clipped.forEach((element) => errors.push('Facebook format-switch overflow: ' + shot.id + ': ' + element));
    }
    await page.evaluate(() => window.ScenePlayer.loadShot(0, false));
    fs.mkdirSync(path.join(__dirname, '..', 'exports', 'qa'), { recursive: true });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.screenshot({ path: path.join(__dirname, '..', 'exports', 'qa', 'studio.png') });
    const report = { identity: { ...identity, previewTextLength }, frames, errors, layout };
    fs.writeFileSync(path.join(__dirname, '..', 'exports', 'qa', 'layout.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ ...report, layout: layout.slice(0, 12), totalLayoutIssues: layout.length }, null, 2));
    if (errors.length || layout.length) process.exitCode = 1;
  } finally { if (browser) await browser.close(); if (server) server.kill(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
