import { GameEngine } from "./Game";

export class Plinko {
  constructor(canvas: HTMLCanvasElement | null) {
    this.engine.create(canvas);
  }

  engine = new GameEngine(this);

  destroy = this.engine.destroy
}
