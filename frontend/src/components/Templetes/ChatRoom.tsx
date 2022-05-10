import styled from 'styled-components';
import { OtherUserChatText, MyChatText, Timeline } from '../Atoms/Text';
import { ChatInput } from '../Atoms/Inputs';
import Button from '../Atoms/Button';
import { IoArrowUpSharp } from 'react-icons/io5';
import IconButton from '../Atoms/IconButton';
import BackBtnNav from './BackBtnNav';
import ChatReport from '../Molecules/ChatReport';
import { type } from 'os';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { seteuid } from 'process';

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
  // updateRoomTitle,
}) => {
  // 상위에서 prop줘야할지도
  // 새로운 채팅 오면 채팅방에 갯수 쌓기(상위에서만)
  // 채팅 기록 받아와 넣어주기
  // 로컬스토리지 가능하면 연결해보기
  // 채팅방 가져오면서 유저 emoji 받아오기 => 상위(채팅 리스트)에서 props로 내려주면 끝
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
    if (e.key === 'Enter') {
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
    if (typeof chats === 'undefined') navigate('..');
    scrollToBottom();
    setMessageCountFunc(idx);
  }, [chats]);

  return (
    <ChatRoomPage>
      <BackBtnNav
        pageTitle="익명의 시라소니"
        textColor="black"
        rightSideBtn={
          <IconButton imgURL="https://img.icons8.com/fluency/192/siren.png" />
        }
        onRightBtnClick={openModal}
        // 신고
        // 들어오면 가장 밑으로 내려가야겠넴 붙이는데도 시간이 좀 필요 할 것 같다.
      />
      <ChatBody ref={scrollRef}>
        {chats &&
          chats.map((chat) =>
            chat.sender !== seq ? ( // 로그인 한 유저 pk와 비교
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
  // height: 93vh;
  // 이거 수정좀 해야겠는데
  display: flex;
  flex-direction: column;
  align-items: normal;
  background-color: #eef8ff;
  // overflow-y: scroll;
`;
const ChatBody = styled.div`
  width: 100%;
  height: 92vh;
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
// 인풋에서 맥스 입력값을 제한 뭐 한 150자
// 둘다 maxwidth 값을 뷰포트사이즈로 줘야할듯.
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
