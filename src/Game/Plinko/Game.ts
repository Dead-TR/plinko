import { Application, Assets, Sprite, Texture } from "pixi.js";

import {
  canvasSize,
  changeResolution,
  createMode,
  startDotsAmount,
} from "./config";
import { assets } from "./assets";
import { repeat, getDotSize } from "./utils";
import { Ball, Basket, Peg } from "./entities";

import { AssetsNames, PlinkoState } from "./type";
import { Plinko } from ".";
import { Engine } from "./Engine";

export class Game {
  constructor(main: Plinko) {
    this.main = main;
  }
  private main: Plinko;
  private wrapper: HTMLElement | null = null;
  private canvas: HTMLCanvasElement | null = null;

  private app: Application | null = null;
  private engine = new Engine(this);

  private assets: Record<AssetsNames, Texture> | null = null;
  private pegs: Peg[][] = [];
  private balls: Ball[] = [];
  private baskets: Basket[] = [];

  state: PlinkoState = {
    rows: 8,
  };

  create = async (wrapper: HTMLElement | null) => {
    const canvas = document.createElement("canvas");
    wrapper?.appendChild(canvas);
    this.canvas = canvas;
    this.wrapper = wrapper;
    const resolution = (this.wrapper?.offsetWidth || 0) / canvasSize || 1;

    if (canvas) {
      this.app = new Application();

      await this.app.init({
        canvas,
        width: canvasSize,
        height: canvasSize,
        resolution: changeResolution ? resolution : 1,
        backgroundAlpha: 0,
      });

      await this.loadAssets();
      this.render();

      this.app.ticker.add(this.update);
      this.app.ticker.start();
    } else {
      console.error("The canvas is missing");
    }
  };

  private loadAssets = async () => {
    const assetsList = await Promise.all(
      Object.keys(assets).map(async (key) => {
        const name = key as AssetsNames;
        const link = assets[name];
        const texture = (await Assets.load(link)) as Texture;

        return {
          texture,
          name,
        };
      }),
    );

    const assetsState = assetsList.reduce((acm, { texture, name }) => {
      acm[name] = texture;

      return acm;
    }, {} as Record<AssetsNames, Texture>);

    this.assets = assetsState;
    return assetsState;
  };

  render = () => {
    const padding = canvasSize / this.state.rows / 2;
    const distanceBetweenDots = (canvasSize - padding) / this.state.rows;
    const halfDistance = distanceBetweenDots / 2;
    const horizontalCenter = canvasSize / 2;

    const dotSize = getDotSize(this.state.rows);
    let basketAmount = 0;
    let basketY = 0;

    this.pegs = repeat(this.state.rows, (r) => {
      const columns = r + startDotsAmount;

      const y = distanceBetweenDots * r + padding;

      return repeat(columns, (i) => {
        basketAmount = Math.max(basketAmount, i);
        basketY = Math.max(y, basketY);

        const left =
          horizontalCenter - distanceBetweenDots * (columns / 2) + halfDistance;
        const x = left + distanceBetweenDots * i;

        const dot = new Peg(this.assets?.peg, x, y, dotSize);
        dot.register(this.app!.stage, this.engine);

        return dot;
      });
    });

    this.baskets = repeat(basketAmount, (i) => {
      const x = padding + distanceBetweenDots * i + dotSize;
      const width = distanceBetweenDots - dotSize * 2;

      const basket = new Basket(
        i,
        this.assets?.basket,
        x,
        basketY + dotSize,
        width,
      );
      basket.register(this.app!.stage, this.engine);

      return basket;
    });
  };

  createBall = (x: number, y: number) => {
    const dotSize = getDotSize(this.state.rows);

    const ball = new Ball(x, y, this.assets?.ball, dotSize);
    ball.register(this.app!.stage, this.engine);
    this.balls.push(ball);

    return ball;
  };

  update = () => {
    debugger;
    this.balls.forEach((b) => b.update());
  };

  destroy = () => {
    this.app?.destroy();
    this.canvas?.remove();
  };

  createConfig = () => {
    if (createMode) {
      const padding = canvasSize / this.state.rows / 2;
      const center = canvasSize / 2;
      const left = center - padding;
      const right = center + padding;

      const y = 5;
      let x = left;

      while (x < right) {
        const ball = this.createBall(x, y);
      }
    }
  };
}
