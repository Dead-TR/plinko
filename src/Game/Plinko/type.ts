import { assets } from "./assets";

export type AssetsNames = keyof typeof assets;

export interface PlinkoState {
  rows: number;
}
