import { Container, Sprite, Texture } from "pixi.js";

import { createMode, minDotSize } from "../config";
import { Engine } from "../Engine";
import { BallBody, BallCreateModeData, PlinkoBody } from "../type";

export class Ball {
  constructor(x: number, y: number, texture?: Texture, dotSize = minDotSize) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(dotSize / this.sprite.width);

    this.sprite.position.set(x, y);
    this.dotSize = dotSize;

    if (createMode) this.createModeData = { x, y, kicks: 0 };
  }
  private sprite: Sprite;
  private body: BallBody | null = null;
  private engine: Engine | null = null;

  private dotSize: number;
  createModeData: BallCreateModeData | null = null;

  register = (container: Container, engine: Engine) => {
    container.addChild(this.sprite);
    this.engine = engine;

    const { x, y } = this.sprite;
    this.body = engine.createCircleBody(
      x,
      y,
      this.dotSize / 2,
      false,
    ) as BallBody;

    this.body.ball = this;
  };

  update = () => {
    if (this.body) {
      const { angle, position } = this.body;
      const { x, y } = position;
      this.sprite.position.set(x, y);
      this.sprite.angle = angle * (180 / Math.PI);
    }
  };

  destroy = () => {
    this.sprite.destroy();

    if (this.body && this.engine) {
      this.engine.removeBody(this.body as PlinkoBody);
      this.body = null;
    }
  };
}
