import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { debug, minDotSize } from "../config";
import { Engine } from "../Engine";

export class Dot {
  constructor(texture?: Texture, x?: number, y?: number, dotSize = minDotSize) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(dotSize / this.sprite.width);

    this.sprite.position.set(x, y);
    this.dotSize = dotSize;
  }
  private sprite: Sprite;
  private body: Matter.Body | null = null;

  private dotSize: number;

  register = (container: Container, engine: Engine) => {
    container.addChild(this.sprite);
    const { x, y } = this.sprite;
    this.body = engine.createRectangleBody(
      x,
      y,
      this.dotSize,
      this.dotSize,
      true,
    );
  };
}
