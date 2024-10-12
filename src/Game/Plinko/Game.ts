import { Application, Assets, Sprite, Texture } from "pixi.js";

import { Plinko } from ".";
import { canvasSize, changeResolution, startDotsAmount } from "./config";
import { assets } from "./assets";
import { AssetsNames, PlinkoState } from "./type";
import { repeat } from "./utils";
import { Dot } from "./entities";
import { getDotSize } from "./utils/getDotSize";

export class GameEngine {
  constructor(main: Plinko) {
    this.main = main;
  }
  private main: Plinko;
  private canvas: HTMLCanvasElement | null = null;
  private app: Application | null = null;
  private assets: Record<AssetsNames, Texture> | null = null;

  private dots: Dot[][] = [];

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
        background: "#aaaa50",
        // backgroundAlpha: 0,
      });

      await this.loadAssets();
      this.render();
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

    new Dot(this.assets?.ball, horizontalCenter, 20).addToContainer(
      this.app!.stage,
    );

    const dotSize = getDotSize(this.state.rows);

    this.dots = repeat(this.state.rows, (r) => {
      const columns = r + startDotsAmount;

      const y = distanceBetweenDots * r + padding;

      return repeat(columns, (i) => {
        const left =
          horizontalCenter - distanceBetweenDots * (columns / 2) + halfDistance;
        const x = left + distanceBetweenDots * i;

        const dot = new Dot(this.assets?.dot, x, y, dotSize);
        dot.addToContainer(this.app!.stage);

        return dot;
      });
    });
  };

  destroy = () => {
    this.app?.destroy();
  };
}
