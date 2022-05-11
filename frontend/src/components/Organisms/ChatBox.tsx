import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { readEmojiUserAPI } from '../../api/emojiAPI';

import {
  LeftMessageCount,
  RecentMessage,
  RandomNickname,
  Timeline,
} from '../Atoms/Text';

type message = {
  type: string;
  roomId: number;
  sender: number;
  message: string;
  sendTime: string;
};

type ChatBoxProps = {
  chatroomSeq: number;
  partner: number;
  activate: boolean;
  clickEvent: (seq: number, emoji?: string, partner?: number) => void;
  lastChat: message | undefined;
  messageCount: number;
};

const ChatBox: React.FC<ChatBoxProps> = ({
  chatroomSeq,
  partner,
  clickEvent,
  lastChat,
  messageCount,
}) => {
  const [emoji, setEmoji] = useState<string>();

  useEffect(() => {
    readEmojiUserAPI({ userId: partner }).then((res) => {
      setEmoji(res);
    });
  }, []);

  return (
    <div>
      <ChatContainer onClick={() => clickEvent(chatroomSeq, emoji, partner)}>
        <ChatProfileEmojiBox>
          <ChatListEmoji src={emoji} alt="이모지" />
        </ChatProfileEmojiBox>
        <ChatNameMessageBox>
          <RandomNickname>익명의 시라소니</RandomNickname>
          <RecentMessage>
            {lastChat
              ? lastChat.message.length > 8
                ? lastChat.message.slice(0, 8) + '...'
                : lastChat.message
              : '채팅방이 생성됐어요!'}
          </RecentMessage>
        </ChatNameMessageBox>
        <ChatInfoBox>
          <Timeline>
            {lastChat
              ? lastChat.sendTime.split(' ').slice(1, 3).join(' ')
              : '--:--:--'}
          </Timeline>
          {messageCount > 0 && (
            <LeftMessageCount>{messageCount}</LeftMessageCount>
          )}
        </ChatInfoBox>
      </ChatContainer>
    </div>
  );
};

const ChatListEmoji = styled.img`
  width: 64px;
  height: 64px;
`;

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

export default ChatBox;
