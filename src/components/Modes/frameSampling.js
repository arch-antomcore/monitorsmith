// Measures browser callback intervals, not physical panel refresh or presented frames.
export function createFrameSampler() {
  let last = null;
  let frames = 0;
  let sum = 0;
  let sumSq = 0;
  let worst = 0;
  let slow = 0;
  let windowFrames = 0;
  let windowSum = 0;
  return {
    pause() {
      last = null;
      windowFrames = 0;
      windowSum = 0;
    },
    sample(now) {
      const previous = last;
      last = now;
      if (previous === null) return null;
      const delta = now - previous;
      if (!Number.isFinite(delta) || delta <= 0) return null;
      if (frames >= 20 && delta > (sum / frames) * 1.8) slow += 1;
      frames += 1;
      sum += delta;
      sumSq += delta * delta;
      worst = Math.max(worst, delta);
      windowFrames += 1;
      windowSum += delta;
      let stats = null;
      if (windowSum >= 400) {
        const mean = sum / frames;
        stats = {
          live: windowFrames * 1000 / windowSum,
          avg: frames * 1000 / sum,
          frame: mean,
          jitter: Math.sqrt(Math.max(0, sumSq / frames - mean * mean)),
          worst,
          frames,
          dropped: slow,
          elapsed: sum / 1000,
        };
        windowFrames = 0;
        windowSum = 0;
      }
      return { delta, stats };
    },
  };
}
