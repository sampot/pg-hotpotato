import { describe, expect, it } from "vitest";
import { HotPotatoGame } from "./game.js";

describe("HotPotatoGame", () => {
  it("fills seats and eliminates the holder when time expires", () => {
    const game = new HotPotatoGame(() => 0);
    game.start(["小安"], 3);
    expect(game.players).toHaveLength(3);
    const holder = game.holder;
    game.tick(99);
    expect(game.players[holder].alive).toBe(false);
    expect(game.round).toBe(2);
  });

  it("passes only to a living different player", () => {
    const game = new HotPotatoGame(() => 0);
    game.start(["小安", "小白", "小青"], 3);
    expect(game.pass(1)).toBe(true);
    expect(game.holder).toBe(1);
    expect(game.pass(1)).toBe(false);
  });

  it("stops after player zero wins", () => {
    const game = new HotPotatoGame(() => 0);
    game.start(["你", "小白", "小青"], 3);
    game.players[1].alive = false;
    game.holder = 2;
    game.tick(99);
    expect(game.winner).toBe(0);

    game.holder = 0;
    game.tick(99);
    expect(game.players[0].alive).toBe(true);
  });
});
