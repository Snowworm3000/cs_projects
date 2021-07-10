import GameBoard from '../components/GameBoard';
import './App.css';

function App() {
  const rows = 10
  const cols = 10
  const spacing = 10
  const gridSize = 370

  return (
    <div className="App">
      <p>Battleships</p>
      <GameBoard
        rows={rows}
        cols={cols}
        spacing={spacing}
        boardSize={gridSize}
      />
    </div>
  );
}

export default App;
