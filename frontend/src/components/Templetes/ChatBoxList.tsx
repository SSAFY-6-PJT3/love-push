import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ClientContext } from '../../store/clientContext';

import ChatBox from '../Organisms/ChatBox';

const ChatBoxListPage = () => {
  const navigate = useNavigate();
  // const { updateIndexFunc, chatRoomList, chats, messageCount } =
  //   useContext(ClientContext);

  // useEffect(() => {
  //   chatRoomList.forEach((chatBox) => {});
  // }, [chatRoomList]);

  const getRoomSeqEvent = (seq: number, emoji?: string, partner?: number) => {
    // updateIndexFunc(seq);
    navigate('/chat', { state: { emoji: emoji, partner: partner } });
  };
  const seq = Number(sessionStorage.getItem('seq'));

  return (
    <ChatBoxList>
      {/* {chatRoomList
        .filter((chatroom) => chatroom.activate)
        .map((chatRoom) => (
          <ChatBox
            key={chatRoom.chatroomSeq}
            chatroomSeq={chatRoom.chatroomSeq}
            partner={chatRoom.userList.filter((x) => x !== seq)[0]}
            activate={chatRoom.activate}
            clickEvent={getRoomSeqEvent}
            lastChat={
              chats &&
              chats[chatRoom.chatroomSeq] &&
              chats[chatRoom.chatroomSeq][
                chats[chatRoom.chatroomSeq].length - 1
              ]
            }
            messageCount={messageCount[chatRoom.chatroomSeq]}
          />
        ))} */}
    </ChatBoxList>
  );
};

const ChatBoxList = styled.div`
  padding: 3rem 0 0 0;
`;
export default ChatBoxListPage;
