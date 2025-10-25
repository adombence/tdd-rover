import { describe, expect, it } from "vitest";
import { execute } from "../src/rover";

describe("Full map exploration and visited consistency", () => {
  it("explores freely without obstacles and wraps correctly", () => {
    const res = execute(
      {
        width: 4,
        height: 3,
        start: { x: 0, y: 0, dir: "E" },
      },
      "fffff",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 1, y: 0, dir: "E" });
    expect(res.visited).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(5);
  });

  it("records visited path until obstacle and then stops cleanly", () => {
    const res = execute(
      {
        width: 6,
        height: 4,
        start: { x: 0, y: 0, dir: "E" },
        obstacles: [{ x: 3, y: 0 }],
      },
      "fffff",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 2, y: 0, dir: "E" });
    expect(res.visited).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ]);
    expect(res.discoveredObstacles).toEqual([{ x: 3, y: 0 }]);
    expect(res.processed).toBe(3);
  });

  it("explores, turns, and wraps across edges preserving visited history", () => {
    const res = execute(
      {
        width: 5,
        height: 5,
        start: { x: 4, y: 0, dir: "E" },
      },
      "frrfff",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 2, y: 0, dir: "W" });
    expect(res.visited).toEqual([
      { x: 4, y: 0 },
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(6);
  });

  it("turns, backtracks, hits obstacle backward, and keeps correct visited set", () => {
    const res = execute(
      {
        width: 5,
        height: 5,
        start: { x: 2, y: 2, dir: "N" },
        obstacles: [{ x: 4, y: 2 }],
      },
      "rfrrb",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 3, y: 2, dir: "W" });
    expect(res.visited).toEqual([
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ]);
    expect(res.discoveredObstacles).toEqual([{ x: 4, y: 2 }]);
    expect(res.processed).toBe(5);
  });
});
