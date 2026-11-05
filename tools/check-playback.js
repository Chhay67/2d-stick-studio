const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const puppeteer = require('puppeteer-core');

async function main() {
  const server = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'), env: { ...process.env, PORT: '8100' }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe']
  });
  let browser;
  try {
    await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); server.once('exit', () => reject(new Error('QA server exited'))); });
    const executablePath = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find((file) => file && fs.existsSync(file));
    browser = await puppeteer.launch({ executablePath, headless: true });
    const page = await browser.newPage();
    const runtimeErrors = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    await page.goto('http://localhost:8100/', { waitUntil: 'networkidle0' });
    // Test a fast transition using estimated audio; no real recordings are needed.
    await page.evaluate(() => {
      window.EP02_DAILY_EXERCISE.SHOTS.forEach((shot) => shot.lines?.forEach((line) => { line.dur = 0.15; }));
      window.ScenePlayer.loadShot(0, false);
      document.getElementById('btnPlayShot8s').click();
    });
    let status = await page.evaluate(() => window.ScenePlayer.getPlaybackStatus());
    assert.equal(status.playing, false, 'manual Play started during transition');
    assert(status.readyAt - status.now > 1200, 'entrance and lead-in were not reserved');
    await page.waitForFunction(() => window.ScenePlayer.getPlaybackStatus().playing);
    status = await page.evaluate(() => window.ScenePlayer.getPlaybackStatus());
    assert(status.now >= status.readyAt, 'manual Play outran entrance');
    // Stop, restart in full-episode mode and inspect the next shot's entrance.
    await page.click('#btnPlayShot8s');
    await page.evaluate(() => window.ScenePlayer.loadShot(0, false));
    await page.click('#btnPlayEpisodeAll');
    await page.waitForFunction(() => window.ScenePlayer.getPlaybackStatus().shotIndex === 1);
    status = await page.evaluate(() => window.ScenePlayer.getPlaybackStatus());
    assert.equal(status.playing, false, 'next shot started before its wipe');
    await page.waitForFunction(() => window.ScenePlayer.getPlaybackStatus().playing);
    status = await page.evaluate(() => window.ScenePlayer.getPlaybackStatus());
    assert(status.now >= status.readyAt, 'auto-advance outran entrance');
    await page.click('#btnPlayEpisodeAll');
    // Cancelling a queued single-shot start must not start later.
    await page.evaluate(() => { window.ScenePlayer.loadShot(0, false); document.getElementById('btnPlayShot8s').click(); document.getElementById('btnPlayShot8s').click(); });
    await page.waitForFunction(() => { const s = window.ScenePlayer.getPlaybackStatus(); return s.now > s.readyAt + 100; });
    status = await page.evaluate(() => window.ScenePlayer.getPlaybackStatus());
    assert.equal(status.playing, false, 'cancelled playback restarted');
    // Speed changes must preserve position and scale the shot clock immediately.
    await page.evaluate(() => {
      window.EP02_DAILY_EXERCISE.SHOTS[0].lines.forEach((line) => { line.dur = 10; });
      window.ScenePlayer.loadShot(0, false);
    });
    await page.select('#episodePlaybackSpeed', '2');
    await page.click('#btnPlayEpisodeAll');
    await page.waitForFunction(() => window.ScenePlayer.getPlaybackStatus().playing);
    for (const speed of [2, 4]) {
      const before = await page.evaluate(() => window.ScenePlayer.getPlaybackStatus());
      await page.select('#episodePlaybackSpeed', String(speed));
      const after = await page.evaluate(() => window.ScenePlayer.getPlaybackStatus());
      assert(Math.abs(after.elapsed - before.elapsed) < 0.5, 'speed change jumped the timeline');
      const sample = await page.evaluate(() => new Promise((resolve) => {
        const a = window.ScenePlayer.getPlaybackStatus();
        setTimeout(() => resolve({ a, b: window.ScenePlayer.getPlaybackStatus() }), 600);
      }));
      const measured = (sample.b.elapsed - sample.a.elapsed) * 1000 / (sample.b.now - sample.a.now);
      assert(Math.abs(measured - speed) < 0.4, `expected ${speed}x clock, got ${measured}`);
    }
    await page.click('#btnPlayEpisodeAll');
    await page.click('#btnPlayShot8s');
    await page.waitForFunction(() => window.ScenePlayer.getPlaybackStatus().playing);
    assert.equal(await page.evaluate(() => window.ScenePlayer.getPlaybackStatus().speed), 1, 'single-shot preview inherited episode speed');
    await page.click('#btnPlayShot8s');
    assert.deepEqual(runtimeErrors, []);
    console.log('PASS: transitions, cancellation, 2x/4x clock, live speed changes and single-shot isolation.');
  } finally { if (browser) await browser.close(); server.kill(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
