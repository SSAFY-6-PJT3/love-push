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
    state: messages,
    chatsActions: chatsActions,
  ): messages => {
    const new_state = { ...state };

    switch (chatsActions.type) {
      case 'INSERT': // 채팅방 추가
        new_state[chatsActions.idx] = chatsActions.messages; // 채팅방 pk로 메시지 추가
        setMessageCount((pre) => {
          pre[chatsActions.idx] = 0; // 메시지 카운트 0으로 초기화
          return pre;
        });
        break;
      case 'CHAT_MESSAGE': // 메시지 수신
        switch (chatsActions.messageType.type) {
          case 'TALK': // 일반 메시지라면
            const new_message = [
              // 특정 유저와의 메시지 리스트 가져온 후 마지막에 수신 메시지 넣은 객체 생성
              ...new_state[chatsActions.idx],
              chatsActions.messageType,
            ];
            new_state[chatsActions.idx] = new_message; // 전체 메시지 리스트 최신화
            break;
          case 'QUIT': // 방 퇴장 메시지라면
            setChatRoomList((pre) => {
              const newChatRoomList = [...pre]; // 전체 채팅방 리스트 가져옴
              for (let i in newChatRoomList) {
                // for문 돌리면서 pk가 같은 방 확인
                if (newChatRoomList[i].chatroomSeq === chatsActions.idx) {
                  // 만약 같다면
                  newChatRoomList[i].activate = false; // active false로 바꾸고 종료
                  break; // 리팩터링: dict 형태로
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
    // 이펙트 변경용
    setSignal(true);
    setTimeout(() => {
      setSignal(false);
    }, 4000);
  };

  const client = useMemo(
    // 소켓 통신 클라이언트 설정
    () =>
      new Client({
        webSocketFactory: function () {
          return new SockJS(
            'https://www.someone-might-like-you.com/api/ws-stomp', // 해당 주소로 소켓 연결
          );
        },
        onConnect: () => {
          // 연결됐을 때
          const sessionId = (
            (client.webSocket as any)._transport.url as string
          ).split('/')[6]; // sessionId 얻어옴, https 환경에서는 6번째로
          updateMySession(sessionId); // 세션id 업데이트

          client.subscribe('/sub/basic', (message) => {
            // 기본 구독 채널, 유저들의 위치 메시지 수신용
            const sector: gpsType = JSON.parse(message.body); // 위치 데이터가 수신됐다면 파싱
            nearBy100mDispatch(sector); // nearBy100mReducer로 넘김
          });

          client.subscribe(`/sub/heart/${sessionId}`, (message) => {
            // 유저의 세션id로 구독, 하트 메시지 수신용
            const whisper: whisper = JSON.parse(message.body); // 하트 보낸 사람 파싱
            changeSignal(); // 이펙트 변경을 위해 bool값 변경

            receiveMessageDispatch(whisper);
          });

          if (seq !== 0) {
            // 내가 비로그인 유저가 아라면
            client.subscribe(`/sub/user/${seq}`, (message) => {
              // 유저 pk로 구독
              const whisper: whisper = JSON.parse(message.body); // 메시지가 오면 파싱
              receiveMessageDispatch(whisper);
            }); // 리팩터링: 하트랑 유저pk부분 합치기

            findMyRoomAPI({ user: seq })
              .then((res) => {
                // 내 채팅방 목록 가져옴
                const chatRooms = res.reverse(); // 최근 만들어진 순으로
                setChatRoomList(chatRooms);

                receiveMessageDispatch({
                  type: 'INIT',
                  initSet: new Set(chatRooms.map((x) => x.userList).flat()), // 일차원화
                  chatRoom: 0,
                  person: 0,
                });

                chatRooms.forEach((chatRoom) => {
                  getChatLog({ roomSeq: chatRoom.chatroomSeq }).then(
                    // 채팅 로그 받아와 정리
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
                        // 채팅방 구독
                        setMessageCount((pre) => {
                          // 메시지 올 때마다
                          pre[idx] += 1; // 읽지 않은 메시지 카운트
                          return pre;
                        });

                        chatsDispatch({
                          // 메시지 수신 시
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

            /**
             * @author 이주현
             * 소켓 통신 취소로 가림
             */
            // heartSendSetAPI({ user: seq }).then((res) => {
            //   // 하트 보낸 유저들 목록 받아옴
            //   updateSendHeartSet(new Set(res.map((x) => x.receiveUser)));
            // });
          }

          const interval = setInterval(function () {
            if (client.connected) {
              // 세션 연결되어있고
              if (navigator.geolocation) {
                // 위치정보 받아올 수 있다면
                geoPosition(); // 받아옴
              } else {
                // 아니라면
                alert('GPS를 지원하지 않습니다'); // 지원 안함
              }
            } else {
              // 세션 연결 안되어있다면
              clearInterval(interval); // 클리어
              setGpsKey(''); // gpskey 초기화
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
      case 'HEART': // 하트 수신이라면
        if (action.person !== 0) {
          // 비로그인 유저가 아니라면
          if (
            seq !== 0 && // 내가 비로그인 유저가 아니고
            sendHeartSet.has(action.person) && // 내가 하트 보낸 유저이면서
            !chatUserSet.has(action.person) // 채팅방이 열리지 않은 유저라면
          ) {
            // 채팅방 생성 api 호출
            openChatAPI({
              sendUser: `${seq}`,
              receiveUser: `${action.person}`,
            });
          }
        }
        break;

      case 'CHATROOM': // 채팅방 생성 메시지라면
        if (!chatUserSet.has(action.person)) {
          // 채팅방 유저에 포함되어있지 않다면
          chatUserSet.add(action.person); // 채팅방 유저에 추가
          setAlertText('채팅방이 생성되었습니다!');
          openAlert();
          const newChatRoom: chatBox = {
            chatroomSeq: action.chatRoom,
            userList: [seq, action.person],
            activate: true,
          };
          setChatRoomList((pre) => [newChatRoom, ...pre]); // 채팅방 정보 업데이트

          chatsDispatch({
            // 채팅방 추가
            type: 'INSERT',
            idx: action.chatRoom,
            messages: new Array<messageType>(),
            messageType: {} as messageType,
          });

          client.subscribe(`/sub/chat/room/${action.chatRoom}`, (message) => {
            // 메시지 수신 시 카운트 증가
            setMessageCount((pre) => {
              pre[action.chatRoom] += 1;
              return pre;
            });
            // 채팅 메시지
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
      // 소켓 연결이 된 상태에서 현재 위치가 잡히지 않았거나 이전 위치와 현재 위치가 달라진 경우
      client.publish({
        // 이전 위치, 현재 위치, pk와 이모지 정보 보냄
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
    const sectorData = gpsKeyNearby100m // 내 주변 위치 gps 키로
      .map((key) => sector[`${key}`]) // 넘겨받은 sector에서 유저들을 가져옴
      .filter((v) => v !== undefined); // undefined 아닌 것들 가져옴

    const sectorObj: sectorType = Object.assign({}, ...sectorData); // 형변환

    const sessions = Object.keys(sectorObj); // 키만 얻어옴
    const setSessions = new Set(sessions); // set으로 구성

    const users = new Set(sessions.map((key) => sectorObj[key].pk)); // 유저들 pk 가져와 set 으로생성
    users.delete(seq); // 자기 자신 삭제
    users.delete(0); // pk 0 삭제(비로그인 유저 pk 넘버)

    const emojis = sessions
      .filter((key) => key !== mySession) // 내 세션 제외한 (내가 세팅한 이모지 제외한)
      .map((key) => sectorObj[key].emojiURL); // 다른 사람들 이모지 가져옴

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
      // 위치 얻어와서
      function (position) {
        setGpsKey(
          // 위도, 경도를 30m 간격으로 바꿔서 들고있게 함
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
    const gpsSectorLatLon = [gpsSector.slice(0, 3), gpsSector.slice(3)]; // 위도, 경도 파싱
    const ans: string[] = [];

    for (let i = 0; i < 2; i++) {
      gpsSectorLatLon[i][2] += latLon[i];

      for (let j = 2; j < 1; j--) {
        // 도분초 좌표계로 변환
        if (gpsSectorLatLon[i][j] < 0) {
          gpsSectorLatLon[i][j] += 60;
          gpsSectorLatLon[i][j - 1] -= 1;
        } else if (gpsSectorLatLon[i][j] >= 60) {
          gpsSectorLatLon[i][j] -= 60;
          gpsSectorLatLon[i][j - 1] += 1;
        }
      }

      if (gpsSectorLatLon[i][0] <= -180) {
        // 영국 그리니치 천문대 기준 위치정보 오류 갱신용
        for (let j = 2; j < 1; j--) {
          if (gpsSectorLatLon[i][j] > 0) {
            gpsSectorLatLon[i][j] = 60 - gpsSectorLatLon[i][j];
            gpsSectorLatLon[i][j - 1] -= 1;
          }
        }
        gpsSectorLatLon[i][0] += 360;
      }

      ans.push(gpsSectorLatLon[i].join('/'));
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
    // 내 위치 기준 주변 위치들의 gps key 생성
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
