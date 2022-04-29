import { useEffect, useState, useMemo, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GetGpsData() {
  const navigate = useNavigate();
  const [gpsKey, setGpsKey] = useState('');
  const [beforeGpsKey, setBeforeGpsKey] = useState('');
  const [flag, setFlag] = useState(true);
  const [id, setId] = useState('');
  const [to, setTo] = useState('');
  const [sendHeartSet, updateSendHeartSet] = useState(new Set<number>());
  const [chatUserSet, updateChatUserSet] = useState(new Set<number>());
  const onChangeId = (e: any) => {
    setId(e.target.value);
  };
  const onChangeTo = (e: any) => {
    setTo(e.target.value);
  };
  // const addSetFunc = () => {
  //   console.log(setObj);
  //   console.log(setObj.has(5));
  //   updateSetObj((pre) => pre.add(num));
  //   setNum((n) => n + 1);
  // };
  function gpsTransKey(ori: number) {
    let d: number = Math.floor(ori); // 도 변환
    let m: number = Math.floor((ori - d) * 60); // 분 변환
    let s10: number = Math.floor(((ori - d) * 60 - m) * 60 * 10); // 초 변환 * 10, 0.1도마다 약 3m이기 때문
    return `${d}/${m}/${s10}`;
  }

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
        navigate('/mainpage');
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
        onConnect: () => {},
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

  type userType = { pk: number; emojiURL: string };
  type sectorType = { [sector: string]: userType };
  type gpsType = { [gps: string]: sectorType };

  useEffect(() => {
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
  }, [client, getGpsKeyNearby10m]);

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

  const addSendUsers = (users: number[]) => {
    users.forEach((user) => {
      updateSendHeartSet((pre) => pre.add(user));
    });
  };

  const receiveHeartEvent = async (user: number) => {
    if (sendHeartSet.has(user) && !chatUserSet.has(user)) {
      console.log('CREATE CHAT ROOM');
      // 채팅방 생성 api 호출
      const res = await axios.post('http://localhost:8888/chat/room', {
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
      <button onClick={testButtonEvent}>TEST</button>
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
      <div>
        {Array.from(chatUserSet).map((v) => (
          <div key={v.toString()}>{v}</div>
        ))}
      </div>
      <br />
      <button onClick={testButtonEvent}>GpsSectorChange</button>
      <br />
      <button onClick={getGpsKeyNearby10m}>GpsSectorCaculate</button>
    </div>
  );
}
