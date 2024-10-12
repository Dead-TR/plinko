export const canvasSize = 960;
export const changeResolution = false;

export const minRows = 6;
export const maxRows = 16;

export const minDotSize = 16;
export const maxDotSize = 28;
export const startDotsAmount = 2;

export const createMode = true;
export const createModeLocalName = "CREATE_MODE_LOCAL_NAME";

export const physicConfig = {
  ball: {
    restitution: 0.65,
    friction: 0.025,
    density: 0.005,
  },
  peg: {
    friction: 0.05,
  },
  basket: {
    friction: 1,
  },
};

export const categories = {
  ball: 0x002,
  peg: 0x004,
  basket: 0x008,
};
