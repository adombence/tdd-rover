import { describe, it, expect } from "vitest";
import { execute } from "../src/rover";

describe("East-West wrapping", () => {
  it("wraps from w-1 to 0 when moving east", () => {
    const res = execute(
      { width: 5, height: 7, start: { x: 4, y: 3, dir: "E" } },
      "f",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 0, y: 3, dir: "E" });
    expect(res.visited).toEqual([
      { x: 4, y: 3 },
      { x: 0, y: 3 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it("wraps from 0 to w-1 when moving west", () => {
    const res = execute(
      { width: 6, height: 6, start: { x: 0, y: 2, dir: "W" } },
      "f",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 5, y: 2, dir: "W" });
    expect(res.visited).toEqual([
      { x: 0, y: 2 },
      { x: 5, y: 2 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it("backward also wraps correctly (facing east, command b moves west)", () => {
    const res = execute(
      { width: 4, height: 6, start: { x: 0, y: 1, dir: "E" } },
      "b",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 3, y: 1, dir: "E" });
    expect(res.visited).toEqual([
      { x: 0, y: 1 },
      { x: 3, y: 1 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it("multiple steps can wrap repeatedly", () => {
    const res = execute(
      { width: 3, height: 5, start: { x: 2, y: 4, dir: "E" } },
      "fffff",
    );
    // E: f -> (0,4), f -> (1,4), f -> (2,4), f -> (0,4), f -> (1,4)

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 1, y: 4, dir: "E" });
    expect(res.processed).toBe(5);
    expect(res.visited).toEqual([
      { x: 2, y: 4 },
      { x: 0, y: 4 },
      { x: 1, y: 4 },
      { x: 2, y: 4 },
      { x: 0, y: 4 },
      { x: 1, y: 4 },
    ]);
  });
});
