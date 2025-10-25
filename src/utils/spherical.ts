import type { Direction } from "../types";

export const turnRight: Record<Direction, Direction> = { N: "E", E: "S", S: "W", W: "N" };
export const turnLeft:  Record<Direction, Direction> = { N: "W", W: "S", S: "E", E: "N" };

export function opposite(d: Direction): Direction {
  return d === "N" ? "S" : d === "S" ? "N" : d === "E" ? "W" : "E";
}