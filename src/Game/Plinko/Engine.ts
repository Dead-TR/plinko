import {
  Bodies,
  Composite,
  Events,
  Engine as MatterEngine,
  Runner,
  World,
} from "matter-js";

import { Game } from "./Game";
import { categories, createMode, physicConfig } from "./config";
import { BallBody, PlinkoBody } from "./type";

export class Engine {
  constructor(game: Game) {
    this.game = game;

    this.engine = MatterEngine.create();
    this.world = this.engine.world;
    this.runner = Runner.create();

    Runner.run(this.runner, this.engine);

    Events.on(this.engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        const bA = bodyA as PlinkoBody;
        const bB = bodyB as PlinkoBody;

        // ball and peg collision
        if ((bA.peg && bB.ball) || (bA.ball && bB.peg)) {
          const ball = bA.ball || bB.ball;
          const peg = bA.peg || bB.peg;

          if (createMode && ball.createModeData) ball.createModeData.kicks++;
        }

        // ball and basket collision
        if ((bA.basket && bB.ball) || (bA.ball && bB.basket)) {
          const ball = bA.ball || bB.ball;
          const basket = bA.basket || bB.basket;

          if (createMode) {
            const data = ball.createModeData;
            
          }

          ball.destroy();
        }
      });
    });
  }
  private game: Game;

  private engine: MatterEngine;
  private world: World;
  private runner: Runner;

  createCircleBody = (
    x: number,
    y: number,
    radius: number,
    isStatic = false,
  ) => {
    const config = isStatic ? physicConfig.peg : physicConfig.ball;
    const category = isStatic ? categories.peg : categories.ball;
    const mask = isStatic
      ? categories.ball
      : categories.basket | categories.peg;

    const body = Bodies.circle(x, y, radius, {
      isStatic,
      angle: 0,
      ...config,

      collisionFilter: {
        category,
        mask,
      },
    });

    Composite.add(this.world, body);
    return body;
  };

  createRectangleBody = (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    const config = physicConfig.basket;

    const body = Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      ...config,

      collisionFilter: {
        category: categories.basket,
        mask: categories.ball,
      },
    });

    Composite.add(this.world, body);
    return body;
  };

  removeBody = (body: PlinkoBody) => {
    Composite.remove(this.engine.world, body);
  };

  destroy = () => {
    Runner.stop(this.runner);

    Composite.clear(this.world, true);
    MatterEngine.clear(this.engine);
  };
}
