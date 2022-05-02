import styled from 'styled-components';
import { OtherUserChatText, MyChatText, Timeline } from '../Atoms/Text';
import { ChatInput } from '../Atoms/Inputs';
import Button from '../Atoms/Button';
import { IoArrowUpSharp } from 'react-icons/io5';
import IconButton from '../Atoms/IconButton';
import BackBtnNav from './BackBtnNav';
import ChatReport from '../Molecules/ChatReport';
import { type } from 'os';
import { useState } from 'react';

const ChatRoom = () => {
  type message = {
    type: string;
    roomId: number;
    sender: number;
    message: string;
    sendTime: string;
  };
  const [chats, updateChats] = useState(new Array<message>());
  // 상위에서 prop줘야할지도
  // 새로운 채팅 오면 채팅방에 갯수 쌓기(상위에서만)
  // 채팅 기록 받아와 넣어주기
  // 로컬스토리지 가능하면 연결해보기
  // 채팅방 가져오면서 유저 emoji 받아오기 => 상위(채팅 리스트)에서 props로 내려주면 끝

  return (
    <ChatRoomPage>
      <BackBtnNav
        pageTitle="익명의 시라소니"
        textColor="black"
        rightSideBtn={
          <IconButton imgURL="https://img.icons8.com/fluency/192/siren.png" />
        }
        onRightBtnClick={ChatReport}
        // 신고
        // 들어오면 가장 밑으로 내려가야겠넴 붙이는데도 시간이 좀 필요 할 것 같다.
      />
      <ChatBody>
        {chats.map((chat) =>
          chat.sender !== 1 ? ( // 로그인 한 유저 pk와 비교
            <OtherUserChatDiv>
              <Img src="emoji" alt="프로필 이모지" />
              <OtherUserChatText> {chat.message} </OtherUserChatText>
              <Timeline>{chat.sendTime}</Timeline>
            </OtherUserChatDiv>
          ) : (
            <MyChatDiv>
              <Timeline>{chat.sendTime}</Timeline>
              <MyChatText>{chat.message}</MyChatText>
            </MyChatDiv>
          ),
        )}
        {/* <OtherUserChatDiv>
          <Img src="https://i.imgur.com/zOaV3fA.png" alt="프로필 이모지" />
          <OtherUserChatText> 드디어 찾았다 </OtherUserChatText>
          <Timeline>오후 4:33</Timeline>
        </OtherUserChatDiv>
        <OtherUserChatDiv>
          <Img src="https://i.imgur.com/zOaV3fA.png" alt="프로필 이모지" />
          <OtherUserChatText> 백 회장님 밑에서 일하고 있찌 </OtherUserChatText>
          <Timeline>오후 4:34</Timeline>
        </OtherUserChatDiv>
        <OtherUserChatDiv>
          <Img src="https://i.imgur.com/zOaV3fA.png" alt="프로필 이모지" />
          <OtherUserChatText>
            {' '}
            넌 자유의 모미 아냐 넌 자유의 모미 아냐넌 자유의 모미 아냐넌 자유의
            모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌
            자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미
            아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌
            자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미
            아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌
            자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미
            아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐넌
            자유의 모미 아냐넌 자유의 모미 아냐넌 자유의 모미 아냐
          </OtherUserChatText>
          <Timeline>오후 4:35</Timeline>
        </OtherUserChatDiv>
        <OtherUserChatDiv>
          <Img src="https://i.imgur.com/zOaV3fA.png" alt="프로필 이모지" />
          <OtherUserChatText> 여태까지 그래왔고 </OtherUserChatText>
          <Timeline>오후 4:35</Timeline>
        </OtherUserChatDiv>
        <OtherUserChatDiv>
          <Img src="https://i.imgur.com/zOaV3fA.png" alt="프로필 이모지" />
          <OtherUserChatText> 아패로도 계속 </OtherUserChatText>
          <Timeline>오후 4:36</Timeline>
        </OtherUserChatDiv>
        <MyChatDiv>
          <Timeline>오후 4:36</Timeline>
          <MyChatText> 누구세요 ; </MyChatText>
        </MyChatDiv>
        <MyChatDiv>
          <Timeline>오후 4:38</Timeline>
          <MyChatText>누구냐 넌</MyChatText>
        </MyChatDiv>
        <MyChatDiv>
          <Timeline>오후 4:39</Timeline>
          <MyChatText> 오늘 저녁 뭐먹지 </MyChatText>
        </MyChatDiv> */}
      </ChatBody>
      <ChatFooter>
        <ChatInput type="text" width="86%" />
        {/* <Button
          width="2rem"
          height="2rem"
          bgColor="#4095FF"
          textColor="white"
          fontSize="20px"
          Radius="50%"
          margin="1rem"
          icon={<IoArrowUpSharp />}
          shadow
        ></Button> */}
      </ChatFooter>
    </ChatRoomPage>
  );
};

const ChatRoomPage = styled.div`
  width: 100%;
  height: 93vh;
  // 이거 수정좀 해야겠는데
  display: flex;
  flex-direction: column;
  align-items: normal;
  background-color: #eef8ff;
  overflow-y: scroll;
`;
const ChatBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #eef8ff;
  border: none;
  padding: 5rem 0 0 0;
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
  width: 4rem;
  height: 4rem;
`;

const ChatFooter = styled.div`
  bottom: 0;
  width: 100%;
  position: absolute;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 8vh;
`;

export default ChatRoom;
