import { useEffect, useRef } from "react";

import "./App.css";
import { Plinko } from "./Game";

const App = () => {
  const plinko = useRef<Plinko | null>();
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const app = new Plinko(canvas.current);
    plinko.current = app;

    return () => {
      app.destroy();
    };
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <canvas ref={canvas} className="canvas" />
      </div>

      <div className="topPall"></div>
      <div className="bottomPanel">
        <button
          style={{
            padding: "10px 25px",
          }}
          onClick={() => {
            debugger;
            plinko.current?.play();
          }}>
          Play
        </button>
      </div>
    </div>
  );
};

export default App;
