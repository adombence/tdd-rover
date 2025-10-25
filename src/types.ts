export type Direction = 'N' | 'E' | 'S' | 'W';

export interface RoverConfig {
  width: number;
  height: number;
  start: { x: number; y: number; dir: Direction };
  obstacles?: Array<{ x: number; y: number }>;
}

export interface RoverResult {
  status: 'OK' | 'BLOCKED';
  position: { x: number; y: number; dir: Direction };
  visited: Array<{ x: number; y: number }>;
  discoveredObstacles: Array<{ x: number; y: number }>;
  processed: number;
  obstacleAt?: { x: number; y: number };
}