import type { Direction, RoverConfig, RoverResult } from './types';
import { turnLeft, turnRight } from './utils/spherical';

export function execute(config: RoverConfig, commands: string): RoverResult {
  const { width: W, height: H } = config;
  void W; void H;

  let x = config.start.x;
  let y = config.start.y;
  let dir: Direction = config.start.dir;

  const visited = [{ x, y }];
  const discoveredObstacles: Array<{ x: number; y: number }> = [];

  let processed = 0;

  for (const command of commands) {
    if (command === 'l') { dir = turnLeft[dir]; processed++; continue; }
    if (command === 'r') { dir = turnRight[dir]; processed++; continue; }
    // Movement commands (f, b) to be implemented
    // Unknown command, ignore
  }

    return {
      status: 'OK',
      position: { x, y, dir },
      visited,
      discoveredObstacles,
      processed
    }
  };