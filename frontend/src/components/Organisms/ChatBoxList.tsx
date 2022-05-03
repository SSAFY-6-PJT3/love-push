import ChatBox from '../Molecules/ChatBox';
import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ChatTest } from '../ChatTest';
import { useEffect, useState } from 'react';
import { getChatLog } from '../../api/chatAPI';
import ChatRoom from '../Templetes/ChatRoom';

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
  [seq: number]: Array<message>;
};

const ChatBoxListPage: React.FC<chatBoxListProps> = ({
  chatBoxList,
  updateRoomSeq,
  updateRoomTitle,
}) => {
  const [chats, updateChats] = useState<messages>();
  const [index, updateIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    chatBoxList.forEach((chatBox) => {
      getChatLog({ roomSeq: chatBox.chatroomSeq }).then((res: message[]) => {
        const seq: number = chatBox.chatroomSeq;
        const reverseChat: message[] = res.reverse();
        updateChats((chat) => {
          return { ...chat, [seq]: reverseChat };
        });
      });
    });
  }, [chatBoxList]);

  const getRoomSeqEvent = (seq: number) => {
    updateIndex(seq);
    navigate('chat');
    // console.log(chats[seq]);
  };

  return (
    <ChatBoxList>
      <Routes>
        <Route
          path=""
          element={chatBoxList.map((chatRoom) => (
            <ChatBox
              key={chatRoom.chatroomSeq}
              chatroomSeq={chatRoom.chatroomSeq}
              partner={chatRoom.userList.filter((x) => x !== 1)[0]}
              activate={chatRoom.activate}
              clickEvent={getRoomSeqEvent}
              lastChat={
                chats &&
                chats[chatRoom.chatroomSeq] &&
                chats[chatRoom.chatroomSeq][
                  chats[chatRoom.chatroomSeq].length - 1
                ]
              }
            />
          ))}
        />
        <Route
          path="chat"
          element={
            <ChatRoom
              chats={chats && chats[index]}
              updateRoomSeq={updateRoomSeq}
              updateRoomTitle={updateRoomTitle}
            />
          }
        />
      </Routes>
    </ChatBoxList>
  );
};

const ChatBoxList = styled.div`
  padding: 3rem 0 0 0;
`;
export default ChatBoxListPage;
