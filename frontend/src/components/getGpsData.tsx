import { useEffect, useState, useMemo } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function GetGpsData() {
  const [gpsKey, setGpsKey] = useState('');
  const [beforeGpsKey, setBeforeGpsKey] = useState('');
  const [flag, setFlag] = useState(true);

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
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      },
    );
  };

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
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }),
    [],
  );

  client.onConnect = function (frame) {
    client.subscribe('/sub/basic', (message) => {
      console.log(message.body);
    });
  };

  client.onStompError = function (frame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };

  useEffect(() => {
    if (gpsKey !== '') {
      if (flag) {
        client.publish({
          destination: '/pub/joalarm',
          body: JSON.stringify({
            gpsKey: `${gpsKey}`,
            pk: '1',
            emojiURL: 'emoji',
          }),
        });
        setFlag(false);
      } else if (beforeGpsKey !== gpsKey) {
        client.publish({
          destination: '/pub/sector',
          body: JSON.stringify({
            beforeGpsKey: `${beforeGpsKey}`,
            nowGpsKey: `${gpsKey}`,
            pk: '1',
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

  // const testButtonEvent = useCallback(() => {
  //   client.publish({
  //     destination: '/pub/joalarm',
  //     body: JSON.stringify({
  //       gpsKey: `${gpsTransKey(latitude)}/${gpsTransKey(longitude)}`,
  //       pk: '1',
  //       emojiURL: 'emoji',
  //     }),
  //   });
  // }, [client]);

  return (
    <div>
      gpsKey: {gpsKey}
      <br />
      beforeGpsKey: {beforeGpsKey}
      <br />
      flag: {flag.toString()}
      {/* <button onClick={testButtonEvent}>TEST</button> */}
    </div>
  );
}
