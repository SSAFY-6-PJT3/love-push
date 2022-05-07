import { BrowserRouter, Route } from 'react-router-dom';

import GARoutes from './components/GARoutes';

import Background from './Styles/Background';
import GlobalStyle from './Styles/GlobalStyle';

import KeyFrame from './pages/KeyFrame';
import StoryBook from './pages/StoryBook';
import Signup from './pages/Signup';
import AboutService from './pages/AboutService';
import NotFound from './pages/NotFound';

import CustomAlert from './components/Atoms/CustomAlert';
import { ChatTest } from './components/ChatTest';
import ChatLobby from './components/Templetes/ChatLobby';
import LocationPage from './components/Templetes/LocationPage';
import MainPage from './components/Templetes/MainPage';
import { MakeChatRoomList } from './components/MakeChatRoomList';
import ChatRoom from './components/Templetes/ChatRoom';
import { useContext } from 'react';
import { ClientContext } from './store/clientContext';

function App() {
  // const appHeight = () => {
  //   // ios 사파리에서 화면비가 깨지지 않도록 세팅
  //   const doc = document.documentElement;
  //   doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  // };
  // window.addEventListener('resize', appHeight); // 사파리 상, 하단바 유무에 따른 화면비 재설정 이벤트리스너 코드
  // appHeight();
  const { index, chats, client } = useContext(ClientContext);

  return (
    <>
      <GlobalStyle />
      <Background>
        <CustomAlert />
        <BrowserRouter>
          <GARoutes>
            {/* <Route path="/" element={<KeyFrame />} /> */}
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/signup/:pageId" element={<Signup />} />
            <Route path="/chatlobby" element={<ChatLobby />} />
            <Route
              path="/chat"
              element={
                <ChatRoom
                  idx={index}
                  chats={chats && chats[index]}
                  client={client}
                />
              }
            />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/test" element={<KeyFrame />} />
            <Route path="/storybook" element={<StoryBook />} />
            <Route path="/chatroom/:pk" element={<MakeChatRoomList />} />
            <Route path="/about-service/:pageId" element={<AboutService />} />
            <Route path="*" element={<NotFound />} />
          </GARoutes>
        </BrowserRouter>
      </Background>
    </>
  );
}

export default App;
