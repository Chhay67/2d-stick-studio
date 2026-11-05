(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StudioTimeline = api;
})(typeof window === 'object' ? window : globalThis, function () {
  function compileLines(lines, durations = []) {
    let cursor = 0.35;
    const clips = lines.map((line, index) => {
      const duration = durations[index] ?? line.realDur ?? line.dur ?? 4;
      if (!Number.isFinite(duration) || duration <= 0) throw new Error('Invalid duration for line ' + (index + 1));
      const start = Number(cursor.toFixed(2));
      const end = Number((start + duration).toFixed(2));
      cursor = end + 0.30;
      return { start, end, duration };
    });
    return { clips, duration: clips.length ? Number((cursor - 0.30 + 0.50).toFixed(2)) : 0 };
  }
  return { compileLines };
});
