import { describe, expect, it } from "vitest";
import { execute } from "../src/rover";
import type { Direction, Position } from "../src/types";

describe("Obstacles with wrapping and pole-crossing", () => {
  it("blocks when moving west from x=0 wrapping to x=W-1 and obstacle is there", () => {
    const res = execute(
      {
        width: 4,
        height: 5,
        start: { x: 0, y: 2, dir: "W" },
        obstacles: [{ x: 3, y: 2 }],
      },
      "f",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 0, y: 2, dir: "W" });
    expect(res.visited).toEqual([{ x: 0, y: 2 }]);
    expect(res.discoveredObstacles).toEqual([{ x: 3, y: 2 }]);
    expect(res.obstacleAt).toEqual({ x: 3, y: 2 });
    expect(res.processed).toBe(1);
  });

  it("blocks on NORTH pole-cross target: N at y=H-1, forward hits obstacle at wrapped position; no flip occurs", () => {
    const W = 8;
    const H = 6;
    const start = { x: 3, y: H - 1, dir: "N" } as Position;
    const targetX = (start.x + Math.floor(W / 2)) % W; // 3 + 4 = 7
    const targetY = start.y;

    const res = execute(
      {
        width: W,
        height: H,
        start,
        obstacles: [{ x: targetX, y: targetY }],
      },
      "f",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: start.x, y: start.y, dir: "N" });
    expect(res.visited).toEqual([{ x: start.x, y: start.y }]);
    expect(res.discoveredObstacles).toEqual([{ x: targetX, y: targetY }]);
    expect(res.obstacleAt).toEqual({ x: targetX, y: targetY });
    expect(res.processed).toBe(1);
  });

  it("blocks on south pole-cross target: S at y=0, forward hits obstacle at wrapped position; no flip occurs", () => {
    const W = 7;
    const H = 5;
    const start = { x: 2, y: 0, dir: "S" } as {
      x: number;
      y: number;
      dir: Direction;
    };
    const targetX = (start.x + Math.floor(W / 2)) % W;
    const targetY = start.y;

    const res = execute(
      {
        width: W,
        height: H,
        start,
        obstacles: [{ x: targetX, y: targetY }],
      },
      "f",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: start.x, y: start.y, dir: "S" });
    expect(res.visited).toEqual([{ x: start.x, y: start.y }]);
    expect(res.discoveredObstacles).toEqual([{ x: targetX, y: targetY }]);
    expect(res.obstacleAt).toEqual({ x: targetX, y: targetY });
    expect(res.processed).toBe(1);
  });

  it("blocks on north pole when moving backward into obstacle at wrapped position; no flip occurs", () => {
    const W = 6;
    const H = 5;
    const start = { x: 1, y: H - 1, dir: "N" } as Position;
    const targetX = (start.x + Math.floor(W / 2)) % W;
    const targetY = start.y;

    const res = execute(
      {
        width: W,
        height: H,
        start,
        obstacles: [{ x: targetX, y: targetY }],
      },
      "b",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: start.x, y: start.y, dir: "N" });
    expect(res.visited).toEqual([{ x: start.x, y: start.y }]);
    expect(res.discoveredObstacles).toEqual([{ x: targetX, y: targetY }]);
    expect(res.obstacleAt).toEqual({ x: targetX, y: targetY });
    expect(res.processed).toBe(1);
  });

  it("first move ok, second wraps into obstacle: stop at last free cell and report wrapped obstacle", () => {
    const res = execute(
      {
        width: 3,
        height: 4,
        start: { x: 1, y: 1, dir: "E" },
        obstacles: [{ x: 0, y: 1 }],
      },
      "ff",
    );

    expect(res.status).toBe("BLOCKED");
    expect(res.position).toEqual({ x: 2, y: 1, dir: "E" });
    expect(res.visited).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
    expect(res.discoveredObstacles).toEqual([{ x: 0, y: 1 }]);
    expect(res.obstacleAt).toEqual({ x: 0, y: 1 });
    expect(res.processed).toBe(2);
  });
});
