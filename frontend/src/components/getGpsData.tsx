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

    const trans_dms = (ori: number) => {
        let d: number = Math.floor(ori);
        let m: number = Math.floor((ori - d) * 60)
        let s: number = Math.floor(((ori - d) * 60 - m) * 60)
        return `${d}/${m}/${s}`
    }

  return (
    <div>
        latitude: { latitude }
        <br />
        longitude: { longitude }
        <br />
        lat_dms: {trans_dms(latitude)}
        <br />
        lon_dms: {trans_dms(longitude)}
    </div>
  )
}
