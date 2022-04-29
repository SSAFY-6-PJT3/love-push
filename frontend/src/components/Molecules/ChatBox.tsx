import ChatProfileEmoji from "../Atoms/ChatProfileEmoji"
import styled from "styled-components";
import { LeftMessageCount, RecentMessage, RandomNickname, Timeline } from "../Atoms/Text";
import { useNavigate } from "react-router-dom";




const ChatBox = () => {
  const navigate = useNavigate();
  
  const goChatRoom = () => {
    navigate('/chatroom');
    // navigate('/chatroom/{roompk}');
  }
  return (
    <div>
      <ChatContainer>
        <ChatProfileEmojiBox>
          <ChatProfileEmoji />
        </ChatProfileEmojiBox>
        <ChatNameMessageBox
          onClick={goChatRoom}
        >
          <RandomNickname>
            익명의 시라소니
          </RandomNickname>          
          <RecentMessage>
            이제 누가 공지해주냐
          </RecentMessage>
        </ChatNameMessageBox>
        <ChatInfoBox
          onClick={goChatRoom}
        >
          <Timeline>
          오후 2:54
          </Timeline>
          <LeftMessageCount>
            10
          </LeftMessageCount>
        </ChatInfoBox>
      </ChatContainer>
    </div>

  )
}

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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

export default ChatBox