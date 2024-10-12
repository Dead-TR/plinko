import { Body } from "matter-js";

import type { Ball, Basket, Peg } from "./entities";
import { assets } from "./assets";

export type AssetsNames = keyof typeof assets;

export interface PlinkoState {
  rows: number;
}

export interface BallBody extends Body {
  ball: Ball;
}

export interface PegBody extends Body {
  peg: Peg;
}

export interface BasketBody extends Body {
  basket: Basket;
}

export type PlinkoBody = PegBody & BallBody & BasketBody;

export interface BallCreateModeData {
  x: number;
  y: number;
  kicks: number;
}