import { Container, Sprite, Texture } from "pixi.js";

import { Engine } from "../Engine";
import { BasketBody, PegBody } from "../type";

export class Basket {
  constructor(
    index: number,
    texture?: Texture,
    x?: number,
    y?: number,
    width = 0,
  ) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(width / this.sprite.width);

    this.sprite.position.set(x, y);
    this.width = width;
    this.index = index;
  }
  private sprite: Sprite;
  private body: BasketBody | null = null;

  private width: number;
  index = 0;

  register = (container: Container, engine: Engine) => {
    container.addChild(this.sprite);
    const { x, y, width, height } = this.sprite;
    this.body = engine.createRectangleBody(x, y, width, height) as BasketBody;

    this.body.basket = this;
  };
}
