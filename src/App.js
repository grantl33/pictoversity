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
import { loadComics, loadCreators, loadLockerComicsByMemberId, loadLockerCreatorsByMemberId, loadMember, loadNotificationsByMemberId } from './api';
import { useMainContext, useMainDispatchContext } from './MainContext';
import { isNullOrUndefined } from './utils';
import About from './components/About';

function App() {
  const dispatch = useMainDispatchContext();
  // Use main context to read from state
  const mainContext = useMainContext();
  const {
    member,
  } = mainContext;
  const appMode = localStorage.getItem("appMode") === "true";
  // const location = useLocation();
  // const isAboutPage = location.pathname === "/about";
  let standaloneCheck = false;
  try {
    const standaloneCheckIOS = window.navigator.standalone === true;
    const standaloneCheckAndroid = window.matchMedia('(display-mode: standalone)').matches;
    standaloneCheck = standaloneCheckIOS || standaloneCheckAndroid;
  } catch (e) {
    console.log(e);
  }
  // Uncomment this to force the app mode (development only)
  //standaloneCheck = true;

  useEffect(() => {
    loadComics(dispatch);
    loadCreators(dispatch);
    if (isNullOrUndefined(member)) {
      const memberLogin = localStorage.getItem("memberLogin");
      if (!isNullOrUndefined(memberLogin)) {
        const loginObj = JSON.parse(memberLogin);
        loadMember(dispatch, loginObj);
      }
    }
  }, [dispatch, member]);

  useEffect(() => {
    if (!isNullOrUndefined(member)) {
      loadLockerComicsByMemberId(dispatch, member.Id);
      loadLockerCreatorsByMemberId(dispatch, member.Id);
      loadNotificationsByMemberId(dispatch, member.Id);
    }
  }, [dispatch, member]);

  const isAppMode = appMode || standaloneCheck;

  return (
    <div className={`App${(!isAppMode ? " about-page" : "")}`}>
      {!isAppMode &&
        <Routes>
          <Route path="/" element={<About />}></Route>
        </Routes>
      }
      {
        isAppMode &&
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/details" element={<Details />}></Route>
          <Route path="/creator" element={<Creator />}></Route>
          <Route path="/episode" element={<Episode />}></Route>
        </Routes>
      }
      <Alert />
      <Modal />
      <WindowContext />
    </div >
  );
}

export default App;
