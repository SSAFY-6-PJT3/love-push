import ChatProfileEmoji from "../Atoms/chatProfileEmoji"
import styled from "styled-components";
import { LeftMessageCount, RecentMessage, RandomNickname, Timeline } from "../Atoms/Text";

const ChatBox2 = () => {
  return (
    <div>
      <ChatContainer>
        <ChatProfileEmojiBox>
          <ChatProfileEmoji />
        </ChatProfileEmojiBox>
        <div>
          <RandomNickname>
            익명의 시라소니
          </RandomNickname>          
          <RecentMessage>
            이제 누가 공지해주냐
          </RecentMessage>
        </div>
        <div>
          <Timeline>
          오후 2:54
          </Timeline>
          <LeftMessageCount>
            10
          </LeftMessageCount>
        </div>
      </ChatContainer>
    </div>

  )
}

const ChatContainer = styled.div`
  display: flex;
  width:100%  
  flex-direction: row;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #EEF8FF;
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


const Box2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ChatBox2