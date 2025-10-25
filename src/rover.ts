import type { Direction, RoverConfig, RoverResult } from "./types";
import { step, turnLeft, turnRight } from "./utils/spherical";

export function execute(config: RoverConfig, commands: string): RoverResult {
  const { width: W, height: H } = config;

  let x = config.start.x;
  let y = config.start.y;
  let dir: Direction = config.start.dir;

  const visited = [{ x, y }];
  const discoveredObstacles: Array<{ x: number; y: number }> = [];

  let processed = 0;

  for (const command of commands) {
    if (command === "l") {
      dir = turnLeft[dir];
      processed++;
      continue;
    }
    if (command === "r") {
      dir = turnRight[dir];
      processed++;
      continue;
    }
    if (command === "f" || command === "b") {
      const delta = (command === "f" ? 1 : -1) as 1 | -1;

      const next = step(x, y, dir, W, H, delta);

      if (next.y >= 0 && next.y < H) {
        x = next.x;
        y = next.y;
        visited.push({ x, y });
      }

      processed++;
      continue;
    }
  }

  return {
    status: "OK",
    position: { x, y, dir },
    visited,
    discoveredObstacles,
    processed,
  };
}
