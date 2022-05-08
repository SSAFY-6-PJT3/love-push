import React, { useCallback, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';


type ChatRoomProps = {
  user: string | undefined;
  roomSeq: number;
  client: Client;
};

export const ChatRoom: React.FC<ChatRoomProps> = ({
  user,
  roomSeq,
  client,
}) => {
  const [message, setMessage] = useState('');

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(message);

      client.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: `${roomSeq}`,
          sender: `${user}`,
          message: `${message}`,
        }),
      });
      setMessage('');
      
    }
  };
  useEffect(() => {
    client.subscribe(`/sub/chat/room/${roomSeq}`, (message) => {
      console.log(message.body);
    });
  }, [client]);

  return (
    <div>
      <p>유저 pk: {user}</p>
      <p>채팅방 pk: {roomSeq}</p>
      <input
        type="text"
        placeholder="default"
        value={message}
        onChange={onChangeMessage}
        onKeyUp={onKeyPress}
      />
      {message}
    </div>
  );
};
