import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import styled from 'styled-components';
import { IoArrowUpSharp } from 'react-icons/io5';

import {
  OtherUserChatText,
  MyChatText,
  Timeline,
} from '../components/Atoms/Text';
import { ChatInput } from '../components/Atoms/Inputs';
import Button from '../components/Atoms/Button';
import IconButton from '../components/Atoms/IconButton';
import ChatReport from '../components/Organisms/ChatReport';
import BackBtnNav from '../components/Templetes/BackBtnNav';

type message = {
  type: string;
  roomId: number;
  sender: number;
  message: string;
  sendTime: string;
};

type chatRoomProps = {
  idx: number;
  chats: message[];
  client: Client;
  setMessageCountFunc: (num: number) => void;
  chatRoomState: boolean;
};

interface CustomizedState {
  emoji: string;
  partner: number;
}

const ChatRoom: React.FC<chatRoomProps> = ({
  idx,
  chats,
  client,
  setMessageCountFunc,
  chatRoomState,
}) => {
  const navigate = useNavigate();
  const seq = Number(sessionStorage.getItem('seq') || '0');
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState<string>();
  const [partner, setPartner] = useState<number>();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim().length) {
      client.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: `${idx}`,
          sender: `${seq}`,
          message: `${message}`,
        }),
      });
      setMessage('');
    }
  };
  const sendMessage = () => {
    if (message.trim().length) {
      client.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: `${idx}`,
          sender: `${seq}`,
          message: `${message}`,
        }),
      });
      setMessage('');
    }
  };

  const location = useLocation();
  const state = location.state as CustomizedState;
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    setEmoji(state.emoji);
    setPartner(state.partner);
  }, []);
  useEffect(() => {
    if (typeof chats === 'undefined' || !chatRoomState)
      navigate('..', { replace: true });
    scrollToBottom();
    setMessageCountFunc(idx);
  }, [chats, chatRoomState]);

  return (
    <ChatRoomPage>
      <BackBtnNav
        pageTitle="익명의 시라소니"
        textColor="black"
        bgColor="#eef8ff"
        rightSideBtn={
          <IconButton imgURL="https://img.icons8.com/fluency/192/siren.png" />
        }
        onRightBtnClick={openModal}
      />
      <ChatBody ref={scrollRef}>
        {chats &&
          chats.map((chat) =>
            chat.sender !== seq ? (
              <OtherUserChatDiv key={chat.sendTime}>
                <Img src={emoji} alt="프로필 이모지" />
                <OtherUserChatText> {chat.message} </OtherUserChatText>
                <Timeline>
                  {chat.sendTime.split(' ').slice(1, 3).join(' ')}
                </Timeline>
              </OtherUserChatDiv>
            ) : (
              <MyChatDiv key={chat.sendTime}>
                <MyChatText>{chat.message}</MyChatText>
                <Timeline>
                  {chat.sendTime.split(' ').slice(1, 3).join(' ')}
                </Timeline>
              </MyChatDiv>
            ),
          )}
      </ChatBody>
      <ChatFooter>
        <ChatInput
          type="text"
          width="86%"
          value={message}
          onChange={onChangeMessage}
          onKeyUp={onKeyPress}
        />
        <Button
          width="2rem"
          height="2rem"
          bgColor="#4095FF"
          textColor="white"
          fontSize="20px"
          Radius="50%"
          margin="1rem"
          icon={<IoArrowUpSharp />}
          shadow
          children=""
          ariaLabel="채팅 보내기"
          onClick={sendMessage}
        ></Button>
      </ChatFooter>

      <div>
        {showModal && (
          <ChatReport
            isModalOpen={showModal}
            closeModal={closeModal}
            client={client}
            sender={seq}
            partnerId={partner}
            roomSeq={idx}
          />
        )}
      </div>
    </ChatRoomPage>
  );
};

const ChatRoomPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: normal;
  background-color: #eef8ff;
`;
const ChatBody = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 92);
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #eef8ff;
  border: none;
  padding: 5rem 0 0 0;
  overflow-y: scroll;
`;

const OtherUserChatDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
`;

const MyChatDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
`;

const ChatFooter = styled.div`
  bottom: 0;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 8vh;
`;

export default ChatRoom;
