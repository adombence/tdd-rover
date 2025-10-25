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

// Minimal version
export function step(
  x: number,
  y: number,
  dir: Direction,
  width: number,
  height: number,
  delta: 1 | -1,
): { x: number; y: number } {
  const md = delta === 1 ? dir : opposite(dir);

  if (md === "N") return { x, y: y + 1 };
  if (md === "S") return { x, y: y - 1 };
  if (md === "E") return { x: (x + 1) % width, y };
  if (md === "W") return { x: (x - 1 + width) % width, y };

  return { x: x - 1, y };
}
