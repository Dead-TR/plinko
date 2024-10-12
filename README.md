# [Demo](https://dead-tr.github.io/plinko/)

# How to Run the Project

## Prerequisites

Before starting, make sure you have the following installed:

1. **Node.js** (which includes npm): Node.js is a runtime environment that allows you to run JavaScript code on your computer. npm is the package manager for Node.js.
   - Download and install Node.js from the official website: [Node.js Download](https://nodejs.org/)
   - After installation, confirm it's installed correctly by opening a terminal (Command Prompt, PowerShell, or Terminal on macOS) and running the following commands:
     `node -v`
     `npm -v`
     You should see the version numbers printed. If you do, you are ready to proceed.

- **This app was develop with _Node v18_**

## Step-by-Step Guide

1. **Download or clone the project**
   You need to have the project files on your computer. If you haven't already, either:

   - Download the project as a zip file and extract it to a folder.
   - Or, clone the project using Git:
     `git clone https://github.com/Dead-TR/plinko.git`

2. **Open the project folder**
   Open a terminal and navigate to the folder where the project files are located. You can do this by typing:
   `cd ./plinko`

3. **Install dependencies**
   The project uses several external libraries (listed in the `package.json` file). To install them, run the following command in the terminal:
   `npm install`
   This will automatically download all the necessary packages and set everything up.

4. **Run the project**
   Once the dependencies are installed, start the project by running:
   `npm run start`
   This will start a local development server.

## Troubleshooting

- If the `npm install` command fails, ensure you have a stable internet connection and the **_correct_** version of Node.js installed.
- If the project doesn't open in your browser, try opening it manually by typing `http://localhost:3000` in your browser's address bar.

# Plinko

## About Game

### How the Plinko Game Works

In Plinko, balls drop from the top of the screen and fall into baskets at the bottom, bouncing off obstacles along the way. These obstacles affect the final position of each ball, adding an element of randomness and excitement to the game.

### How it Works Online

The server sends information about which basket the ball landed in. After receiving this data, the app allows you to call the `play` method, passing in the basket where the ball should land. The WebGL animation then visualizes the ball's path accordingly.

### Flexibility

The app uses the Matter JS physics engine, making it highly flexible and customizable. At any point, you can modify the number of rows or columns, change the visual appearance, and adjust the game to suit your specific needs. This allows for easy adaptation and scalability based on different requirements.

## Config

- File path: `src/Game/Plinko/config.ts`

- **canvasSize** – The default rendering size of the app, specifying both the width and height in pixels.

- **changeResolution** – Determines whether the app resizes based on the width of the parent container.

  - If set to `true`, during `app.init`, the resolution is calculated according to the width of the parent container, which can affect performance both positively and negatively.
  - If set to `false`, the app renders with a resolution of 1 (using `canvasSize` in pixels) regardless of the parent container's size.

- **minRows** – The minimum number of rows to render `peg` elements on the game field.

- **maxRows** – The maximum number of rows to render `peg` elements on the game field.

- **minDotSize** – The minimum width of the `peg` element sprite. When the number of rows equals `maxRows`, each peg is displayed at this size.

- **maxDotSize** – The maximum width of the `peg` element sprite. When the number of rows equals `minRows`, each peg is displayed at this size. In other cases, the size of the `peg` elements is automatically determined within this range.

- **startDotsAmount** – The number of `peg` elements at the top of the path where the ball starts falling.

- **createMode** – A mode in which values are recalculated for the `paths.json` file. This is described in detail in another section of this readme.

- **createModePathLocalName** – The name of the variable in `localStorage` where the values needed to update the `paths.json` file are stored when working in create mode.

- **physicConfig** – Configuration for physical objects in Matter.js. This configuration is imported directly into the body when creating physical entities.

  - **ball** – The physics configuration for the balls that fall through the game field. The following properties define how the ball behaves when it interacts with other objects:

    - **restitution** – Controls how much energy is retained when the ball bounces off an object. A value of `0.65` means the ball will retain 65% of its energy after hitting a surface, making it bounce moderately.
    - **friction** – Defines the resistance to the ball's movement when it comes into contact with other surfaces. A value of `0.025` indicates low friction, allowing the ball to slide easily when it hits obstacles.
    - **density** – The density of the ball, which affects its mass. A value of `0.005` makes the ball relatively light, impacting how it interacts with the environment and how much it accelerates under gravity.

- **peg** – The physics configuration for the `peg` elements, which are the obstacles that the balls hit as they fall:

  - **friction** – Specifies the amount of resistance when the ball slides over the pegs. A friction value of `0.05` means there's moderate friction, so the pegs slow the ball slightly when contact occurs.

- **basket** – The physics configuration for the baskets at the bottom of the game field, where the balls ultimately fall:

  - **friction** – The friction value for the baskets is set to `1`, indicating high resistance. This means the ball is more likely to slow down or stop once it lands in the basket, preventing it from bouncing out easily.

- **categories** – Defines values used in the `collisionFilter` to set collision behavior between different game objects.

# Technologies

- TypeScript
- [PixiJS](https://pixijs.com/)
- [Matter.js](https://brm.io/matter-js/)
