import { describe, expect, it } from "vitest";
import { execute } from "../src/rover";
import type { Position } from "../src/types";

describe("Edge cases: small grids, odd/even width, repeated pole flips", () => {
  it("H=2: north pole flip keeps y at H-1 and flips dir; x shifts by floor(W/2)", () => {
    const W = 6,
      H = 2;
    const start = { x: 1, y: H - 1, dir: "N" } as Position; // y=1
    const targetX = (start.x + Math.floor(W / 2)) % W; // 1+3=4
    const res = execute({ width: W, height: H, start }, "f");

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: targetX, y: H - 1, dir: "S" });
    expect(res.visited).toEqual([
      { x: 1, y: 1 },
      { x: 4, y: 1 },
    ]);
    expect(res.processed).toBe(1);
  });

  it("Odd W: two consecutive pole flips at north (via backward rule) shift x by 2*floor(W/2) mod W and end facing N", () => {
    const W = 5,
      H = 4;
    const half = Math.floor(W / 2); // 2
    const start = { x: 0, y: H - 1, dir: "N" } as Position; // y=3
    const res = execute({ width: W, height: H, start }, "bb");
    const x2 = (start.x + 2 * half) % W; // 0 + 4 mod 5 = 4

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: x2, y: H - 1, dir: "N" });
    expect(res.visited).toEqual([
      { x: 0, y: 3 },
      { x: 2, y: 3 },
      { x: 4, y: 3 },
    ]);
    expect(res.processed).toBe(2);
  });

  it("Even W: four consecutive pole flips at south land back to same longitude (since 4*(W/2) ≡ 0 mod W)", () => {
    const W = 8,
      H = 6;
    const half = Math.floor(W / 2);
    const start = { x: 5, y: 0, dir: "S" } as Position;
    const res = execute({ width: W, height: H, start }, "bbbb"); // 4 flip
    const x4 = (start.x + 4 * half) % W; // 5 + 16 ≡ 5

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: x4, y: 0, dir: "S" });
    expect(res.visited).toEqual([
      { x: 5, y: 0 },
      { x: 1, y: 0 },
      { x: 5, y: 0 },
      { x: 1, y: 0 },
      { x: 5, y: 0 },
    ]);
    expect(res.processed).toBe(4);
  });

  it("W=1 degenerated, E/W wrap trivial, pole flips don't change x", () => {
    const W = 1,
      H = 3;
    const res = execute(
      { width: W, height: H, start: { x: 0, y: 2, dir: "N" } },
      "frfb",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 0, y: 2, dir: "W" });
    expect(res.visited).toEqual([
      { x: 0, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 2 },
    ]);
    expect(res.processed).toBe(4);
  });

  it("Long sequence sanity: processed counts only valid commands; visited grows on successful moves", () => {
    const cmds = "f?f\nr\tb!lxxffrrbbll".repeat(5);
    const res = execute(
      { width: 10, height: 10, start: { x: 5, y: 5, dir: "E" } },
      cmds,
    );

    expect(res.status).toBe("OK");
    expect(res.processed).toBeGreaterThan(0);
    expect(res.visited.length).toBeGreaterThan(1);
    expect(res.position.x).toBeGreaterThanOrEqual(0);
    expect(res.position.x).toBeLessThan(10);
    expect(res.position.y).toBeGreaterThanOrEqual(0);
    expect(res.position.y).toBeLessThan(10);
  });
});
