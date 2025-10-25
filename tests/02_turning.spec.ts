import { describe, it, expect } from "vitest";
import { execute } from "../src/rover";

describe('Turning', () => {
  it('turns left (l) N->W', () => {
    const res = execute(
      { width: 5, height: 5, start: { x: 1, y: 1, dir: 'N' } },
      'l'
    );

    expect(res.status).toBe('OK');
    expect(res.position).toEqual({ x: 1, y: 1, dir: 'W' });
    expect(res.visited).toEqual([{ x: 1, y: 1 }]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it('turns right (r) N->E', () => {
    const res = execute(
      { width: 5, height: 5, start: { x: 1, y: 1, dir: 'N' } },
      'r'
    );
    
    expect(res.status).toBe('OK');
    expect(res.position).toEqual({ x: 1, y: 1, dir: 'E' });
    expect(res.visited).toEqual([{ x: 1, y: 1 }]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it('turns a full circle (rrrr) N->N', () => {
    const res = execute(
      { width: 5, height: 5, start: { x: 1, y: 1, dir: 'N' } },
      'rrrr'
    );

    expect(res.status).toBe('OK');
    expect(res.position).toEqual({ x: 1, y: 1, dir: 'N' });
    expect(res.visited).toEqual([{ x: 1, y: 1 }]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(4);
  });

  it('turns a full circle (llll) N->N', () => {
    const res = execute(
      { width: 5, height: 5, start: { x: 1, y: 1, dir: 'N' } },
      'llll'
    );
    
    expect(res.status).toBe('OK');
    expect(res.position).toEqual({ x: 1, y: 1, dir: 'N' });
    expect(res.visited).toEqual([{ x: 1, y: 1 }]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(4);
  });
});