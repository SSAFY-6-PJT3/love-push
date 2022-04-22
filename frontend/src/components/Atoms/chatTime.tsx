import dayjs from "dayjs";

const ChatTime = () => {
  return (
    <span>{dayjs().format('h:mm A')}</span>
    // <span>{dayjs(data.createdAt).format('h:mm A')}</span>
    // 나중에 createdAt을 받아서 표시하는걸로 바꾸기
    )
  }
  

export default ChatTime;