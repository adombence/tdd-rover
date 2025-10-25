import type { Direction, RoverConfig, RoverResult } from './types';

export function execute(config: RoverConfig, commands: string): RoverResult {
  const { width: W, height: H } = config;

  if (W <= 1 || H <= 1) {}

  let x = config.start.x;
  let y = config.start.y;
  let dir: Direction = config.start.dir;

  const visited = [{ x, y }];
  const discoveredObstacles: Array<{ x: number; y: number }> = [];

  const processed = 0;

  return {
    status: 'OK',
    position: { x, y, dir },
    visited,
    discoveredObstacles,
    processed
  }
};