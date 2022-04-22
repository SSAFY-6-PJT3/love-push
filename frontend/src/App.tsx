import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import KeyFrame from './pages/KeyFrame';
import ChatLobby from './components/Templetes/chatLobby'

function App() {
  const appHeight = () => {
    // ios 사파리에서 화면비가 깨지지 않도록 세팅
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight); // 사파리 상, 하단바 유무에 따른 화면비 재설정 이벤트리스너 코드
  appHeight();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KeyFrame />} />
        </Routes>
        <div>
          <Link to="chatlobby"><button>채팅</button></Link>
        </div>
        <Routes>
          <Route path="/chatlobby" element={<ChatLobby />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
