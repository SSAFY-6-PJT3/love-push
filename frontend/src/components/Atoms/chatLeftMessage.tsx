// import { useSelector } from "react-redux";
// import { MessageType } from "../../types/chatTypes";
// import { useEffect } from 'react';
// import {  } from '../../types/chatTypes';

// 페이지 내부에서 남은 메세지 숫자는 계속 갱신

const ChatLeftMessage = () => {
//   const [messageCount, setMessageCounter] = useState('0');
//   const 
// 채팅 리스트를 받아오는 컴포넌트에서 가져오도록 [ '안녕', '반가워' ]
// messageCount 초기값을 '' 으로 놓고 숫자 +가 됬었나
// 메세지가 들어오면 -> 어떤 ['안녕','반가워'] .
// count 같은거 state로 만들어서 그쪽으로 메세지가 올때마다 count를 늘리는 방향으로 해야할 것 같음.
// 요청이 오면 그냥 올라감?.
// 초기화 타이밍은 언제? -> 채팅방에 들어가면 카운트 초기화, 들어가 있으면 안쌓이도록 해주고 나가면 flag 꺼주고 그런식으로.
// flag 쓰면 불안정할 수도 ..... 있다.
// [
//   {
//   아이디:123
//   내용: '안녕'
// }
// 20개정도
// ]
// PASS
//   useEffect(()=> {
//     
//   })
  return (
    <div>
      <h1>남은 메시지 수</h1>
      <h1>10</h1>
    </div>
  )
}

export default ChatLeftMessage;