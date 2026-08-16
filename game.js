export class HotPotatoGame {
  constructor(random = Math.random) {
    this.random = random;
    this.players = [];
    this.holder = 0;
    this.round = 0;
    this.timeLeft = 0;
    this.winner = null;
  }

  start(names = ["你"], count = 3) {
    const aiNames = ["阿火", "小豆", "霹靂"];
    this.players = Array.from({ length: Math.max(3, Math.min(4, count)) }, (_, index) => ({
      name: names[index] || aiNames[index - names.length] || `AI ${index}`,
      ai: !names[index],
      alive: true,
    }));
    this.round = 1;
    this.winner = null;
    this.holder = 0;
    this.resetTimer();
  }

  resetTimer() {
    this.timeLeft = 5 + this.random() * 5;
  }

  pass(target) {
    if (this.winner !== null || target === this.holder || !this.players[target]?.alive) return false;
    this.holder = target;
    return true;
  }

  tick(seconds) {
    if (this.winner !== null) return;
    this.timeLeft -= seconds;
    if (this.timeLeft > 0) return;
    this.players[this.holder].alive = false;
    const alive = this.players.map((player, index) => (player.alive ? index : -1)).filter((i) => i >= 0);
    if (alive.length === 1) {
      this.winner = alive[0];
      return;
    }
    this.round += 1;
    this.holder = alive[Math.floor(this.random() * alive.length)];
    this.resetTimer();
  }

  aiPass() {
    const holder = this.players[this.holder];
    if (!holder?.ai || this.winner !== null) return false;
    const options = this.players.map((p, i) => (p.alive && i !== this.holder ? i : -1)).filter((i) => i >= 0);
    return this.pass(options[Math.floor(this.random() * options.length)]);
  }
}
