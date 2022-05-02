import ChatProfileEmoji from '../Atoms/ChatProfileEmoji';
import styled from 'styled-components';
import {
  LeftMessageCount,
  RecentMessage,
  RandomNickname,
  Timeline,
} from '../Atoms/Text';
import { useNavigate } from 'react-router-dom';
import { getChatLog } from '../../api/chatAPI';
import { useEffect, useState } from 'react';

type ChatBoxProps = {
  chatroomSeq: number;
  partner: number;
  activate: boolean;
};

const ChatBox: React.FC<ChatBoxProps> = ({
  chatroomSeq,
  partner,
  activate,
}) => {
  const navigate = useNavigate();

  type message = {
    type: string;
    roomId: number;
    sender: number;
    message: string;
    sendTime: string;
  };

  const [chats, updateChats] = useState(new Array<message>());
  useEffect(() => {
    console.log(chats);

    getChatLog({ roomSeq: chatroomSeq }).then((res) => updateChats(res));
  }, []);

  const goChatRoom = () => {
    navigate('/chatroom');
    // navigate('/chatroom/{roompk}');
  };
  return (
    <div>
      <ChatContainer>
        <ChatProfileEmojiBox>
          <ChatProfileEmoji />
        </ChatProfileEmojiBox>
        <ChatNameMessageBox onClick={goChatRoom}>
          <RandomNickname>익명의 시라소니</RandomNickname>
          <RecentMessage>
            {chats.length ? chats[0].message : '채팅방이 생성됐어요!'}
          </RecentMessage>
        </ChatNameMessageBox>
        <ChatInfoBox onClick={goChatRoom}>
          <Timeline>
            {chats.length
              ? chats[0].sendTime.split(' ').slice(1, 3).join(' ')
              : '채팅을 보내보세요!'}
          </Timeline>
          <LeftMessageCount>10</LeftMessageCount>
        </ChatInfoBox>
      </ChatContainer>
    </div>
  );
};

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #eef8ff;
  justify-content: space-around;
`;

const ChatProfileEmojiBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ChatNameMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ChatInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Box2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ChatBox;
