import { describe, expect, it } from "vitest";
import { execute } from "../src/rover";

describe("Obstacle detection and stop-before-move", () => {
  it("stops before moving into an obstacle and reports it", () => {
    const res = execute(
      {
        width: 5,
        height: 5,
        start: { x: 2, y: 2, dir: "N" },
        obstacles: [{ x: 2, y: 3 }],
      },
      "f",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 2, y: 2, dir: "N" });
    expect(res.visited).toEqual([{ x: 2, y: 2 }]);
    expect(res.discoveredObstacles).toEqual([{ x: 2, y: 3 }]);
    expect(res.processed).toBe(1);
  });

  it("after turning, detects obstacle and stops; ignores remaining commands", () => {
    const res = execute(
      {
        width: 6,
        height: 6,
        start: { x: 1, y: 1, dir: "N" },
        obstacles: [{ x: 2, y: 1 }], // obstacle to the east
      },
      "rfrrff", // turn right (E), move forward into obstacle, should stop
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 1, y: 1, dir: "E" });
    expect(res.visited).toEqual([{ x: 1, y: 1 }]);
    expect(res.discoveredObstacles).toEqual([{ x: 2, y: 1 }]);
    expect(res.processed).toBe(2); // processed 'r' and 'f', then stopped
  });

  it("works wit wrapping: obstacle is checked on wrapped target cell", () => {
    const res = execute(
      {
        width: 4,
        height: 4,
        start: { x: 3, y: 2, dir: "E" },
        obstacles: [{ x: 0, y: 2 }],
      },
      "f",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 3, y: 2, dir: "E" });
    expect(res.visited).toEqual([{ x: 3, y: 2 }]);
    expect(res.discoveredObstacles).toEqual([{ x: 0, y: 2 }]);
    expect(res.processed).toBe(1);
  });
});
