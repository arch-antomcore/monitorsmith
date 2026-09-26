import { describe, expect, it } from 'vitest';
import { createFrameSampler } from '../../src/components/Modes/frameSampling.js';

function feed(sampler, start, count, interval = 20) {
  let latest;
  for (let index = 0; index <= count; index += 1) {
    const sample = sampler.sample(start + index * interval);
    if (sample?.stats) latest = sample.stats;
  }
  return latest;
}

describe('browser callback sampling', () => {
  it('uses intervals rather than overcounting the first callback', () => {
    const stats = feed(createFrameSampler(), 0, 20);
    expect(stats).toMatchObject({ avg: 50, live: 50, frame: 20, jitter: 0, frames: 20, elapsed: 0.4, dropped: 0 });
  });

  it('excludes a long pause while preserving collected data', () => {
    const sampler = createFrameSampler();
    feed(sampler, 0, 20);
    sampler.pause();
    const stats = feed(sampler, 600_000, 20);
    expect(stats).toMatchObject({ avg: 50, live: 50, frames: 40, elapsed: 0.8, worst: 20, dropped: 0 });
  });

  it('counts long intervals as observations, not unobservable dropped frames', () => {
    const sampler = createFrameSampler();
    feed(sampler, 0, 20);
    const sample = sampler.sample(1000);
    expect(sample.stats).toMatchObject({ frames: 21, dropped: 1, worst: 600, elapsed: 1 });
  });

  it('ignores zero-length timestamps without producing infinite rates', () => {
    const sampler = createFrameSampler();
    sampler.sample(0);
    expect(sampler.sample(0)).toBeNull();
    const stats = feed(sampler, 20, 19);
    expect(stats.avg).toBe(50);
  });
});
