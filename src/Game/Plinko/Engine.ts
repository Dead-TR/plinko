import {
  Bodies,
  Composite,
  Engine as MatterEngine,
  Runner,
  World,
} from "matter-js";

import { Game } from "./Game";
import { physicConfig } from "./config";

export class Engine {
  constructor(game: Game) {
    this.game = game;

    this.engine = MatterEngine.create();
    this.world = this.engine.world;
    this.runner = Runner.create();

    Runner.run(this.runner, this.engine);
  }
  private game: Game;

  private engine: MatterEngine;
  private world: World;
  private runner: Runner;

  createRectangleBody = (
    x: number,
    y: number,
    w: number,
    h: number,
    isStatic = false,
  ) => {
    const config = isStatic ? physicConfig.dot : physicConfig.ball;
    const body = Bodies.rectangle(x, y, w, h, {
      isStatic,
      angle: 0,
      ...config,
    });

    Composite.add(this.world, body);
    return body;
  };

  destroy = () => {
    Runner.stop(this.runner);
  };
}
