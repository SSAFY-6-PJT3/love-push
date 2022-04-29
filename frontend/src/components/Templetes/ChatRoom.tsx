import styled from "styled-components";
import { OtherUserChatText, MyChatText, Timeline } from "../Atoms/Text";
import { ChatInput } from "../Atoms/Inputs";
import Button from "../Atoms/Button";
import { IoArrowUpSharp } from "react-icons/io5";
import IconButton from "../Atoms/IconButton";
import BackBtnNav from "./BackBtnNav";

const ChatRoom = () => {
    return (
      <ChatRoomPage>
        <BackBtnNav
          pageTitle="익명의 시라소니"
          textColor="black"
          rightSideBtn={<IconButton imgURL="https://img.icons8.com/emoji/48/000000/robot-emoji.png" />}
          onRightBtnClick={() => {}}
          // 리포트 하고 연결
        />
          <ChatBody>
            <OtherUserChatDiv>
              <Img src="https://i.imgur.com/zOaV3fA.png" alt='프로필 이모지'/>
              <OtherUserChatText> 넌 자유의 모미 아냐 </OtherUserChatText>
              <Timeline>오후 4:35</Timeline>
            </OtherUserChatDiv>
            <OtherUserChatDiv>
              <Img src="https://i.imgur.com/zOaV3fA.png" alt='프로필 이모지'/>
              <OtherUserChatText> 여태까지 그래왔고 </OtherUserChatText>
              <Timeline>오후 4:35</Timeline>
            </OtherUserChatDiv>
            <OtherUserChatDiv>
              <Img src="https://i.imgur.com/zOaV3fA.png" alt='프로필 이모지'/>
              <OtherUserChatText> 아패로도 계속 </OtherUserChatText>
              <Timeline>오후 4:36</Timeline>
            </OtherUserChatDiv>
            <MyChatDiv>
              <Timeline>오후 4:36</Timeline>
              <MyChatText> 누구세요 ; </MyChatText>
            </MyChatDiv>
          </ChatBody>
          <ChatFooter>
            <ChatInput 
              type="text"
              width="86%" 
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
              shadow>
            </Button>
          </ChatFooter>
      </ChatRoomPage>
    )
  }


const ChatRoomPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: normal;
  background-color: #EEF8FF;
`
const ChatBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #EEF8FF;
  border: none;
  padding: 5rem 0 0 0;
`

const OtherUserChatDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`

const MyChatDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`

const Img = styled.img`
  width: 100px;
  height: 100px;
`

const ChatFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
`

export default ChatRoom;