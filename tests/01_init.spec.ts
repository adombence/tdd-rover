import { describe, it, expect } from "vitest";
import { execute } from "../src/rover";

describe("Rover init", () => {
  it("initializes at start position and direction", () => {
    const res = execute(
      { width: 8, height: 6, start: { x: 2, y: 3, dir: 'N'} },
      ''
    );

    expect(res.status).toBe('OK');
    expect(res.position).toEqual({ x: 2, y: 3, dir: 'N' });
    expect(res.visited).toEqual([{ x: 2, y: 3 }]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(0);
  });
});