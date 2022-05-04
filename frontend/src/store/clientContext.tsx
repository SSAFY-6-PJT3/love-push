import { Client } from "@stomp/stompjs";
import { useState, useMemo, ReactNode, createContext, useEffect } from "react";
import SockJS from "sockjs-client";


const ClientContext = createContext({
  isConnected: false,
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

  useEffect(() => {
    const ConnectSuccess = localStorage.getItem('isConnected');
    console.log(ConnectSuccess);
    if (ConnectSuccess) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [isConnected]);

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
    new Client({
      webSocketFactory: function () {
         new SockJS(
          'https://www.someone-might-like-you.com/api/ws-stomp',
        );
      },
      debug: function (str) {
        console.log(str);
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
    }),
    [],
  );

  return (
    <ClientContext.Provider value={{
      isConnected: isConnected,
    }}
    >
      {children}
    </ClientContext.Provider>
  )
}
  // 근데 이게 onConnect()가 stomp에 들어있는 onConnec
// 여기서 인터페이스를 만들어서 넣어줘야하는데 말이야.


export { ClientContext, ClientContextProvider };