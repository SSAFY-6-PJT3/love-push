import heart2 from '../../images/icon/heart2.svg'
import styled from "styled-components";
import { useEffect, useState } from 'react';

const MainPage = () => {
  // useEffect((인원값) => {
  //   setCount(인원값)
  // })
  const [count, setCount] = useState<number>(0);
  const [signal, setSignal] = useState<boolean>(false);
  const isLogin: boolean = false;
  // 로그인 모달 함수
  // 성공시 isLogin True변환
  // 초기 로그인 유저인지 아닌지 확인 필요 useEffect사용
  
  if (!isLogin) {
    return (
      <BackGround>
        <TitleTag>
          10m 이내에{"\n"}
          좋아하는 사람이 있다면{"\n"}
          하트를 눌러보세요
        </TitleTag> 
        <img src={heart2} alt="" />
      </BackGround>
    )
  } else if (isLogin && !signal) {
    return (
      <BackGround>
          <TitleTag>
          10m 이내에{"\n"}
          ‘좋아하면 누르는’ 사용자가{"\n"}
          { count }명 있어요
          </TitleTag> 
          <img src={heart2} alt="" />
      </BackGround>
    )
  } else {
    return (
      <BackGround>
          <TitleTag>
          10m 이내의 누군가가{"\n"}
          하트를 눌렀어요!{"\n"}
          당신을 좋아하는건 아닐까요..?
          </TitleTag> 
          <img src={heart2} alt="" />
      </BackGround>
    )
  }
}



const TitleTag = styled.p`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 700;
  color: white;
`

const BackGround = styled.div`
  background: linear-gradient(197.56deg, #63DAE2 0%, #7FADE8 100%);
  width:100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export default MainPage;