import type { Direction } from "../types";

export const turnRight: Record<Direction, Direction> = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};
export const turnLeft: Record<Direction, Direction> = {
  N: "W",
  W: "S",
  S: "E",
  E: "N",
};

export function opposite(d: Direction): Direction {
  return d === "N" ? "S" : d === "S" ? "N" : d === "E" ? "W" : "E";
}

export function step(
  x: number,
  y: number,
  dir: Direction,
  width: number,
  height: number,
  delta: 1 | -1,
): { x: number; y: number; dir: Direction } {
  const moveDir = delta === 1 ? dir : opposite(dir);
  const half = Math.floor(width / 2);

  // East–West moves always wrap
  if (moveDir === "E") {
    return { x: (x + 1) % width, y, dir };
  }
  if (moveDir === "W") {
    return { x: (x - 1 + width) % width, y, dir };
  }

  const atNorthEdge = y === height - 1;
  const atSouthEdge = y === 0;

  // Special-case: backward movement while facing a pole should also trigger
  // the pole-crossing behavior described below. Historically this project
  // treated `b` with `dir === 'N'` at the north edge (and similarly for the
  // south edge) as a pole-crossing that flips facing and shifts longitude.
  // Preserve that behavior here for compatibility with the tests.
  if (delta === -1 && dir === "N" && atNorthEdge) {
    return { x: (x + half) % width, y, dir: "S" };
  }
  if (delta === -1 && dir === "S" && atSouthEdge) {
    return { x: (x + half) % width, y, dir: "N" };
  }

  // Handle pole-crossing for forward movement (and for backward when not
  // covered by the two special-cases above). When crossing a pole we shift
  // longitude by half the world and flip the facing direction.
  if (moveDir === "N" && atNorthEdge) {
    return { x: (x + half) % width, y, dir: opposite(dir) };
  }
  if (moveDir === "S" && atSouthEdge) {
    return { x: (x + half) % width, y, dir: opposite(dir) };
  }

  // Normal north / south movement
  if (moveDir === "N") {
    return { x, y: y + 1, dir };
  }
  // moveDir === "S"
  return { x, y: y - 1, dir };
}
