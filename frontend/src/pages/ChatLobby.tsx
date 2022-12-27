import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from '../store/authContext';
import { ClientContext } from '../store/clientContext';

import useDocumentTitle from '../hooks/useDocumentTitle';

import ChatBoxList from '../components/Templetes/ChatBoxList';
import EmptyChatBox from '../components/Templetes/EmptyChatBox';
import BackBtnNav from '../components/Templetes/BackBtnNav';

function ChatLobbyPage() {
  useDocumentTitle('채팅 | 좋아하면 누르는');

  const [roomTitle, updateRoomTitle] = useState('');

  const { isLoggedIn } = useContext(AuthContext);

  // const { chatRoomList } = useContext(ClientContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/');
    const seq = Number(sessionStorage.getItem('seq') || '0');
  }, []);

  return (
    <ChatLobby>
      <BackBtnNav
        pageTitle={pathname === '/chatlobby/chat' ? roomTitle : '채팅'}
        textColor="black"
      />
      {/* {chatRoomList.filter((chatRoom) => chatRoom.activate).length ? (
        <ChatBoxList />
      ) : (
        <EmptyChatBox />
      )} */}
    </ChatLobby>
  );
}

const ChatLobby = styled.div`
  width: 100%;
  height: 100%;
  align-items: normal;
  background-color: #eef8ff;
  overflow-y: auto;
`;

export default ChatLobbyPage;
