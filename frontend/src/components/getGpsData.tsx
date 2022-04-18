import { useState } from 'react'

export default function GetGpsData() {
    const [latitude, setLatitude] = useState(0); // 위도
    const [longitude, setLongitude] = useState(0); // 경도

    if (navigator.geolocation) {
      // GPS를 지원하면
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
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }

    const gpsTransKey = (ori: number) => {
        let d: number = Math.floor(ori);  // 도 변환
        let m: number = Math.floor((ori - d) * 60)  // 분 변환
        let s10: number = Math.floor(((ori - d) * 60 - m) * 60 * 10)  // 초 변환 * 10, 0.1도마다 약 3m이기 때문
        return `${d}/${m}/${s10}`
    }

  return (
    <div>
        latitude: { latitude }
        <br />
        longitude: { longitude }
        <br />
        lat_key: { gpsTransKey(latitude) }
        <br />
        lon_key: { gpsTransKey(longitude) }
        <br />

    </div>
  )
}
