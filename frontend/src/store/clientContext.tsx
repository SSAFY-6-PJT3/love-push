import { Client } from "@stomp/stompjs";
import { useState, useMemo, ReactNode, createContext, useEffect } from "react";
import SockJS from "sockjs-client";
import { useCallback } from "react";
import gpsTransKey from '../hooks/gps/gpsTransKey';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { openChatAPI } from '../api/openChatAPI';


const ClientContext = createContext({
  isConnected: false,
  SetisConnected: () => {},
  DoSubscribe: () => {},
  DoPublish: () => {},
  CheckGPS: () => {},
  sendHeart: () => {},
  subscribeHeart: () => {},
  // onConnected: (login: string, passcode: string) => void; 이건 함수 반환 타입 정의
  // onConnected: (login: string, passcode: string) => { }, // 여긴 함수 정의
})
interface IPropsClientContextProvider {
  children: ReactNode;
  // 리액트 노드가 뭐임?
  // jsx내에서 사용할 수 있는 모든 요소의 타입입니다~
  // 가장 넓은 범위를 갖는 타입이에요~
  // 칠드런으로 걍 모든 타입 다 받을 수 있다구.
}

// 이거를 이제 프로바이더로 뿌려줘야한다. 전역에

const ClientContextProvider = ({ children } : IPropsClientContextProvider)  =>{
  const [isConnected, setIsConnected ] = useState(false);
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

  const caculateGpsKey = (gps: String, yx: Array<number>) => {
    const gpsSector = gps.split('/').map((item) => parseInt(item));
    const gpsSector_yx = [gpsSector.slice(0, 3), gpsSector.slice(3)];
    let ans: String[] = [];

    for (let i = 0; i < 2; i++) {
      gpsSector_yx[i][2] += yx[i];

      for (let j = 2; j < 1; j--) {
        if (gpsSector_yx[i][j] < 0) {
          gpsSector_yx[i][j] += 60;
          gpsSector_yx[i][j - 1] -= 1;
        } else if (gpsSector_yx[i][j] >= 60) {
          gpsSector_yx[i][j] -= 60;
          gpsSector_yx[i][j - 1] += 1;
        }
      }

      ans.push(gpsSector_yx[i].join('/'));
    }
    return ans.join('/');
  };

  const getGpsKeyNearby10m = useCallback(() => {
    const gpsKeyArray: String[] = [];
    for (let i = -2; i < 3; i++) {
      for (let j = -2; j < 3; j++) {
        gpsKeyArray.push(caculateGpsKey(gpsKey, [-i, -j]));
      }
    }
    gpsKeyArray.push(caculateGpsKey(gpsKey, [-3, 0]));
    gpsKeyArray.push(caculateGpsKey(gpsKey, [3, 0]));
    gpsKeyArray.push(caculateGpsKey(gpsKey, [0, -3]));
    gpsKeyArray.push(caculateGpsKey(gpsKey, [0, 3]));

    return gpsKeyArray;
  }, [gpsKey]);

  const SetisConnected = () => {useEffect(() => {
    if (isConnected) {
      setIsConnected(true);
    } else {
      setIsConnected(false);      
    }
  }, [])};

  const client = useMemo( // useMemo 쓰는 이유가 한번 커넥트 되면 이제 그만 부르려고
  () => 
    // 클라이언트가 생성이 안되면 null 혹은 언디파인 undefiend.
    // '틀'만들어놓고
    // 처음에 접근했을때, 만약에 정의가 되어있지 않으면 그때 생성 and 반환.
    // 그 다음부터는 반환만하면 되겠죵 생성이 되있으니까.
    // 생성이 안될리는 없다 최상단이니깐.
    // publish랑 subscribe 부분까지 좀 분리 가능한지.
    // 클라 쓰는 코드쪽에서 publish랑 subscribe를 좀 API 쓰듯이 간단하게 쓸 수 있는지...
    // 안되면 뭐 어쩔수 없고. TRY.
    
    // 전역에 쏴줘야한다 ? -> 모든 페이지에 전부 걸어줘야한다.
    // 어떤 페이지로 가든 클라 연결은 되야한다.
    // 페이지 전환을 해도 새로고침만 안되면 돌아는 가고 있음 Client.
    // 컨텍스트 API를 쓰는데 모든곳에 Client 이벤트를 쏘지 않고
    // 필요한 부분에서만 가져다가 쓴다. ex) 메인 페이지, 채팅 페이지

    new Client({
      webSocketFactory: function () {
         new SockJS(
           // usecallback()
           // && 으로 if문 줘서 원하는대로 뽑아주기.
          'https://www.someone-might-like-you.com/api/ws-stomp',
        );
      },
      debug: function (str) {
        console.log(str);
        console.log('디버그라구')
      },
      onConnect: () => {
        console.log("연결되었습니다.");
        setIsConnected(true);
      },
      onStompError: (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
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
    }) ,
    [],
  );

    // gps키가 존재 + 지역 들어가기 || 지역 이동
    type userType = { pk: number; emojiURL: string };
    type sectorType = { [sector: string]: userType };
    type gpsType = { [gps: string]: sectorType };
  
    const DoSubscribe = () => {useEffect(() => {
      console.log('서브스크라입')
      if (client.connected) {
        client.subscribe('/sub/basic', (message) => {
          console.log(message.body);
          
          const sector: gpsType = JSON.parse(message.body);
          const gpsKeyNearby10m = getGpsKeyNearby10m();
  
          const sectorData = gpsKeyNearby10m
            .map((key) => sector[`${key}`])
            .filter((v) => v !== undefined);
  
          const Values = sectorData
            .map((v) => Object.keys(v).map((k) => v[k]))
            .flat();
  
          const users = new Set(Values.map((v) => v.pk));
          console.log(users);
        });
      }
    }, [client, getGpsKeyNearby10m])};
  
    const DoPublish = () => {useEffect(() => {
      console.log('퍼블리쉬')
      console.log(chatUserSet);
      if (client.connected && gpsKey !== '') {
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
    }, [client, gpsKey])};
    
      // gps 확인
  const CheckGPS = () => {useEffect(() => {
    console.log('쳌GPS')
    console.log('쳌GPS')
    if (navigator.geolocation) {
      // GPS를 지원하면
      setInterval(function () {
        geoPosition();
      }, 5000);
    } else {
      alert('GPS를 지원하지 않습니다');
    }
    client.activate();
  }, [])};

  const testButtonEvent = useCallback(() => {
    // client.publish({
    //   destination: '/pub/sector',
    //   body: JSON.stringify({
    //     beforeGpsKey: `${beforeGpsKey}`,
    //     nowGpsKey: '111/222/333/444/555/666',
    //   }),
    // });
    setGpsKey('111/222/333/444/555/666');
  }, []);

  type Whisper = { type: string; person: number; chatRoom: number };

  // 하트를 확인해서 채팅방 || 리스트 추가
  const subscribeHeart = () => {
    console.log('구독')
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
  // 타이밍을 늦춰줘야함.
  const sendHeart = useCallback(() => {
    console.log('탕야')
    if (client.connected) {
    client.publish({
      destination: '/pub/heart',
      body: JSON.stringify({
        receiveUsers: [`${to}`],
        sendUser: `${id}`,
      }),
    });
    addSendUsers([Number(to)]);
  }},[client]);

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
    <ClientContext.Provider value={{
      isConnected: isConnected,
      SetisConnected: SetisConnected,
      DoSubscribe: DoSubscribe,
      DoPublish: DoPublish,
      CheckGPS: CheckGPS,
      sendHeart: sendHeart,
      subscribeHeart: subscribeHeart,
    }}
    >
      {children}
    </ClientContext.Provider>
  )
}
  // 근데 이게 onConnect()가 stomp에 들어있는 onConnec
// 여기서 인터페이스를 만들어서 넣어줘야하는데 말이야.


export { ClientContext, ClientContextProvider, };