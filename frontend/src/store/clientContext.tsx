import { Client } from '@stomp/stompjs';
import {
  useState,
  useMemo,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import SockJS from 'sockjs-client';
import gpsTransKey from '../hooks/gps/gpsTransKey';
import { openChatAPI } from '../api/openChatAPI';
import { findMyRoomAPI } from '../api/chatRoomAPI';
import { getChatLog } from '../api/chatAPI';

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

interface GpsInterface {
  beforeKey: string;
  nowKey: string;
}

interface whisper {
  type: string;
  person: number;
  chatRoom: number;
}

interface IPropsClientContextProvider {
  children: ReactNode;
}

interface chatBox {
  chatroomSeq: number;
  userList: Array<number>;
  activate: boolean;
}

interface messageType {
  type: string;
  roomId: number;
  sender: number;
  message: string;
  sendTime: string;
}

// interface messages {
//   [seq: number]: { messages: Array<messageType>; newMessage: number };
// }
interface messages {
  [seq: number]: Array<messageType>;
}

interface chatsActions {
  type: string;
  messageType: messageType;
  idx: number;
  messages: Array<messageType>;
}

const ClientContextProvider = ({ children }: IPropsClientContextProvider) => {
  const seq = Number(localStorage.getItem('seq') || '0');
  const [mySession, updateMySession] = useState('');
  const [sendHeartSet, updateSendHeartSet] = useState(new Set<number>());
  const [chatUserSet, updateChatUserSet] = useState(new Set<number>());
  const [gpsKeyNearby10m, updateGpsKeyNearby10m] = useState(
    new Array<string>(),
  );
  const [clientConnected, updateClientConnected] = useState(false);
  const [signal, setSignal] = useState<boolean>(false);
  const [chatRoomList, setChatRoomList] = useState(new Array<chatBox>());

  const chatsReducer = (
    state: messages,
    chatsActions: chatsActions,
  ): messages => {
    const new_state = { ...state };

    switch (chatsActions.type) {
      case 'INSERT':
        new_state[chatsActions.idx] = chatsActions.messages;
        break;
      case 'CHAT_MESSAGE':
        const new_message = [
          ...new_state[chatsActions.idx],
          chatsActions.messageType,
        ];
        new_state[chatsActions.idx] = new_message;
        break;
      default:
        break;
    }
    return new_state;
  };

  const [chats, chatsDispatch] = useReducer(chatsReducer, {} as messages);
  const [index, updateIndex] = useState<number>(0);

  const updateIndexFunc = (num: number) => {
    updateIndex(num);
  };

  const changeSignal = () => {
    setSignal(true);
    setTimeout(() => {
      setSignal(false);
    }, 10000);
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
          updateClientConnected(true);

          const sessionId = (
            (client.webSocket as any)._transport.url as string
          ).split('/')[6]; // sessionId 얻어옴, https 환경에서는 6번째로
          updateMySession(sessionId);

          client.subscribe('/sub/basic', (message) => {
            console.log(message.body);

            const sector: gpsType = JSON.parse(message.body);
            nearBy10mDispatch(sector);
          });

          client.subscribe(`/sub/heart/${sessionId}`, (message) => {
            // 세션 구독하게 변경(하트용)
            const whisper: whisper = JSON.parse(message.body);
            receiveMessageCallback(whisper);
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

  // 유저 로그인 상태라면, 채팅방 관련 코드 돌리기
  useEffect(() => {
    if (seq !== 0 && client && client.connected) {
      client.subscribe(`/sub/user/${seq}`, (message) => {
        // 채팅방 생성 명령 수신(pk로)
        const whisper: whisper = JSON.parse(message.body);
        receiveMessageCallback(whisper);
      });

      findMyRoomAPI({ user: seq })
        .then((res) => {
          const chatRooms = res.reverse();
          setChatRoomList(chatRooms);

          chatRooms.forEach((chatRoom) => {
            getChatLog({ roomSeq: chatRoom.chatroomSeq }).then(
              (res: messageType[]) => {
                const idx: number = chatRoom.chatroomSeq;
                const reverseChat: messageType[] = res.reverse();

                chatsDispatch({
                  type: 'INSERT',
                  idx: idx,
                  messages: reverseChat,
                  messageType: {} as messageType,
                });

                client.subscribe(`/sub/chat/room/${idx}`, (message) => {
                  chatsDispatch({
                    type: 'CHAT_MESSAGE',
                    idx: idx,
                    messages: [],
                    messageType: JSON.parse(message.body) as messageType,
                  });
                });
              },
            );
          });
        })
        .catch((err) => console.log(err));
      console.log(chatRoomList);
    }
  }, [seq, client, client.connected]);

  const receiveMessageCallback = useCallback(
    (action: whisper) => {
      switch (action.type) {
        case 'HEART':
          // console.log('U RECEIVE HEART');
          changeSignal();
          if (action.person !== 0) {
            receiveHeartEvent(action.person);
          }
          break;

        case 'CHATROOM':
          updateChatUserSet((pre) => pre.add(action.person));
          // console.log(`${action.chatRoom} 채팅방이 신설되었습니다.`);
          const newChatRoom: chatBox = {
            chatroomSeq: action.chatRoom,
            userList: [seq, action.person],
            activate: true,
          };
          setChatRoomList((pre) => [newChatRoom, ...pre]);

          chatsDispatch({
            type: 'NEW_ROOM',
            idx: action.chatRoom,
            messages: new Array<messageType>(),
            messageType: {} as messageType,
          });

          client.subscribe(`/sub/chat/room/${action.chatRoom}`, (message) => {
            chatsDispatch({
              type: 'CHAT_MESSAGE',
              idx: action.chatRoom,
              messages: [],
              messageType: JSON.parse(message.body) as messageType,
            });
          });
          break;

        default:
          break;
      }
    },
    [client],
  );

  const gpsReducer = (beforeKey: string, nowKey: string): string => {
    if (clientConnected && nowKey !== '' && beforeKey !== nowKey) {
      client.publish({
        destination: '/pub/sector',
        body: JSON.stringify({
          beforeGpsKey: beforeKey,
          nowGpsKey: nowKey,
          pair: { pk: `${seq}`, emojiURL: 'emoji' },
        }),
      });
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

    const values = sectorData.map((v) => sessions.map((k) => v[k])).flat();

    const users = new Set(values.map((v) => v.pk));
    users.delete(seq);
    users.delete(0);

    return { sessions: setSessions, users: users };
  };

  const [gpsKey, setGpsKey] = useReducer(gpsReducer, '');
  const [nearBy10mState, nearBy10mDispatch] = useReducer(nearBy10mReducer, {
    sessions: new Set<string>(),
    users: new Set<number>(),
  });

  // const onChangeTo = (e: any) => {
  //   setTo(e.target.value);
  // };

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

  // gps 확인
  const CheckGPS = () => {
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
  };

  // 하트 보내기
  const sendHeart = () => {
    client.publish({
      destination: '/pub/heart',
      body: JSON.stringify({
        receiveSessions: Array.from(nearBy10mState.sessions),
        receiveUsers: Array.from(nearBy10mState.users),
        sendUser: `${seq}`,
      }),
    });
    updateSendHeartSet((pre) => {
      // 하트를 보낸 유저 리스트에 추가
      nearBy10mState.users.forEach((u) => pre.add(u));
      return pre;
    });
  };

  const receiveHeartEvent = async (user: number) => {
    if (seq !== 0 && sendHeartSet.has(user) && !chatUserSet.has(user)) {
      console.log('CREATE CHAT ROOM');
      // 채팅방 생성 api 호출
      const res = openChatAPI({
        sendUser: `${seq}`,
        receiveUser: `${user}`,
      });
      console.log(res);
    }
  };

  const GpsKeyHandler = () => {
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
  };

  return (
    <ClientContext.Provider
      value={{
        // isConnected: isConnected,
        // SetisConnected: SetisConnected,
        // gpsReducer: gpsReducer,
        CheckGPS: CheckGPS,
        sendHeart: sendHeart,
        GpsKeyHandler: GpsKeyHandler,
        signal: signal,
        // subscribeHeart: subscribeHeart,
        nearBy10mState: nearBy10mState,
        client: client,
        chatRoomList: chatRoomList,
        updateIndexFunc: updateIndexFunc,
        index: index,
        chats: chats,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

const ClientContext = createContext({
  // isConnected:,
  // gpsReducer: (data:GpsInterface) => "",
  CheckGPS: () => {},
  sendHeart: () => {},
  GpsKeyHandler: () => {},
  // subscribeHeart: () => {},
  signal: false,
  nearBy10mState: { sessions: new Set<string>(), users: new Set<number>() },
  client: new Client(),
  chatRoomList: new Array<chatBox>(),
  updateIndexFunc: (num: number) => {},
  index: 0,
  chats: {} as messages,
});

export { ClientContext, ClientContextProvider };
