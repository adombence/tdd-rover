export type Direction = "N" | "E" | "S" | "W";

export interface Position {
  x: number;
  y: number;
  dir?: Direction;
}

export interface RoverConfig {
  width: number;
  height: number;
  start: Position;
  obstacles?: Array<Position>;
}

export interface RoverResult {
  status: "OK" | "BLOCKED";
  position: Position;
  visited: Array<Position>;
  discoveredObstacles: Array<Position>;
  processed: number;
  obstacleAt?: Position;
}
