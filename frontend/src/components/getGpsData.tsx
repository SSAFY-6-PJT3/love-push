import { useEffect, useState, useMemo } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gpsTransKey from '../hooks/gps/gpsTransKey'
import { openChatAPI } from '../api/openChatAPI'

export default function GetGpsData() {
  const navigate = useNavigate();
  const [gpsKey, setGpsKey] = useState('');
  const [beforeGpsKey, setBeforeGpsKey] = useState('');
  const [flag, setFlag] = useState(true);
  const [id, setId] = useState('');
  const [to, setTo] = useState('');
  const [sendHeartSet, updateSendHeartSet] = useState(new Array<number>());
  const [chatUserSet, updateChatUserSet] = useState(new Set<number>());
  
  const onChangeId = (e: any) => {
    setId(e.target.value);
  };
  const onChangeTo = (e: any) => {
    setTo(e.target.value);
  };


  // 위치정보 가져와서 위도 경도를 도 분 초로 변환
  const geoPosition = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setGpsKey(
          gpsTransKey(position.coords.latitude) +
            '/' +
            gpsTransKey(position.coords.longitude),
        );
      },
      function (error) {
        // navigate('/location');
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      },
    );
  };

  // 소켓 클라이언트 생성
  const client = useMemo(
    () =>
      new Client({
        webSocketFactory: function () {
          return new SockJS('http://localhost:8888/ws-stomp');
        },
        connectHeaders: {
          login: 'userID',
          passcode: 'userPassword',
        },
        disconnectHeaders: {
          test: 'TEST',
        },
        debug: function (str) {
          console.log(str);
        },
        onConnect: () => {
          client.subscribe('/sub/basic', (message) => {
            console.log(message.body);
          });
        },
        onStompError: (frame) => {
          console.log('Broker reported error: ' + frame.headers['message']);
          console.log('Additional details: ' + frame.body);
          client.publish({
            destination: '/pub/disconnect',
          });
        },
        // onWebSocketClose: () => {
        //   client.publish({
        //     destination: '/pub/disconnect',
        //     body: JSON.stringify({
        //       gpsKey: `${gpsKey}`,
        //     }),
        //   });
        // },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }),
    [],
  );

  // gps키가 존재 + 지역 들어가기 || 지역 이동
  useEffect(() => {
    console.log(chatUserSet);
    if (gpsKey !== '') {
      if (flag) {
        client.publish({
          destination: '/pub/joalarm',
          body: JSON.stringify({
            gpsKey: `${gpsKey}`,
            pair: { pk: 1, emojiURL: 'emoji' },
          }),
        });
        setFlag(false);
      } else if (beforeGpsKey !== gpsKey) {
        client.publish({
          destination: '/pub/sector',
          body: JSON.stringify({
            beforeGpsKey: `${beforeGpsKey}`,
            nowGpsKey: `${gpsKey}`,
          }),
        });
      }
      setBeforeGpsKey(gpsKey);
    }
  }, [client, gpsKey]);

  // gps 확인
  useEffect(() => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      setInterval(function () {
        geoPosition();
      }, 5000);
    } else {
      alert('GPS를 지원하지 않습니다');
    }
    client.activate();
  }, []);


  type Whisper = { type: string; person: number; chatRoom: number };
  
  // 하트를 확인해서 채팅방 || 리스트 추가
  const subscribeHeart = () => {
    // 로그인 완성되면 pk에 따라 connect 시 구독하게끔 변경할 것
    client.subscribe(`/sub/user/${id}`, (message) => {
      const whisper: Whisper = JSON.parse(message.body);
      switch (whisper.type) {
        case 'HEART':
          console.log('U RECEIVE HEART');
          if (whisper.person !== 0) {
            receiveHeartEvent(whisper.person);
          }
          break;
        case 'CHATROOM':
          updateChatUserSet((pre) => pre.add(whisper.person));
          console.log(`${whisper.chatRoom} 채팅방이 신설되었습니다.`);
          client.subscribe(`/sub/room/${whisper.chatRoom}`, (message) => {
            console.log(message);
          });
          break;
        default:
          break;
      }
    });
  };

  // 하트 보내기
  const sendHeart = () => {
    client.publish({
      destination: '/pub/heart',
      body: JSON.stringify({
        receiveUsers: [`${to}`],
        sendUser: `${id}`,
      }),
    });
    addSendUsers([Number(to)]);
  };

  // 서로간의 하트를 보낸 유저 리스트에 추가
  const addSendUsers = (users: number[]) => {
      updateSendHeartSet((pre) => [...pre, ...users]);
  };

  // 서로 보냈고, 채팅방이 생성 되있지않은 유저들 대상으로 챗룸 생성 
  const receiveHeartEvent = async (user: number) => {
    if (new Set(sendHeartSet).has(user) && !chatUserSet.has(user)) {
      console.log('CREATE CHAT ROOM');
      // 채팅방 생성 api 호출
      const res = openChatAPI({
        sendUser: `${id}`,
        receiveUser: `${user}`,
      });
      console.log(res);
    }
  };

  return (
    <div>
      gpsKey: {gpsKey}
      <br />
      beforeGpsKey: {beforeGpsKey}
      <br />
      flag: {flag.toString()}
      {/* <button onClick={testButtonEvent}>TEST</button> */}
      <br />
      id:{' '}
      <input
        type="text"
        placeholder="default"
        value={id}
        onChange={onChangeId}
      />
      <br />
      <button onClick={subscribeHeart}>heart/id 구독</button>
      <br />
      toList:{' '}
      <input
        type="text"
        placeholder="default"
        value={to}
        onChange={onChangeTo}
      />
      <br />
      <button onClick={sendHeart}>Send Heart</button>
      <br />
    </div>
  );
}
