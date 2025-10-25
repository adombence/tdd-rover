import type { Direction, RoverConfig, RoverResult } from "./types";
import { step, turnLeft, turnRight } from "./utils/spherical";

const key = (x: number, y: number) => `${x},${y}`;

export function execute(config: RoverConfig, commands: string): RoverResult {
  const { width: W, height: H } = config;

  let x = config.start.x;
  let y = config.start.y;
  let dir: Direction = config.start.dir!;

  const visited = [{ x, y }];
  const discoveredObstacles: Array<{ x: number; y: number }> = [];

  const obstacles = new Set((config.obstacles ?? []).map((o) => key(o.x, o.y)));

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

      if (obstacles.has(key(next.x, next.y))) {
        const obs = { x: next.x, y: next.y };
        discoveredObstacles.push(obs);

        processed++;

        return {
          status: "BLOCKED",
          position: { x, y, dir },
          visited,
          discoveredObstacles,
          processed,
          obstacleAt: obs,
        };
      }

      // No obstacle, move to next position
      x = next.x;
      y = next.y;
      dir = next.dir;
      visited.push({ x, y });

      processed++;
      continue;
    }
    // Ignore unknown commands
  }

  return {
    status: "OK",
    position: { x, y, dir },
    visited,
    discoveredObstacles,
    processed,
  };
}
