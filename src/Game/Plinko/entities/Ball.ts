import { Container, Sprite, Texture } from "pixi.js";

import { minDotSize } from "../config";
import { Engine } from "../Engine";
import { Body } from "matter-js";

export class Ball {
  constructor(x: number, y: number, texture?: Texture, dotSize = minDotSize) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(dotSize / this.sprite.width);

    this.sprite.position.set(x, y);
    this.dotSize = dotSize;
  }

  private sprite: Sprite;
  private body: Body | null = null;

  private dotSize: number;

  register = (container: Container, engine: Engine) => {
    container.addChild(this.sprite);
    const { x, y } = this.sprite;
    this.body = engine.createRectangleBody(
      x,
      y,
      this.dotSize,
      this.dotSize,
      false,
    );

    // this.body
  };

  update = () => {
    if (this.body) {
      const { angle, position } = this.body;
      const { x, y } = position;
      this.sprite.position.set(x, y);
      this.sprite.angle = angle * (180 / Math.PI);
    }
  };
}
