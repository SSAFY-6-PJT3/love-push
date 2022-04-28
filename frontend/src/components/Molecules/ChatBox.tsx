import ChatProfileEmoji from '../Atoms/ChatProfileEmoji';
// import ChatButton from "../Atoms/chatButton"
// import ChatRecentMessage from "../Atoms/chatRecentMessage"
// import ChatLeftMessege from "../Atoms/chatLeftMessage"
import ChatReport from './ChatReport';
// import ChatSenderName from "../Atoms/chatSenderName"
// import ChatTime from "../Atoms/chatTime"

const ChatBox = () => {
  return (
    <div>
      <ChatProfileEmoji />
      {/* <ChatSenderName />
      <ChatTime />
      <ChatRecentMessage />
      <ChatLeftMessege />
      <ChatButton /> */}
      <ChatReport />
    </div>
  );
};

export default ChatBox;
