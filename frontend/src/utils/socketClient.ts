import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { caculateGpsKey } from './calculateGpsKey';
import gpsTransKey from './gpsTransKey';

interface IUserData {
	loverLastName: string;
	loverFirstName: string;
	schoolSeq: number;
}

interface ISessionData {
	[index:string]: Object;
	sessionId:IUserData;
}

interface IEntierGpsData {
	[index:string]: Object;
	gpskey: ISessionData
}

class SocketClient {
	public client: Client;
	public myGpsKey: string | null = null;
	public entireGpsData: IEntierGpsData | null = null;
	public myAroundSectors: Set<string> | null = null;
	public myAroundUserData: ISessionData[] | null = null; 

	constructor() {
		/**
		 * @reference https://nobase2dev.tistory.com/25
		 * @reference https://github.com/David-Lee-dev/VIBID/blob/dev/frontend/src/components/auction/BuyerButtons.vue
		 */
		const socket = SockJS('https://www.someone-might-like-you.com/api/ws-stomp');
		this.client = over(socket)
		this.client.connect({}, () => {
			this.client.subscribe('/sub/basic', (message) => {
				this.entireGpsData = JSON.parse(message.body); // 위치 데이터가 수신됐다면 파싱
			});
			this.client.subscribe(`/sub/love`, (message) => {
				const whisper = JSON.parse(message.body);
				console.log(whisper)
			});
		});
		
		console.log(this.client)
	}

	/**
	 * 내 위치 데이터 구하기
	 */
	public getMyGpsKey() {
		navigator.geolocation.getCurrentPosition(
      (position) => {
				this.myGpsKey = `${gpsTransKey(position.coords.latitude)}/${gpsTransKey(position.coords.longitude)}`
			},
      (error) => {
        console.error(error);
        window.location.href = 'https://www.someone-might-like-you.com/location';
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      },
    );
	}
	/**
	 * 내 주변의 sector list 구하기
	 */
	public getMyAroundSectors() {
		if(!this.myGpsKey) return [];

		const result = new Set<string>();
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				result.add(caculateGpsKey(this.myGpsKey, [-i, -j]));
			}
		}
		result.add(caculateGpsKey(this.myGpsKey, [-3, 0]));
		result.add(caculateGpsKey(this.myGpsKey, [3, 0]));
		result.add(caculateGpsKey(this.myGpsKey, [0, -3]));
		result.add(caculateGpsKey(this.myGpsKey, [0, 3]));

		this.myAroundSectors = result;
	}
	/**
	 * 내 주변의 상자 데이터 구하기
	 */
	public nearBy100mDispatch() {
		if (!this.entireGpsData) return;

		const result:ISessionData[] = [];
		for(let key in this.entireGpsData) {
			if (this.myAroundSectors?.has(key)) result.push(this.entireGpsData.gpskey)
		}

		return result
	}
	/**
	 * 알림 받기
	 */
	public updateNotice(schoolSeq: number, firstName:string ,lastName:string, userDataFromSocket:IUserData ) {
		if(userDataFromSocket.schoolSeq !== schoolSeq) return false;
		if(userDataFromSocket.loverFirstName !== firstName) return false;
		if(userDataFromSocket.loverLastName !== lastName) return false;

		return true
	}
}

export default new SocketClient();