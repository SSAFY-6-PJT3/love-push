const gpsTransKey = (ori: number) => {
  let d: number = Math.floor(ori); // 도 변환
  let m: number = Math.floor((ori - d) * 60); // 분 변환
  let s10: number = Math.floor(((ori - d) * 60 - m) * 60 * 10); // 초 변환 * 10, 0.1도마다 약 3m이기 때문
  return `${d}/${m}/${s10}`;
};

export default gpsTransKey;