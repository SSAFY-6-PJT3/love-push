import ChatBox from '../Molecules/ChatBox';
import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ChatTest } from '../ChatTest';
import { useContext, useEffect, useState } from 'react';
import { getChatLog } from '../../api/chatAPI';
import ChatRoom from '../Templetes/ChatRoom';
import { ClientContext } from '../../store/clientContext';

type chatBox = {
  chatroomSeq: number;
  userList: Array<number>;
  activate: boolean;
};

type chatBoxListProps = {
  chatBoxList: chatBox[];
  updateRoomSeq: React.Dispatch<React.SetStateAction<number>>;
  updateRoomTitle: React.Dispatch<React.SetStateAction<string>>;
};

type message = {
  type: string;
  roomId: number;
  sender: number;
  message: string;
  sendTime: string;
};

type messages = {
  [seq: number]: { messages: Array<message>; newMessage: number };
};

const ChatBoxListPage = () => {
  const navigate = useNavigate();
  const { updateIndexFunc, chatRoomList, chats } = useContext(ClientContext);

  useEffect(() => {
    chatRoomList.forEach((chatBox) => {
      // client 구독 및 채팅 수신 시 카운트 늘리는 이벤트 추가
    });
  }, [chatRoomList]);

  const getRoomSeqEvent = (seq: number, emoji?:string) => {
    updateIndexFunc(seq);
    navigate('/chat', { state: {emoji:emoji}});
    // console.log(chats[seq]);
  };

  return (
    <ChatBoxList>
      {chatRoomList.map((chatRoom) => (
        <ChatBox
          key={chatRoom.chatroomSeq}
          chatroomSeq={chatRoom.chatroomSeq}
          partner={chatRoom.userList.filter((x) => x !== 1)[0]}
          activate={chatRoom.activate}
          clickEvent={getRoomSeqEvent}
          lastChat={
            chats &&
            chats[chatRoom.chatroomSeq] &&
            chats[chatRoom.chatroomSeq][chats[chatRoom.chatroomSeq].length - 1]
          }
        />
      ))}
    </ChatBoxList>
  );
};

const ChatBoxList = styled.div`
  padding: 3rem 0 0 0;
`;
export default ChatBoxListPage;
