import { Container, Sprite, Texture } from "pixi.js";
import { minDotSize } from "../config";

export class Dot {
  constructor(texture?: Texture, x?: number, y?: number, dotSize = minDotSize) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(dotSize / this.sprite.width);

    this.sprite.position.set(x, y);
  }
  private sprite: Sprite;

  addToContainer = (container: Container) => {
    container.addChild(this.sprite);

  };
}
