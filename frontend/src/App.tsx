import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './Styles/GlobalStyle';
import KeyFrame from './pages/KeyFrame';
import ChatLobby from './components/Templetes/chatLobby';
import Emoji from './pages/SelectEmoji';
import StoryBook from './pages/StoryBook';
import LocationPage from './components/Templetes/LocationPage';
import MainPage from './components/Templetes/MainPage';

function App() {
  const appHeight = () => {
    // ios 사파리에서 화면비가 깨지지 않도록 세팅
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight); // 사파리 상, 하단바 유무에 따른 화면비 재설정 이벤트리스너 코드
  appHeight();

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<KeyFrame />} /> */}
          <Route path="/storybook" element={<StoryBook />} />
          <Route path="/" element={<ChatLobby />} />
          <Route path="/emoji" element={<Emoji />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
        <div>
          {/* <Link to="chatlobby">
            <button>채팅</button>
          </Link> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
