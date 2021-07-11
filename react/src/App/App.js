import { ThemeProvider } from 'styled-components';
import GameBoard from '../components/GameBoard';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';
import { useEffect } from 'react';
import theme from '../themes/default';
import './App.css';

function App() {
  const rows = 10
  const cols = 10
  const spacing = 10
  const gridSize = 370
  const APP_NAME = 'battleships'

  const [config, setConfig] = useLocalStorage(APP_NAME, {
    theme: 'default',
    bestScore: 0,
    rows: rows,
    cols: cols,
  });

  const [{ name: themeName, value: themeValue }, setTheme] = useTheme(
    config.theme,
  );

  // const [rows, setRows] = useScaleControl(config.rows);
  // const [cols, setCols] = useScaleControl(config.cols);

  useEffect(() => {
    setConfig({ rows, cols, theme: themeName });
  }, [rows, cols, themeName, setConfig]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <p>Battleships</p>
        <GameBoard
          rows={rows}
          cols={cols}
          spacing={spacing}
          boardSize={gridSize}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
