import { useState, useEffect } from 'react';

const ChatProfileEmoji = () => {
  const [state, setState] = useState();

  useEffect(() => {
    getImg();
  }, []);

  function getImg() {
    fetch(`http://localhost:8080`, {
      method: 'GET',
    }).then((res) => {
      console.log('기존 이모지', res);
    });
  }
  // 이런식으로 채팅도 받아오면 된다.....라 ㅇㅋ

  return (
    // <img src="https://i.imgur.com/zOaV3fA.png" alt='프로필 이모지'/>
    <img src={state} alt="프로필 이모지" />

    /* <img src="{/accounts/{userPk}/emoji}" alt='프로필 이모지'/> */
  );
};

export default ChatProfileEmoji;
