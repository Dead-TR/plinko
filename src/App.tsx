import { useEffect, useRef } from "react";

import "./App.css";
import { Plinko } from "./Game";

const App = () => {
  const plinko = useRef<Plinko | null>();
  const wrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (plinko.current) plinko.current.destroy();

    const app = new Plinko(wrapper.current);
    plinko.current = app;

    return () => {
      app.destroy();
      plinko.current = null;
    };
  }, []);

  return (
    <div className="App">
      <div className="wrapper" ref={wrapper}></div>

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
