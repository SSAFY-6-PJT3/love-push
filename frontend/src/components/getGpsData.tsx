import { useEffect, useState, useMemo, useCallback, useReducer } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import gpsTransKey from '../hooks/gps/gpsTransKey';
import { openChatAPI } from '../api/openChatAPI';

interface userType {
  pk: number;
  emojiURL: string;
}
interface sectorType {
  [sector: string]: userType;
}
interface gpsType {
  [gps: string]: sectorType;
}

interface nearBy10mType {
  sessions: Set<string>;
  users: Set<number>;
}

export default function GetGpsData() {
  const [flag, setFlag] = useState(true);
  const [id, setId] = useState(0);
  const [mySession, updateMySession] = useState('');
  const [sendHeartSet, updateSendHeartSet] = useState(new Set<number>());
  const [chatUserSet, updateChatUserSet] = useState(new Set<number>());
  const [gpsKeyNearby10m, updateGpsKeyNearby10m] = useState(
    new Array<string>(),
  );
  const [clientConnected, updateClientConnected] = useState(false);

  const onChangeId = (e: any) => {
    setId(e.target.value);
  };
  // const onChangeTo = (e: any) => {
  //   setTo(e.target.value);
  // };

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
  const caculateGpsKey = (gps: string, yx: Array<number>) => {
    const gpsSector = gps.split('/').map((item) => parseInt(item));
    const gpsSector_yx = [gpsSector.slice(0, 3), gpsSector.slice(3)];
    let ans: string[] = [];

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
          setFlag(true);
          updateClientConnected(true);
          const sessionId = (
            (client.webSocket as any)._transport.url as string
          ).split('/')[5]; // sessionId 얻어옴, https 환경에서는 6번째로
          updateMySession(sessionId);

          client.subscribe(`/sub/heart/${sessionId}`, (message) => {
            // 세션 구독하게 변경(하트용)
            const whisper: Whisper = JSON.parse(message.body);
            switch (whisper.type) {
              case 'HEART':
                console.log('U RECEIVE HEART');
                if (whisper.person !== 0) {
                  receiveHeartEvent(whisper.person);
                }
                break;
              default:
                break;
            }
          });
          client.subscribe(`/sub/user/${id}`, (message) => {
            // 채팅방 생성 명령 수신(pk로)
            const whisper: Whisper = JSON.parse(message.body);
            switch (whisper.type) {
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
      }),
    [],
  );

  useEffect(() => {
    if (clientConnected) {
      client.subscribe('/sub/basic', (message) => {
        console.log(message.body);

        const sector: gpsType = JSON.parse(message.body);
        nearBy10mDispatch(sector);
      });
    }
  }, [client, clientConnected]);

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

  const testButtonEvent = useCallback(() => {
    setGpsKey('37/30/432/126/46/162');
  }, []);

  type Whisper = { type: string; person: number; chatRoom: number };

  // 하트를 확인해서 채팅방 || 리스트 추가

  // 하트 보내기
  const sendHeart = () => {
    client.publish({
      destination: '/pub/heart',
      body: JSON.stringify({
        receiveSessions: Array.from(nearBy10mState.sessions),
        receiveUsers: Array.from(nearBy10mState.users),
        sendUser: `${id}`,
      }),
    });
    updateSendHeartSet((pre) => {
      // 하트를 보낸 유저 리스트에 추가
      nearBy10mState.users.forEach((u) => pre.add(u));
      return pre;
    });
  };

  // 서로 보냈고, 채팅방이 생성 되있지않은 유저들 대상으로 챗룸 생성
  const receiveHeartEvent = async (user: number) => {
    if (id !== 0 && sendHeartSet.has(user) && !chatUserSet.has(user)) {
      console.log('CREATE CHAT ROOM');
      // 채팅방 생성 api 호출
      const res = openChatAPI({
        sendUser: `${id}`,
        receiveUser: `${user}`,
      });
      console.log(res);
    }
  };

  const gpsReducer = (beforeKey: string, nowKey: string): string => {
    if (clientConnected && beforeKey !== nowKey) {
      if (flag) {
        client.publish({
          destination: '/pub/joalarm',
          body: JSON.stringify({
            gpsKey: nowKey,
            pair: { pk: `${id}`, emojiURL: 'emoji' },
          }),
        });
        setFlag(false);
      } else {
        client.publish({
          destination: '/pub/sector',
          body: JSON.stringify({
            beforeGpsKey: beforeKey,
            nowGpsKey: nowKey,
          }),
        });
      }
    }
    return nowKey;
  };

  const nearBy10mReducer = (
    state: nearBy10mType,
    sector: gpsType,
  ): nearBy10mType => {
    const sectorData = gpsKeyNearby10m
      .map((key) => sector[`${key}`])
      .filter((v) => v !== undefined);

    const sessions = sectorData.map((v) => Object.keys(v)).flat();
    const setSessions = new Set(sessions);
    setSessions.delete(mySession);

    const values = sectorData
      .map((v) => sessions.map((k) => v[k]))
      .flat()
      .filter((v) => !!v);

    const users = new Set(values.map((v) => v.pk));
    users.delete(id);
    users.delete(0);

    return { sessions: setSessions, users: users };
  };

  const [gpsKey, setGpsKey] = useReducer(gpsReducer, '');
  const [nearBy10mState, nearBy10mDispatch] = useReducer(nearBy10mReducer, {
    sessions: new Set<string>(),
    users: new Set<number>(),
  });

  useEffect(() => {
    const gpsKeyArray: string[] = [];
    if (gpsKey !== '') {
      for (let i = -2; i < 3; i++) {
        for (let j = -2; j < 3; j++) {
          gpsKeyArray.push(caculateGpsKey(gpsKey, [-i, -j]));
        }
      }
      gpsKeyArray.push(caculateGpsKey(gpsKey, [-3, 0]));
      gpsKeyArray.push(caculateGpsKey(gpsKey, [3, 0]));
      gpsKeyArray.push(caculateGpsKey(gpsKey, [0, -3]));
      gpsKeyArray.push(caculateGpsKey(gpsKey, [0, 3]));
      updateGpsKeyNearby10m(gpsKeyArray);
    }
  }, [gpsKey]);

  return (
    <div>
      gpsKey: {gpsKey}
      <br />
      flag: {flag.toString()}
      <button onClick={testButtonEvent}>TEST</button>
      <br />
      id:{' '}
      <input
        type="text"
        placeholder="default"
        value={id}
        onChange={onChangeId}
      />
      {/* <br />
      <button onClick={subscribeHeart}>heart/id 구독</button>
      <br />
      toList:{' '}
      <input
        type="text"
        placeholder="default"
        value={to}
        onChange={onChangeTo}
      /> */}
      <br />
      <button onClick={sendHeart}>Send Heart</button>
      <br />
      <button onClick={testButtonEvent}>GpsSectorChange</button>
      <br />
      현재 내 주변 유저: {nearBy10mState.sessions.size}
      <br />
      {/* {gpsKeyNearby10m.map((v) => (
        <div key={v}>{v}</div>
      ))} */}
    </div>
  );
}
