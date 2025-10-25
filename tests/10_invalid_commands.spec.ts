import { describe, expect, it } from "vitest";
import { execute } from "../src/rover";

describe("Invalid/unknown commands", () => {
  it("ignores non [f,b,l,r] commands", () => {
    const res = execute(
      { width: 5, height: 5, start: { x: 2, y: 2, dir: "N" } },
      "xyz?! ",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 2, y: 2, dir: "N" });
    expect(res.visited).toEqual([{ x: 2, y: 2 }]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(0);
  });

  it("mix of valid and invalid: only valid are executed and counted", () => {
    const res = execute(
      { width: 5, height: 5, start: { x: 1, y: 1, dir: "E" } },
      " f?f\nr\tb!l",
    );

    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 3, y: 2, dir: "E" });
    expect(res.visited).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ]);
    expect(res.discoveredObstacles).toEqual([]);
    expect(res.processed).toBe(5);
  });

  it("uppercase commands are invalid by spec and ignored", () => {
    const res = execute(
      { width: 4, height: 4, start: { x: 0, y: 0, dir: "N" } },
      "FBLR",
    );
    expect(res.status).toBe("OK");
    expect(res.position).toEqual({ x: 0, y: 0, dir: "N" });
    expect(res.visited).toEqual([{ x: 0, y: 0 }]);
    expect(res.processed).toBe(0);
  });
});
