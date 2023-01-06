import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { ClientContext } from './store/clientContext';

import GARoutes from './components/Atoms/GARoutes';
import CustomAlert from './components/Atoms/CustomAlert';

import Background from './styles/Background';
import GlobalStyle from './styles/GlobalStyle';

import setScreenSize from './utils/setScreenSize';

import MainPage from './pages/Home';
import Signup from './pages/Signup';
import ChatLobby from './pages/ChatLobby';
import ChatRoom from './pages/ChatRoom';
import LocationPage from './pages/Location';
import AboutService from './pages/AboutService';
import NotFound from './pages/NotFound';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import CheckContact from './pages/CheckContact';
import Eula from './pages/Eula';
import FeedList from './pages/FeedList';
import Feed from './pages/FeedDetail';
import FeedWrite from './pages/FeedWrite';

function App() {
  // const { index, chats, client, chatRoomList, setMessageCountFunc } =
  //   useContext(ClientContext);

  const [chatRoomState, setChatRoomState] = useState(true);

  useEffect(() => {
    setScreenSize();
  }, []);

  // useEffect(() => {
  //   if (chatRoomList && chatRoomList.length > 0) {
  //     const state = chatRoomList.filter(
  //       (chatRoom) => chatRoom.chatroomSeq === index,
  //     )[0];
  //     if (state && state.chatroomSeq > 0) setChatRoomState(state.activate);
  //   }
  // }, [chatRoomList]);

  return (
    <>
      <GlobalStyle />
      <Background>
        <CustomAlert />
        <BrowserRouter>
          <GARoutes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup/:pageId" element={<Signup />} />
            <Route path="/chatlobby" element={<ChatLobby />} />
            {/* <Route
              path="/chat"
              element={
                <ChatRoom
                  idx={index}
                  chats={chats && chats[index]}
                  client={client}
                  setMessageCountFunc={setMessageCountFunc}
                  chatRoomState={chatRoomState}
                />
              }
            /> */}
            <Route path="/location" element={<LocationPage />} />
            <Route path="/about-service/:pageId" element={<AboutService />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/eula" element={<Eula />} />
            <Route path="/contact/:pageId" element={<Contact />} />
            <Route path="/contact/check/" element={<CheckContact />} />
            <Route path="/FeedList" element={<FeedList />} />
            <Route path="/FeedWrite" element={<FeedWrite />} />
            <Route path="/Feed/:FeedId" element={<Feed />} />
            <Route path="*" element={<NotFound />} />
          </GARoutes>
        </BrowserRouter>
      </Background>
    </>
  );
}

export default App;
