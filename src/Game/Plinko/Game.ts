import { Application, Assets, Sprite, Texture } from "pixi.js";

import { canvasSize, changeResolution, startDotsAmount } from "./config";
import { assets } from "./assets";
import { repeat, getDotSize } from "./utils";
import { Ball, Dot } from "./entities";

import { AssetsNames, PlinkoState } from "./type";
import { Plinko } from ".";
import { Engine } from "./Engine";

export class Game {
  constructor(main: Plinko) {
    this.main = main;
  }
  private main: Plinko;
  private canvas: HTMLCanvasElement | null = null;

  private app: Application | null = null;
  private engine = new Engine(this);

  private assets: Record<AssetsNames, Texture> | null = null;
  private dots: Dot[][] = [];
  private balls: Ball[] = [];

  state: PlinkoState = {
    rows: 6,
  };

  create = async (canvas: HTMLCanvasElement | null) => {
    this.canvas = canvas;
    const parentWrapper = canvas?.parentElement;
    const resolution = (parentWrapper?.offsetWidth || 0) / canvasSize || 1;

    if (canvas) {
      this.app = new Application();

      this.app.init({
        canvas,
        width: canvasSize,
        height: canvasSize,
        resolution: changeResolution ? resolution : 1,
        background: "#44c3c3",
        // backgroundAlpha: 0,
      });

      await this.loadAssets();
      this.render();

      this.app.ticker.add(this.update);
      this.app.ticker.start();

      this.createBall(420, 25);
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

    this.dots = repeat(this.state.rows, (r) => {
      const columns = r + startDotsAmount;

      const y = distanceBetweenDots * r + padding;

      return repeat(columns, (i) => {
        const left =
          horizontalCenter - distanceBetweenDots * (columns / 2) + halfDistance;
        const x = left + distanceBetweenDots * i;

        const dot = new Dot(this.assets?.dot, x, y, dotSize);
        dot.register(this.app!.stage, this.engine);

        return dot;
      });
    });
  };

  createBall = (x: number, y: number) => {
    const dotSize = getDotSize(this.state.rows);

    const ball = new Ball(x, y, this.assets?.ball, dotSize);
    ball.register(this.app!.stage, this.engine);
    this.balls.push(ball);
  };

  update = () => {
    debugger;
    this.balls.forEach((b) => b.update());
  };

  destroy = () => {
    this.app?.destroy();
  };
}
