import { describe, it, expect } from "vitest";
import { execute } from "../src/rover";

describe("Basic forward/backward (no wrap, no obstacles)", () => {
  it("moves f/b for N/S", () => {
    const res = execute(
      { width: 8, height: 8, start: { x: 3, y: 3, dir: "N" } },
      "fbf",
    );

    // N: f -> (3,4), b -> (3,3), f -> (3,4)
    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 3, y: 4, dir: "N" });
    expect(res.processed).toBe(3);
    expect(res.visited).toEqual([
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 3, y: 3 },
      { x: 3, y: 4 },
    ]);
  });

  it("moves f/b for E/W", () => {
    const res = execute(
      { width: 8, height: 8, start: { x: 4, y: 4, dir: "E" } },
      "ffb",
    );

    // E: f -> (5,4), f -> (6,4), b -> (5,4)
    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 5, y: 4, dir: "E" });
    expect(res.processed).toBe(3);
    expect(res.visited).toEqual([
      { x: 4, y: 4 },
      { x: 5, y: 4 },
      { x: 6, y: 4 },
      { x: 5, y: 4 },
    ]);
  });
});
