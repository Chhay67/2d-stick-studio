const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

module.exports = function loadEpisode(directory = 'ep02-daily-exercise') {
  if (!/^ep\d{2}-[a-z0-9-]+$/.test(directory)) throw new Error('Invalid episode directory');
  const root = path.resolve(__dirname, '..');
  const context = { window: {} };
  vm.createContext(context);
  for (const file of ['engine/episode-registry.js', 'engine/character-rig.js',
    ...['visuals.js', 'scenes.js', 'episode.js'].map((name) => `episodes/${directory}/${name}`)]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return context.window.EpisodeRegistry.list()[0];
};
