import ChatBox from '../Molecules/ChatBox';
import styled from 'styled-components';

type ChatRoom = {
  chatroomSeq: number;
  userList: Array<number>;
  activate: boolean;
};

type ChatBoxListProps = {
  ChatRoomList: ChatRoom[];
};

const ChatBoxListPage: React.FC<ChatBoxListProps> = ({ ChatRoomList }) => {
  return (
    <ChatBoxList>
      {ChatRoomList.map((ChatRoom) => (
        <ChatBox
          key={ChatRoom.chatroomSeq}
          chatroomSeq={ChatRoom.chatroomSeq}
          partner={ChatRoom.userList.filter((x) => x !== 1)[0]}
          activate={ChatRoom.activate}
        />
      ))}
    </ChatBoxList>
  );
};

const ChatBoxList = styled.div`
  padding: 3rem 0 0 0;
`;
export default ChatBoxListPage;
