import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";
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
    </div>
  );
};

export default App;
