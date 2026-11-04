#!/usr/bin/env node
/**
 * Khmer 2D Educational Animation Studio — Deterministic 1080p MP4 Video Exporter
 * Uses Headless Chrome/Edge (puppeteer-core) + 3-Stem Audio Synthesizer + FFmpeg (ffmpeg-static)
 *
 * Usage Examples:
 *   node export-video.js --deck ep01 --shot 1 --aspect 16:9 --fps 30
 *   node export-video.js --deck ep01 --aspect 16:9 --fps 60
 *   node export-video.js --deck ep01 --aspect 9:16 --fps 30
 */

const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const puppeteer = require('puppeteer-core');
const ffmpegPath = require('ffmpeg-static');

const ROOT = __dirname;
const EXPORTS_DIR = path.join(ROOT, 'exports');

const BGM_PROGRESSIONS = {
  curious: [261.63, 329.63, 392.0, 523.25, 293.66, 349.23, 440.0, 523.25],
  story: [246.94, 293.66, 369.99, 440.0, 220.0, 261.63, 329.63, 392.0],
  investigation: [220.0, 261.63, 329.63, 440.0, 196.0, 246.94, 293.66, 392.0],
  uplifting: [261.63, 329.63, 392.0, 493.88, 293.66, 369.99, 440.0, 587.33]
};

function findBrowserExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ].filter(Boolean);

  for (const exe of candidates) {
    if (fs.existsSync(exe)) return exe;
  }
  throw new Error('Could not find Chrome or Edge executable on this machine. Set CHROME_PATH environment variable.');
}

function getResolutionForAspect(aspect) {
  if (aspect === '9:16') return { width: 1080, height: 1920, tag: '9x16' };
  if (aspect === '1:1') return { width: 1080, height: 1080, tag: '1x1' };
  return { width: 1920, height: 1080, tag: '16x9' };
}

function decodeVoiceAudioToFloat32(voiceBaseRel) {
  if (!voiceBaseRel) return null;
  for (const ext of ['.wav', '.mp3']) {
    const fullPath = path.join(ROOT, voiceBaseRel + ext);
    if (fs.existsSync(fullPath)) {
      const res = spawnSync(
        ffmpegPath,
        ['-v', 'error', '-i', fullPath, '-f', 's16le', '-ac', '1', '-ar', '48000', 'pipe:1'],
        { maxBuffer: 64 * 1024 * 1024 }
      );
      if (res.status === 0 && res.stdout && res.stdout.length > 0) {
        const sampleCount = Math.floor(res.stdout.length / 2);
        const samples = new Float32Array(sampleCount);
        for (let i = 0; i < sampleCount; i++) {
          samples[i] = res.stdout.readInt16LE(i * 2) / 32768.0;
        }
        return {
          samples,
          duration: Number((sampleCount / 48000).toFixed(2)),
          filePath: fullPath
        };
      }
    }
  }
  return null;
}

function addSynthesizedSfx(leftCh, rightCh, sampleRate, startSec, sfxName) {
  const startIdx = Math.max(0, Math.floor(startSec * sampleRate));

  if (sfxName === 'whoosh_paper') {
    const dur = 0.36;
    const len = Math.floor(dur * sampleRate);
    let lp = 0;
    for (let i = 0; i < len && startIdx + i < leftCh.length; i++) {
      const t = i / sampleRate;
      const env = Math.sin((t / dur) * Math.PI) * 0.16;
      const raw = (Math.random() * 2 - 1) * env;
      lp = lp * 0.82 + raw * 0.18;
      leftCh[startIdx + i] += lp;
      rightCh[startIdx + i] += lp;
    }
    return;
  }

  if (sfxName === 'counter_ticks') {
    for (let k = 0; k < 10; k++) {
      const tickStart = startIdx + Math.floor(k * 0.085 * sampleRate);
      const tickLen = Math.floor(0.045 * sampleRate);
      const freq = 520 + k * 45;
      for (let i = 0; i < tickLen && tickStart + i < leftCh.length; i++) {
        const t = i / sampleRate;
        const env = Math.exp(-t * 65) * 0.1;
        const val = Math.sin(2 * Math.PI * freq * t) * env;
        leftCh[tickStart + i] += val;
        rightCh[tickStart + i] += val;
      }
    }
    return;
  }

  if (sfxName === 'chime_highlight') {
    [587.33, 880].forEach((freq, idx) => {
      const nStart = startIdx + Math.floor(idx * 0.09 * sampleRate);
      const nLen = Math.floor(0.52 * sampleRate);
      for (let i = 0; i < nLen && nStart + i < leftCh.length; i++) {
        const t = i / sampleRate;
        const env = Math.exp(-t * 7.5) * 0.14;
        const val = Math.sin(2 * Math.PI * freq * t) * env;
        leftCh[nStart + i] += val;
        rightCh[nStart + i] += val;
      }
    });
    return;
  }

  if (sfxName === 'alert_coral') {
    [440, 349.23].forEach((freq, idx) => {
      const nStart = startIdx + Math.floor(idx * 0.14 * sampleRate);
      const nLen = Math.floor(0.24 * sampleRate);
      for (let i = 0; i < nLen && nStart + i < leftCh.length; i++) {
        const t = i / sampleRate;
        const env = Math.exp(-t * 14) * 0.13;
        const val = Math.sin(2 * Math.PI * freq * t) * env;
        leftCh[nStart + i] += val;
        rightCh[nStart + i] += val;
      }
    });
    return;
  }

  // Default: pop_soft
  const popLen = Math.floor(0.11 * sampleRate);
  for (let i = 0; i < popLen && startIdx + i < leftCh.length; i++) {
    const t = i / sampleRate;
    const freq = 340 + (620 - 340) * (t / 0.11);
    const env = Math.exp(-t * 32) * 0.15;
    const val = Math.sin(2 * Math.PI * freq * t) * env;
    leftCh[startIdx + i] += val;
    rightCh[startIdx + i] += val;
  }
}

function buildMasterAudioAndSchedules(shots, fps, isMultiShotEpisode) {
  const sampleRate = 48000;
  const shotSchedules = [];
  let totalDurationSec = 0;

  for (let i = 0; i < shots.length; i++) {
    const shot = shots[i];
    const decodedVoice = decodeVoiceAudioToFloat32(shot.voiceBase);
    const voiceDur = decodedVoice ? decodedVoice.duration : shot.defaultDuration || 8.0;
    const tailPause = isMultiShotEpisode && i < shots.length - 1 ? 0.55 : 0.25;
    const shotTotalDur = Number((voiceDur + tailPause).toFixed(3));
    const frameCount = Math.max(1, Math.round(shotTotalDur * fps));

    // Precompute per-frame mouthOpen (0..1) from real PCM RMS or syllable wave
    const mouthFrames = new Float32Array(frameCount);
    const windowSamples = Math.floor(0.035 * sampleRate);
    for (let f = 0; f < frameCount; f++) {
      const tSec = f / fps;
      if (tSec > voiceDur) {
        mouthFrames[f] = 0;
      } else if (decodedVoice) {
        const centerSample = Math.floor(tSec * sampleRate);
        const s0 = Math.max(0, centerSample - windowSamples);
        const s1 = Math.min(decodedVoice.samples.length, centerSample + windowSamples);
        let sumSq = 0;
        for (let s = s0; s < s1; s++) {
          sumSq += decodedVoice.samples[s] * decodedVoice.samples[s];
        }
        const rms = s1 > s0 ? Math.sqrt(sumSq / (s1 - s0)) : 0;
        mouthFrames[f] = Math.min(1, rms * 4.5);
      } else {
        const wave = Math.sin(tSec * 8.5 * Math.PI) * Math.cos(tSec * 2.3 * Math.PI);
        mouthFrames[f] = Math.max(0, wave);
      }
    }

    shotSchedules.push({
      shot,
      decodedVoice,
      voiceDur,
      shotTotalDur,
      frameCount,
      startTimeInMaster: totalDurationSec,
      mouthFrames
    });
    totalDurationSec += shotTotalDur;
  }

  const totalSamples = Math.ceil(totalDurationSec * sampleRate) + sampleRate;
  const leftCh = new Float32Array(totalSamples);
  const rightCh = new Float32Array(totalSamples);

  shotSchedules.forEach((sched, idx) => {
    const baseSample = Math.floor(sched.startTimeInMaster * sampleRate);

    // Stem 1: VOICE-NARRATOR-001 (0 dB)
    if (sched.decodedVoice) {
      const vSamples = sched.decodedVoice.samples;
      for (let i = 0; i < vSamples.length && baseSample + i < totalSamples; i++) {
        const v = vSamples[i] * 0.92;
        leftCh[baseSample + i] += v;
        rightCh[baseSample + i] += v;
      }
    }

    // Stem 2: Continuous BGM with Smart Auto-Ducking (-18 dB under speech)
    const notes = BGM_PROGRESSIONS[sched.shot.bgmMood] || BGM_PROGRESSIONS.curious;
    const stepDur = 0.52;
    const stepsCount = Math.floor(sched.shotTotalDur / stepDur);
    for (let step = 0; step < stepsCount; step++) {
      const localSec = step * stepDur;
      const frameIdx = Math.min(sched.frameCount - 1, Math.floor(localSec * fps));
      const isSpeaking = sched.mouthFrames[frameIdx] > 0.05;
      const bgmGain = isSpeaking ? 0.022 : 0.056;
      const freq = notes[step % notes.length];
      const noteStart = baseSample + Math.floor(localSec * sampleRate);
      const noteLen = Math.floor(0.5 * sampleRate);

      for (let i = 0; i < noteLen && noteStart + i < totalSamples; i++) {
        const t = i / sampleRate;
        const env = Math.min(1, t / 0.05) * Math.exp(-t * 5.5) * bgmGain;
        const sig = (Math.sin(2 * Math.PI * freq * t) + 0.45 * Math.sin(Math.PI * freq * t)) * env;
        leftCh[noteStart + i] += sig * 0.95;
        rightCh[noteStart + i] += sig * 1.05;
      }
    }

    // Stem 3A: Scene Entrance Transition SFX
    if (idx > 0 || isMultiShotEpisode) {
      addSynthesizedSfx(leftCh, rightCh, sampleRate, sched.startTimeInMaster, 'whoosh_paper');
      addSynthesizedSfx(leftCh, rightCh, sampleRate, sched.startTimeInMaster + 0.08, 'chime_highlight');
    }

    // Stem 3B: Point SFX Cues (shot.sfxCues)
    if (Array.isArray(sched.shot.sfxCues)) {
      sched.shot.sfxCues.forEach((cue) => {
        if (typeof cue.at === 'number' && cue.sfx) {
          addSynthesizedSfx(leftCh, rightCh, sampleRate, sched.startTimeInMaster + cue.at, cue.sfx);
        }
      });
    }
  });

  return {
    sampleRate,
    totalDurationSec,
    shotSchedules,
    leftCh,
    rightCh
  };
}

function writeStereoWavFile(filePath, leftCh, rightCh, sampleRate, durationSec) {
  const numSamples = Math.min(leftCh.length, Math.ceil(durationSec * sampleRate));
  const dataSize = numSamples * 4; // 2 channels * 2 bytes
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // PCM chunk size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(2, 22);  // Stereo
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 4, 28);
  buffer.writeUInt16LE(4, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const l = Math.max(-1, Math.min(1, leftCh[i]));
    const r = Math.max(-1, Math.min(1, rightCh[i]));
    buffer.writeInt16LE(Math.round(l * 32767), offset);
    buffer.writeInt16LE(Math.round(r * 32767), offset + 2);
    offset += 4;
  }

  fs.writeFileSync(filePath, buffer);
}

async function runDeterministicVideoExport(options = {}) {
  const deck = options.deck || 'ep01';
  const shotNumber = options.shot ? parseInt(options.shot, 10) : null; // 1-based shot number or null for full episode
  const aspect = options.aspect || '16:9';
  const fps = parseInt(options.fps || 30, 10);
  const port = options.port || process.env.PORT || 8080;
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : () => {};

  if (!fs.existsSync(EXPORTS_DIR)) {
    fs.mkdirSync(EXPORTS_DIR, { recursive: true });
  }

  const { width, height, tag } = getResolutionForAspect(aspect);
  const scopeSlug = shotNumber ? `shot_0${shotNumber}` : 'full_episode';
  const outFileName = `${deck}_${scopeSlug}_${tag}_${fps}fps.mp4`;
  const outFilePath = path.join(EXPORTS_DIR, outFileName);
  const tempWavPath = path.join(EXPORTS_DIR, `_temp_audio_${Date.now()}.wav`);

  onProgress({ percent: 2, message: 'Launching Headless Browser...' });
  const executablePath = findBrowserExecutable();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    defaultViewport: { width, height, deviceScaleFactor: 1 },
    args: ['--no-sandbox', '--disable-gpu-vsync', '--font-render-hinting=none']
  });

  try {
    const page = await browser.newPage();
    const studioUrl = `http://localhost:${port}/?exportMode=1`;
    onProgress({ percent: 5, message: `Loading Studio Stage (${width}×${height})...` });
    await page.goto(studioUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Fetch deck metadata from ScenePlayer
    const deckInfo = await page.evaluate((d) => window.ScenePlayer.getExportDeckInfo(d), deck);
    let targetShots = deckInfo.shots;
    if (shotNumber !== null) {
      const picked = targetShots[shotNumber - 1];
      if (!picked) {
        throw new Error(`Shot ${shotNumber} not found in deck "${deck}" (available: 1..${targetShots.length})`);
      }
      targetShots = [picked];
    }

    const isMultiShot = targetShots.length > 1;
    onProgress({ percent: 8, message: 'Mixing 3-Stem Master Audio (Voice + Auto-Ducked BGM + SFX)...' });
    const audioMaster = buildMasterAudioAndSchedules(targetShots, fps, isMultiShot);
    writeStereoWavFile(
      tempWavPath,
      audioMaster.leftCh,
      audioMaster.rightCh,
      audioMaster.sampleRate,
      audioMaster.totalDurationSec
    );

    const totalFramesAll = audioMaster.shotSchedules.reduce((acc, s) => acc + s.frameCount, 0);

    // Spawn FFmpeg pipeline
    const ffArgs = [
      '-y',
      '-f', 'image2pipe',
      '-vcodec', 'mjpeg',
      '-framerate', String(fps),
      '-i', 'pipe:0',
      '-i', tempWavPath,
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '18',
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      '-b:a', '256k',
      '-shortest',
      '-movflags', '+faststart',
      outFilePath
    ];

    const ffProc = spawn(ffmpegPath, ffArgs, { stdio: ['pipe', 'ignore', 'pipe'] });
    let ffErrorLog = '';
    ffProc.stderr.on('data', (chunk) => {
      ffErrorLog += chunk.toString();
    });

    const ffDonePromise = new Promise((resolve, reject) => {
      ffProc.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`FFmpeg exited with code ${code}: ${ffErrorLog.slice(-300)}`));
      });
      ffProc.on('error', reject);
    });

    let renderedFrames = 0;

    for (let sIdx = 0; sIdx < audioMaster.shotSchedules.length; sIdx++) {
      const sched = audioMaster.shotSchedules[sIdx];
      await page.evaluate(
        (opts) => window.ScenePlayer.prepareExportShot(opts),
        {
          deck,
          shotIndex: sched.shot.index,
          aspect,
          duration: sched.voiceDur
        }
      );

      const includeEntranceTransition = isMultiShot || sIdx > 0;

      for (let f = 0; f < sched.frameCount; f++) {
        const elapsedSec = f / fps;
        const mouthOpen = sched.mouthFrames[f];

        await page.evaluate(
          (t, m, incTrans) => window.ScenePlayer.stepExportFrame(t, m, incTrans),
          elapsedSec,
          mouthOpen,
          includeEntranceTransition
        );

        const frameBuffer = await page.screenshot({ type: 'jpeg', quality: 95 });
        const canWrite = ffProc.stdin.write(frameBuffer);
        if (!canWrite) {
          await new Promise((r) => ffProc.stdin.once('drain', r));
        }

        renderedFrames++;
        if (renderedFrames % 5 === 0 || renderedFrames === totalFramesAll) {
          const pct = Math.min(98, Math.round(10 + (renderedFrames / totalFramesAll) * 88));
          const msg = `Rendering Shot ${sIdx + 1}/${audioMaster.shotSchedules.length} • Frame ${renderedFrames}/${totalFramesAll} (${elapsedSec.toFixed(1)}s / ${sched.shotTotalDur.toFixed(1)}s)`;
          onProgress({ percent: pct, message: msg });
        }
      }
    }

    onProgress({ percent: 99, message: 'Finalizing H.264 MP4 container...' });
    ffProc.stdin.end();
    await ffDonePromise;

    if (fs.existsSync(tempWavPath)) {
      fs.unlinkSync(tempWavPath);
    }

    const relOutput = `exports/${outFileName}`;
    onProgress({ percent: 100, message: `Export Complete: ${relOutput}`, outputFile: relOutput });
    return { outputFile: relOutput, fullPath: outFilePath, totalFrames: totalFramesAll, durationSec: audioMaster.totalDurationSec };
  } finally {
    await browser.close();
    if (fs.existsSync(tempWavPath)) {
      try { fs.unlinkSync(tempWavPath); } catch (_) {}
    }
  }
}

// Allow running directly from CLI: node export-video.js --deck ep01 --shot 1 --aspect 16:9 --fps 30
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (flag, fallback) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
  };

  const opts = {
    deck: getArg('--deck', 'ep01'),
    shot: getArg('--shot', null),
    aspect: getArg('--aspect', '16:9'),
    fps: parseInt(getArg('--fps', '30'), 10),
    onProgress: ({ percent, message }) => {
      process.stdout.write(`\r[${String(percent).padStart(3, ' ')}%] ${message.padEnd(76, ' ')}`);
    }
  };

  console.log(`\n🎬 Starting Khmer 2D Studio Deterministic MP4 Export...`);
  console.log(`   Deck: ${opts.deck} | Scope: ${opts.shot ? 'Shot ' + opts.shot : 'Full Episode'} | Aspect: ${opts.aspect} | FPS: ${opts.fps}\n`);

  runDeterministicVideoExport(opts)
    .then((res) => {
      console.log(`\n\n✅ Successfully exported MP4 video!`);
      console.log(`   File: ${res.fullPath}`);
      console.log(`   Duration: ${res.durationSec.toFixed(2)}s (${res.totalFrames} frames)\n`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(`\n\n❌ Export Failed:`, err.message);
      process.exit(1);
    });
}

module.exports = { runDeterministicVideoExport };
