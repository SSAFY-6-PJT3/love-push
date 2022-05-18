import { Client } from '@stomp/stompjs';
import {
  useState,
  useMemo,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useContext,
} from 'react';
import SockJS from 'sockjs-client';

import gpsTransKey from '../utils/gpsTransKey';

import { openChatAPI } from '../api/openChatAPI';
import { findMyRoomAPI } from '../api/chatRoomAPI';
import { getChatLog } from '../api/chatAPI';
import { heartSendSetAPI } from '../api/heartAPI';
import { AlertContext } from './alertContext';

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

interface nearBy100mType {
  sessions: Set<string>;
  users: Set<number>;
  emojis: Array<string>;
}

interface whisper {
  type: string;
  person: number;
  chatRoom: number;
  initSet?: Set<number>;
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

interface messages {
  [seq: number]: Array<messageType>;
}

interface newMessageCount {
  [seq: number]: number;
}

interface chatsActions {
  type: string;
  messageType: messageType;
  idx: number;
  messages: Array<messageType>;
}

const ClientContextProvider = ({ children }: IPropsClientContextProvider) => {
  const { openAlert, setAlertText } = useContext(AlertContext);
  const seq = Number(sessionStorage.getItem('seq') || '0');
  const emoji =
    sessionStorage.getItem('emojiUrl') ||
    'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg';
  const [mySession, updateMySession] = useState('');
  const [gpsKeyNearby100m, updateGpsKeyNearby100m] = useState(
    new Array<string>(),
  );
  const [signal, setSignal] = useState<boolean>(false);
  const [sendHeartSet, updateSendHeartSet] = useState(new Set<number>());
  const [chatRoomList, setChatRoomList] = useState(new Array<chatBox>());
  const [messageCount, setMessageCount] = useState({} as newMessageCount);
  const setMessageCountFunc = useCallback((num: number) => {
    setMessageCount((pre) => {
      pre[num] = 0;
      return pre;
    });
  }, []);

  const chatsReducer = (
    // 현재 chat_message 부분이 시간 지나면서 2번씩 도는중, 추후 수정해볼 것..
    state: messages,
    chatsActions: chatsActions,
  ): messages => {
    const new_state = { ...state };

    switch (chatsActions.type) {
      case 'INSERT':
        new_state[chatsActions.idx] = chatsActions.messages;
        setMessageCount((pre) => {
          pre[chatsActions.idx] = 0;
          return pre;
        });
        break;
      case 'CHAT_MESSAGE':
        switch (chatsActions.messageType.type) {
          case 'TALK':
            const new_message = [
              ...new_state[chatsActions.idx],
              chatsActions.messageType,
            ];
            new_state[chatsActions.idx] = new_message;
            break;
          case 'QUIT':
            setChatRoomList((pre) => {
              const newChatRoomList = [...pre];
              for (let i in newChatRoomList) {
                if (newChatRoomList[i].chatroomSeq === chatsActions.idx) {
                  newChatRoomList[i].activate = false;
                  break;
                }
              }

              return newChatRoomList;
            });
            break;

          default:
            break;
        }
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
    }, 4000);
  };

  const client = useMemo(
    () =>
      new Client({
        webSocketFactory: function () {
          return new SockJS(
            'https://www.someone-might-like-you.com/api/ws-stomp',
          );
        },
        onConnect: () => {
          const sessionId = (
            (client.webSocket as any)._transport.url as string
          ).split('/')[6]; // sessionId 얻어옴, https 환경에서는 6번째로
          updateMySession(sessionId);

          client.subscribe('/sub/basic', (message) => {
            const sector: gpsType = JSON.parse(message.body);
            nearBy100mDispatch(sector);
          });

          client.subscribe(`/sub/heart/${sessionId}`, (message) => {
            // 세션 구독하게 변경(하트용)
            const whisper: whisper = JSON.parse(message.body);
            changeSignal();

            receiveMessageDispatch(whisper);
          });

          if (seq !== 0) {
            client.subscribe(`/sub/user/${seq}`, (message) => {
              const whisper: whisper = JSON.parse(message.body);
              receiveMessageDispatch(whisper);
            });

            findMyRoomAPI({ user: seq })
              .then((res) => {
                const chatRooms = res.reverse();
                setChatRoomList(chatRooms);

                receiveMessageDispatch({
                  type: 'INIT',
                  initSet: new Set(chatRooms.map((x) => x.userList).flat()),
                  chatRoom: 0,
                  person: 0,
                });

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
                        setMessageCount((pre) => {
                          pre[idx] += 1;
                          return pre;
                        });

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

            heartSendSetAPI({ user: seq }).then((res) => {
              updateSendHeartSet(new Set(res.map((x) => x.receiveUser)));
            });
          }

          const interval = setInterval(function () {
            if (client.connected) {
              if (navigator.geolocation) {
                geoPosition();
              } else {
                alert('GPS를 지원하지 않습니다');
              }
            } else {
              clearInterval(interval);
              setGpsKey('');
            }
          }, 5000);
        },

        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }),
    [seq],
  );

  function receiveMEssageReducer(
    chatUserSet: Set<number>,
    action: whisper,
  ): Set<number> {
    switch (action.type) {
      case 'HEART':
        if (action.person !== 0) {
          if (
            seq !== 0 &&
            sendHeartSet.has(action.person) &&
            !chatUserSet.has(action.person)
          ) {
            // 채팅방 생성 api 호출
            openChatAPI({
              sendUser: `${seq}`,
              receiveUser: `${action.person}`,
            });
          }
        }
        break;

      case 'CHATROOM':
        if (!chatUserSet.has(action.person)) {
          chatUserSet.add(action.person);
          setAlertText('채팅방이 생성되었습니다!');
          openAlert();
          const newChatRoom: chatBox = {
            chatroomSeq: action.chatRoom,
            userList: [seq, action.person],
            activate: true,
          };
          setChatRoomList((pre) => [newChatRoom, ...pre]);

          chatsDispatch({
            type: 'INSERT',
            idx: action.chatRoom,
            messages: new Array<messageType>(),
            messageType: {} as messageType,
          });

          client.subscribe(`/sub/chat/room/${action.chatRoom}`, (message) => {
            setMessageCount((pre) => {
              pre[action.chatRoom] += 1;
              return pre;
            });

            chatsDispatch({
              type: 'CHAT_MESSAGE',
              idx: action.chatRoom,
              messages: [],
              messageType: JSON.parse(message.body) as messageType,
            });
          });
        }
        break;

      case 'INIT':
        return action.initSet ? action.initSet : new Set<number>();

      default:
        break;
    }
    return chatUserSet;
  }

  const [chatUserSet, receiveMessageDispatch] = useReducer(
    receiveMEssageReducer,
    new Set<number>(),
  );

  const gpsReducer = (beforeKey: string, nowKey: string): string => {
    if (client.connected && nowKey !== '' && beforeKey !== nowKey) {
      client.publish({
        destination: '/pub/sector',
        body: JSON.stringify({
          beforeGpsKey: beforeKey,
          nowGpsKey: nowKey,
          pair: { pk: `${seq}`, emojiURL: `${emoji}` },
        }),
      });
    }
    return nowKey;
  };

  const nearBy100mReducer = (
    state: nearBy100mType,
    sector: gpsType,
  ): nearBy100mType => {
    const sectorData = gpsKeyNearby100m
      .map((key) => sector[`${key}`])
      .filter((v) => v !== undefined);

    const sectorObj: sectorType = Object.assign({}, ...sectorData);

    const sessions = Object.keys(sectorObj);
    const setSessions = new Set(sessions);

    const users = new Set(sessions.map((key) => sectorObj[key].pk));
    users.delete(seq);
    users.delete(0);

    const emojis = sessions
      .filter((key) => key !== mySession)
      .map((key) => sectorObj[key].emojiURL);

    return { sessions: setSessions, users: users, emojis: emojis };
  };

  const [gpsKey, setGpsKey] = useReducer(gpsReducer, '');
  const [nearBy100mState, nearBy100mDispatch] = useReducer(nearBy100mReducer, {
    sessions: new Set<string>(),
    users: new Set<number>(),
    emojis: new Array<string>(),
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
        console.error(error);
        window.location.href =
          'https://www.someone-might-like-you.com/location';
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      },
    );
  };

  // 소켓 클라이언트 생성
  const caculateGpsKey = (gps: string, latLon: Array<number>) => {
    const gpsSector = gps.split('/').map((item) => parseInt(item));
    const gpsSector_latLon = [gpsSector.slice(0, 3), gpsSector.slice(3)];
    const ans: string[] = [];

    for (let i = 0; i < 2; i++) {
      gpsSector_latLon[i][2] += latLon[i];

      for (let j = 2; j < 1; j--) {
        if (gpsSector_latLon[i][j] < 0) {
          gpsSector_latLon[i][j] += 60;
          gpsSector_latLon[i][j - 1] -= 1;
        } else if (gpsSector_latLon[i][j] >= 60) {
          gpsSector_latLon[i][j] -= 60;
          gpsSector_latLon[i][j - 1] += 1;
        }
      }

      if (gpsSector_latLon[i][0] <= -180) {
        for (let j = 2; j < 1; j--) {
          if (gpsSector_latLon[i][j] > 0) {
            gpsSector_latLon[i][j] = 60 - gpsSector_latLon[i][j];
            gpsSector_latLon[i][j - 1] -= 1;
          }
        }
        gpsSector_latLon[i][0] += 360;
      }

      ans.push(gpsSector_latLon[i].join('/'));
    }
    return ans.join('/');
  };

  // gps 확인
  const activateClient = useCallback(() => {
    if (!client.active) {
      client.activate();
    }
  }, [client]);

  // 하트 보내기
  const sendHeart = () => {
    client.publish({
      destination: '/pub/heart',
      body: JSON.stringify({
        receiveSessions: Array.from(nearBy100mState.sessions).filter(
          (session) => session !== mySession,
        ),
        receiveUsers: Array.from(nearBy100mState.users).filter(
          (x) => !sendHeartSet.has(x),
        ),
        sendUser: `${seq}`,
      }),
    });
    updateSendHeartSet((pre) => {
      // 하트를 보낸 유저 리스트에 추가
      nearBy100mState.users.forEach((u) => pre.add(u));
      return pre;
    });
  };

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
      updateGpsKeyNearby100m(gpsKeyArray);
    }
  }, [gpsKey]);

  return (
    <ClientContext.Provider
      value={{
        // isConnected: isConnected,
        // SetisConnected: SetisConnected,
        // gpsReducer: gpsReducer,
        activateClient: activateClient,
        sendHeart: sendHeart,
        // GpsKeyHandler: GpsKeyHandler,
        signal: signal,
        // subscribeHeart: subscribeHeart,
        nearBy100mState: nearBy100mState,
        client: client,
        chatRoomList: chatRoomList,
        updateIndexFunc: updateIndexFunc,
        index: index,
        chats: chats,
        messageCount: messageCount,
        setMessageCountFunc: setMessageCountFunc,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

const ClientContext = createContext({
  // isConnected:,
  // gpsReducer: (data:GpsInterface) => "",
  activateClient: () => {},
  sendHeart: () => {},
  // GpsKeyHandler: () => {},
  // subscribeHeart: () => {},
  signal: false,
  nearBy100mState: {
    sessions: new Set<string>(),
    users: new Set<number>(),
    emojis: new Array<string>(),
  },
  client: new Client(),
  chatRoomList: new Array<chatBox>(),
  updateIndexFunc: (num: number) => {},
  index: 0,
  chats: {} as messages,
  messageCount: {} as newMessageCount,
  setMessageCountFunc: (num: number) => {},
});

export { ClientContext, ClientContextProvider };
