/**
 * 100% Royalty-Free / CC0 Procedural WAV Sound Effect Generator
 * Mathematically synthesizes 44.1kHz 16-bit mono .wav files directly from pure waveforms.
 * Zero external samples — 100% Commercial & Monetization Safe for YouTube, Facebook, and TikTok.
 */

const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;

function writeWavFile(filename, samples) {
  const numSamples = samples.length;
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt Subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);        // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);         // AudioFormat (1 = PCM)
  buffer.writeUInt16LE(1, 22);         // NumChannels (1 = Mono)
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28); // ByteRate
  buffer.writeUInt16LE(2, 32);         // BlockAlign
  buffer.writeUInt16LE(16, 34);        // BitsPerSample

  // data Subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    const intVal = clamped < 0 ? clamped * 32768 : clamped * 32767;
    buffer.writeInt16LE(Math.round(intVal), 44 + i * 2);
  }

  const outPath = path.join(__dirname, filename);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated CC0 commercial-safe WAV: ${outPath}`);
}

// 1. whoosh_paper.wav (0.36s Bandpass-shaped soft noise whoosh)
function genWhoosh() {
  const duration = 0.36;
  const n = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(n);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.sin((t / duration) * Math.PI);
    const white = Math.random() * 2 - 1;
    const alpha = 0.08 + 0.18 * env;
    lp = lp + alpha * (white - lp);
    out[i] = lp * env * 0.65;
  }
  writeWavFile('whoosh_paper.wav', out);
}

// 2. counter_ticks.wav (0.85s Rising triangle counter ticks 520Hz -> 925Hz)
function genCounterTicks() {
  const duration = 0.85;
  const n = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(n);
  for (let tick = 0; tick < 10; tick++) {
    const startSec = tick * 0.085;
    const freq = 520 + tick * 45;
    const startIdx = Math.floor(startSec * SAMPLE_RATE);
    const tickLen = Math.floor(0.048 * SAMPLE_RATE);
    for (let j = 0; j < tickLen && startIdx + j < n; j++) {
      const t = j / SAMPLE_RATE;
      const env = Math.exp(-t * 65);
      const phase = (t * freq) % 1;
      const tri = 4 * Math.abs(phase - 0.5) - 1;
      out[startIdx + j] += tri * env * 0.35;
    }
  }
  writeWavFile('counter_ticks.wav', out);
}

// 3. chime_highlight.wav (0.56s D5 + A5 harmonic two-note chime)
function genChime() {
  const duration = 0.62;
  const n = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(n);
  const notes = [
    { freq: 587.33, start: 0.0 },
    { freq: 880.0, start: 0.09 }
  ];
  notes.forEach((note) => {
    const startIdx = Math.floor(note.start * SAMPLE_RATE);
    for (let i = startIdx; i < n; i++) {
      const t = (i - startIdx) / SAMPLE_RATE;
      const env = Math.exp(-t * 6.5);
      out[i] += Math.sin(2 * Math.PI * note.freq * t) * env * 0.38;
    }
  });
  writeWavFile('chime_highlight.wav', out);
}

// 4. pop_soft.wav (0.11s Soft bubble pop 320Hz -> 680Hz)
function genPopSoft() {
  const duration = 0.11;
  const n = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const freq = 320 + (680 - 320) * (t / duration);
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = Math.exp(-t * 32);
    out[i] = Math.sin(phase) * env * 0.45;
  }
  writeWavFile('pop_soft.wav', out);
}

// 5. alert_coral.wav (0.34s Gentle two-tone warning 440Hz -> 330Hz)
function genAlertCoral() {
  const duration = 0.34;
  const n = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const freq = t < 0.16 ? 440 : 330;
    const localT = t < 0.16 ? t : t - 0.16;
    const env = Math.exp(-localT * 14);
    out[i] = Math.sin(2 * Math.PI * freq * localT) * env * 0.38;
  }
  writeWavFile('alert_coral.wav', out);
}

genWhoosh();
genCounterTicks();
genChime();
genPopSoft();
genAlertCoral();
