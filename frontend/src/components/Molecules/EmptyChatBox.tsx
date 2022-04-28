import styled from "styled-components";
import { ChatTitle } from "../Atoms/Text";

const EmptyChatBox = () => {
  return (
      <div>
      <img src="https://emojigraph.org/media/twitter/red-heart_2764-fe0f.png" alt='하트 이모지'/>
      <ChatTitle>
      서로 하트를 보내면 익명 채팅방이 개설됩니다!
      </ChatTitle>
      <ChatTitle>
      좋아하는 사람 근처에서 하트를 보내보세요! :D
      </ChatTitle>
      <img src="https://jira.ssafy.com/images/icons/emoticons/biggrin.png" alt='웃는 이모티콘'/>
    </div>
  )
}

export default EmptyChatBox

const ChatContainer = styled.dialog`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
`;
