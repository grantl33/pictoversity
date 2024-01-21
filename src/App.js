import './App.css';
import "./fonts/CaveatBrush-Regular.ttf"
import "./fonts/Inter-Regular.ttf"
import { Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import Details from './components/Details';
import Creator from './components/Creator';
import Episode from './components/Episode';
import Alert from './components/Alert';
import WindowContext from './components/WindowContext';
import Modal from './components/Modal';
import { useEffect } from 'react';
import { loadComics, loadCreators } from './api';
import { useMainDispatchContext } from './MainContext';

function App() {
  const dispatch = useMainDispatchContext();
  useEffect(() => {
    loadComics(dispatch);
    loadCreators(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/details" element={<Details />}></Route>
        <Route path="/creator" element={<Creator />}></Route>
        <Route path="/episode" element={<Episode />}></Route>
      </Routes>
      <Alert />
      <Modal />
      <WindowContext />
    </div>
  );
}

export default App;
