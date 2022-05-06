import axios from 'axios';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Client } from '@stomp/stompjs';
import { ChatRoom } from './ChatRoom';
import SockJS from 'sockjs-client';

const getRoomSeq = async (user: string) => {
  const ChatRoomList: Array<number> = [];
  const RoomRes = await axios.get(
    'https://www.someone-might-like-you.com/api/chat/findmyroom',
    {
      params: { user: user },
    },
  );
  for (var Room of RoomRes.data) {
    ChatRoomList.push(Room['chatroomSeq']);
  }

  return ChatRoomList;
};

const getHeartList = async (user: string) => {
  const HeartList = new Set<number>();
  const HeartRes = await axios.get(
    'https://www.someone-might-like-you.com/api/heart/sendheartlist',
    {
      params: { user: user },
    },
  );
  for (var Heart of HeartRes.data) {
    HeartList.add(Heart['receiveUser']);
  }

  return HeartList;
};

export const MakeChatRoomList = () => {
  const [chatRoomList, updateChatRoomList] = useState(new Array<number>());
  const [sendHeartList, updateSendHeartList] = useState(new Set<number>());
  const [isConnected, updateIsConnected] = useState(false);
  const { pk } = useParams();

  useEffect(() => {
    if (pk !== undefined) {
      getRoomSeq(pk)
        .then((res) => {
          updateChatRoomList(res);
        })
        .catch((err) => console.log(err));
      getHeartList(pk)
        .then((res) => updateSendHeartList(res))
        .catch((err) => console.log(err));
    }
    client.activate();
  }, []);

  const client = useMemo(
    () =>
      new Client({
        webSocketFactory: function () {
          return new SockJS(
            'https://www.someone-might-like-you.com/api/ws-stomp',
          );
        },
        debug: function (str) {
          console.log(str);
        },
        onConnect: () => {
          updateIsConnected(true);
          client.subscribe('/sub/basic', (message) => {
            console.log(message.body);
          });
        },
        onStompError: (frame) => {
          console.log('Broker reported error: ' + frame.headers['message']);
          console.log('Additional details: ' + frame.body);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }),
    [],
  );

  return (
    <div>
      <br />
      <p>{client.state}</p>
      {isConnected &&
        chatRoomList.map((roomSeq) => (
          <ChatRoom
            key={roomSeq.toString()}
            user={pk}
            roomSeq={roomSeq}
            client={client}
          />
        ))}
    </div>
  );
};
