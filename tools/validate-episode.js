const fs = require('node:fs');
const path = require('node:path');
const loadEpisode = require('./load-episode');
const { compileLines } = require('../engine/timeline');
const episode = loadEpisode(process.argv[2]);
const catalog = episode.ASSETS();
const assets = new Set(catalog.map((asset) => asset.id));
const cast = new Set(catalog.filter((asset) => asset.actorConfig).map((asset) => asset.actorConfig.id));
const errors = [], warnings = [];
const shotIds = new Set();
let missing = 0, lineCount = 0;
for (const shot of episode.SHOTS) {
  if (shotIds.has(shot.id)) errors.push('Duplicate shot: ' + shot.id);
  shotIds.add(shot.id);
  if (shot.sceneType === 'character-sheet') continue;
  if (!shot.lines?.length) { errors.push(shot.id + ': no dialogue lines'); continue; }
  const timeline = compileLines(shot.lines);
  const beats = new Set(shot.lines.map((line) => line.beat));
  if (beats.size < 3) warnings.push(shot.id + ': fewer than three beat types');
  const narrator = shot.lines.reduce((sum, line, i) => sum + (!line.actorId ? timeline.clips[i].duration : 0), 0);
  const speech = timeline.clips.reduce((sum, clip) => sum + clip.duration, 0);
  if (narrator / speech > 0.3) warnings.push(`${shot.id}: narrator ${Math.round(narrator / speech * 100)}% (estimated)`);
  const actors = new Set(shot.actors.map((actor) => actor.id));
  shot.lines.forEach((line, i) => {
    lineCount++;
    if (line.actorId && !cast.has(line.actorId)) errors.push(`${shot.id}: unknown speaker ${line.actorId}`);
    else if (line.actorId && !actors.has(line.actorId)) warnings.push(`${shot.id}: off-stage speaker ${line.actorId} at line ${i + 1}; review phone/voice treatment`);
    if (!line.spoken || !line.text) errors.push(`${shot.id}: missing Khmer text at line ${i + 1}`);
    const base = path.resolve(__dirname, '..', shot.voiceDir, `line_${String(i + 1).padStart(2, '0')}_${line.voiceSlug}`);
    if (!['.wav', '.mp3'].some((ext) => fs.existsSync(base + ext))) missing++;
  });
}
for (const id of Object.keys(episode.getAssetUsage())) if (!assets.has(id)) errors.push('Missing catalog asset: ' + id);
console.log(JSON.stringify({ episode: episode.id, errors, warnings, audio: { lines: lineCount, missing }, readyForFinalAudio: missing === 0 }, null, 2));
if (errors.length || (process.argv.includes('--final') && missing)) process.exitCode = 1;
