import styled from "styled-components";
import { ChatLobbyDescription } from "../Atoms/Text";
import BackBtnNav from "../Templetes/BackBtnNav";

const EmptyChatBox = () => {
  return (
    <ChatContainer>
      <BackBtnNav pageTitle="" />
        <EmptyChatBoxBody>
          <img src="https://emojigraph.org/media/twitter/red-heart_2764-fe0f.png" alt='하트 이모지'/>
          <ChatLobbyDescription>
          서로 하트를 보내면
          </ChatLobbyDescription>
          <ChatLobbyDescription>
          익명 채팅방이 개설됩니다!
          </ChatLobbyDescription>
          <ChatLobbyDescription>
          좋아하는 사람 근처에서
          </ChatLobbyDescription>
          <ChatLobbyDescription>
          하트를 보내보세요! :D
          </ChatLobbyDescription>
        </EmptyChatBoxBody>
    </ChatContainer>
  )
}

export default EmptyChatBox

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #EEF8FF;
  justify-content: center;
`;

const EmptyChatBoxBody = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: #EEF8FF;
  margin: 4rem;
`;



