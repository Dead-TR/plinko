import { Game } from "./Game";

export class Plinko {
  constructor(canvas: HTMLCanvasElement | null) {
    this.engine.create(canvas);
  }

  engine = new Game(this);

  destroy = this.engine.destroy
}
