import { describe, expect, it } from "vitest";
import { execute } from "../src/rover";

describe("Multiple obstacles: stop at the first encountered obstacle and report correctly", () => {
  it("stops at the first obstacle along the path and reports it", () => {
    const res = execute(
      {
        width: 6,
        height: 6,
        start: { x: 0, y: 0, dir: "E" },
        obstacles: [
          { x: 2, y: 0 },
          { x: 4, y: 0 },
        ],
      },
      "ffff",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 1, y: 0, dir: "E" });
    expect(res.visited).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);
    expect(res.discoveredObstacles).toEqual([{ x: 2, y: 0 }]);
    expect(res.obstacleAt).toEqual({ x: 2, y: 0 });
    expect(res.processed).toBe(2);
  });

  it("does not block if an obstacle is on the starting cell (only sense before moving)", () => {
    const res = execute(
      {
        width: 5,
        height: 5,
        start: { x: 2, y: 2, dir: "N" },
        obstacles: [{ x: 2, y: 2 }],
      },
      "",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 2, y: 2, dir: "N" });
    expect(res.visited).toEqual([{ x: 2, y: 2 }]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(0);
  });

  it("after avoiding the first obstacle by turning, blocks on a later obstacle and reports only that one", () => {
    const res = execute(
      {
        width: 7,
        height: 7,
        start: { x: 1, y: 1, dir: "E" },
        obstacles: [
          { x: 2, y: 1 },
          { x: 1, y: 3 },
        ],
      },
      "lff",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 1, y: 2, dir: "N" });
    expect(res.visited).toEqual([
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ]);
    expect(res.discoveredObstacles).toEqual([{ x: 1, y: 3 }]);
    expect(res.obstacleAt).toEqual({ x: 1, y: 3 });
    expect(res.processed).toBe(3);
  });
});
