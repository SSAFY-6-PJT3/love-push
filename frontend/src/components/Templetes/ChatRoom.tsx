import styled from "styled-components";
import { ChatTitle } from "../Atoms/Text";
import { OtherUserChatText, MyChatText, Timeline } from "../Atoms/Text";
import { ChatInput } from "../Atoms/Inputs";
import Button from "../Atoms/Button";
import { IoSendSharp } from "react-icons/io5";

const ChatRoom = () => {
    return (
      <ChatRoomPage>
        <ChatTitle>익명의 시라소니</ChatTitle>
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
        <ChatFooter>
          <ChatInput type="text" />
          <Button 
            width="40px"
            height="40px"
            textColor="black"
            fontSize="20px"
            Radius="50%"
            margin="1rem"
            icon={<IoSendSharp />}
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
  just
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
  background-color: #EEF8FF;
`

export default ChatRoom;