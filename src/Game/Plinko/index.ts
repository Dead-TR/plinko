import { Game } from "./Game";
import { between } from "./utils";

export class Plinko {
  constructor(canvas: HTMLCanvasElement | null) {
    this.engine.create(canvas);
  }

  engine = new Game(this);

  destroy = this.engine.destroy;
  play = () => this.engine.createBall(between(350, 550), between(10, 50));
}
