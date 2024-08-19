import './App.css';
import './components/metronome.js';
import Metronome from './components/metronome.js';
import HistoryPage from './components/historyPage.js';
import { Routes, Route } from 'react-router-dom';
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Metronome />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </header>
    </div>
    </NextUIProvider>
  );
}

export default App;
