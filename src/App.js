import './App.css';
import "./fonts/CaveatBrush-Regular.ttf"
import "./fonts/Inter-Regular.ttf"
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Details from './components/Details';
import Creator from './components/Creator';
import Episode from './components/Episode';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/details" element={<Details />}></Route>
        <Route path="/creator" element={<Creator />}></Route>
        <Route path="/episode" element={<Episode />}></Route>
      </Routes>
    </div>
  );
}

export default App;
