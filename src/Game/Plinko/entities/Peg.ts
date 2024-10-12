import { Container, Sprite, Texture } from "pixi.js";

import { minDotSize } from "../config";
import { Engine } from "../Engine";
import { PegBody } from "../type";

export class Peg {
  constructor(texture?: Texture, x?: number, y?: number, dotSize = minDotSize) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(dotSize / this.sprite.width);

    this.sprite.position.set(x, y);
    this.dotSize = dotSize;
  }
  private sprite: Sprite;
  private body: PegBody | null = null;

  private dotSize: number;

  register = (container: Container, engine: Engine) => {
    container.addChild(this.sprite);
    const { x, y } = this.sprite;
    this.body = engine.createCircleBody(
      x,
      y,
      this.dotSize / 2,
      true,
    ) as PegBody;
    this.body.peg = this;
  };
}
