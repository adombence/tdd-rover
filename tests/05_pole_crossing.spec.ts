import { describe, expect, it } from "vitest";
import { execute } from "../src/rover";

describe("Pole crossing on spherical planet", () => {
  it("N from north edge flips dir and shifts longitude by W/2", () => {
    const res = execute(
      { width: 8, height: 6, start: { x: 3, y: 5, dir: "N" } },
      "f",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 7, y: 5, dir: "S" });
    expect(res.visited).toEqual([
      { x: 3, y: 5 },
      { x: 7, y: 5 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it("S from south edge flips dir and shifts longitude by W/2", () => {
    const res = execute(
      { width: 7, height: 5, start: { x: 2, y: 0, dir: "S" } },
      "f",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 5, y: 0, dir: "N" });
    expect(res.visited).toEqual([
      { x: 2, y: 0 },
      { x: 5, y: 0 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it("backward near north pole also works", () => {
    const res = execute(
      { width: 6, height: 5, start: { x: 1, y: 4, dir: "N" } },
      "b",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 4, y: 4, dir: "S" });
    expect(res.visited).toEqual([
      { x: 1, y: 4 },
      { x: 4, y: 4 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it("backward near south pole also works", () => {
    const res = execute(
      { width: 5, height: 6, start: { x: 3, y: 1, dir: "S" } },
      "b",
    );

    // With backward ('b') while facing S we move north (effective moveDir = 'N')
    // and since we're not at the north edge this is a normal N step.
    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 3, y: 2, dir: "S" });
    expect(res.visited).toEqual([
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(1);
  });

  it("E/W movement near poles works without wrapping", () => {
    const res = execute(
      { width: 4, height: 4, start: { x: 0, y: 3, dir: "E" } },
      "ff",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 2, y: 3, dir: "E" });
    expect(res.visited).toEqual([
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(2);
  });
});
