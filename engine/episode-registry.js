(function (root) {
  const episodes = new Map();
  root.EpisodeRegistry = {
    register(episode) {
      if (!episode || !episode.id || !Array.isArray(episode.SHOTS)) throw new Error('Invalid episode manifest');
      if (episodes.has(episode.id)) throw new Error('Duplicate episode: ' + episode.id);
      episodes.set(episode.id, episode);
    },
    get(id) {
      const episode = episodes.get(id);
      if (!episode) throw new Error('Unknown episode: ' + id);
      return episode;
    },
    list: () => Array.from(episodes.values()),
    get defaultId() { return episodes.keys().next().value; }
  };
})(window);
