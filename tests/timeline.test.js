const test = require('node:test');
const assert = require('node:assert/strict');
const { compileLines } = require('../engine/timeline');

test('measured audio controls timing without modifying the authored script', () => {
  const lines = [{ dur: 4 }, { dur: 8 }];
  const timeline = compileLines(lines, [2.15, 3.42]);
  assert.deepEqual(timeline.clips, [
    { start: 0.35, end: 2.5, duration: 2.15 },
    { start: 2.8, end: 6.22, duration: 3.42 }
  ]);
  assert.equal(timeline.duration, 6.72);
  assert.deepEqual(lines, [{ dur: 4 }, { dur: 8 }]);
});
test('missing audio falls back to estimates; invalid durations fail', () => {
  assert.equal(compileLines([{ dur: 2 }]).duration, 2.85);
  assert.throws(() => compileLines([{ dur: -1 }]), /Invalid duration/);
});
test('episode asset usage follows actual locations', () => {
  const episode = require('../tools/load-episode')();
  const usage = episode.getAssetUsage();
  assert.deepEqual(Array.from(usage['loc:kitchen']), [4]);
  assert.deepEqual(Array.from(usage['loc:living-room']), [7]);
  assert.equal(usage['loc:gym'], undefined);
  assert.equal(episode.SHOTS.filter((shot) => shot.sceneType !== 'character-sheet').length, 8);
});
test('unknown and duplicate episodes fail instead of selecting a fallback', () => {
  const vm = require('node:vm');
  const fs = require('node:fs');
  const path = require('node:path');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../engine/episode-registry.js'), 'utf8'), context);
  const registry = context.window.EpisodeRegistry;
  registry.register({ id: 'ep02', SHOTS: [] });
  assert.throws(() => registry.get('ep01'), /Unknown episode/);
  assert.throws(() => registry.register({ id: 'ep02', SHOTS: [] }), /Duplicate episode/);
});
