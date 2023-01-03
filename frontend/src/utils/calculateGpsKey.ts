export const caculateGpsKey = (gps: string, latLon: Array<number>) => {
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