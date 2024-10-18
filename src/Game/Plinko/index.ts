import { Game } from "./Game";
import { between } from "./utils";

export class Plinko {
  constructor(wrapper: HTMLElement | null) {
    this.engine.create(wrapper);
  }

  engine = new Game(this);

  destroy = this.engine.destroy;
  play = () => this.engine.createBall(between(430, 530), -50);
}
