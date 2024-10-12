import logo from './logo.svg';
import './App.css';
import { useEffect, useRef } from 'react';
import { Plinko } from './Game';

const App = () => {
  const plinko = useRef<(Plinko) | null>()
  const canvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // if (canvas.current)
  }, []);

  return (
    <div className="App">
      <canvas ref={canvas} className='canvas' />
    </div>
  );
}

export default App;
