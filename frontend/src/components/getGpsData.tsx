import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function GetGpsData() {
  const [latitude, setLatitude] = useState(0); // 위도
  const [longitude, setLongitude] = useState(0); // 경도

  const geoPosition = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
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

  const client = new Client({
    webSocketFactory: function () {
      return new SockJS('http://localhost:8080/ws-stomp');
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
  });

  client.onConnect = function (frame) {
    // console.log('Connect!');
    // console.log(frame);
    client.subscribe('/sub/chat/room/1', (message) => {
      console.log(message.body);
    });
  };

  client.onStompError = function (frame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      setInterval(function () {
        geoPosition();
        client.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            type: 'TALK',
            roomId: '1',
            sender: 'user',
            message: 'TEST',
          }),
        });
      }, 5000);
    } else {
      alert('GPS를 지원하지 않습니다');
    }
    client.activate();
  }, []);

  const gpsTransKey = (ori: number) => {
    let d: number = Math.floor(ori); // 도 변환
    let m: number = Math.floor((ori - d) * 60); // 분 변환
    let s10: number = Math.floor(((ori - d) * 60 - m) * 60 * 10); // 초 변환 * 10, 0.1도마다 약 3m이기 때문
    return `${d}/${m}/${s10}`;
  };

  return (
    <div>
      latitude: {latitude}
      <br />
      longitude: {longitude}
      <br />
      lat_key: {gpsTransKey(latitude)}
      <br />
      lon_key: {gpsTransKey(longitude)}
      <br />
    </div>
  );
}
