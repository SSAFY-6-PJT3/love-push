import { useEffect, useState } from 'react';
import styled from 'styled-components';

import MainNav from './MainNav';

// start of image import
import Beforeheart from '../../images/icon/heart2.svg';
import Afterheart from '../../images/icon/heart1.svg';
import chebrasika from '../../images/emoji/chebrasika100.svg';
import genshinimpact from '../../images/emoji/genshinimpact48.svg';
import itachiuchiha from '../../images/emoji/itachiuchiha48.svg';
import tanjirokamado from '../../images/emoji/tanjirokamado48.svg';
import tom from '../../images/emoji/tom48.svg';
import uzumaki from '../../images/emoji/uzumaki48.svg';
import astonished from '../../images/emoji/Astonished face.svg';
import cat from '../../images/emoji/Cat.svg';
import clown from '../../images/emoji/Clown face.svg';
import dog from '../../images/emoji/Dog.svg';
import blowkiss from '../../images/emoji/Face blowing a kiss.svg';
import savoring from '../../images/emoji/Face savoring food.svg';
import mask from '../../images/emoji/Face with medical mask.svg';
import fire from '../../images/emoji/Fire.svg';
import gemstone from '../../images/emoji/Gemstone.svg';
import greenapple from '../../images/emoji/Green apple.svg';
import hamburger from '../../images/emoji/Hamburger.svg';
import joker from '../../images/emoji/Joker.svg';
import lion from '../../images/emoji/Lion.svg';
import panda from '../../images/emoji/Panda.svg';
import peach from '../../images/emoji/Peach.svg';
import robot from '../../images/emoji/Robot.svg';
import rocket from '../../images/emoji/Rocket.svg';
import santa from '../../images/emoji/Santa Claus.svg';
import unicorn from '../../images/emoji/Unicorn.svg';
import weather from '../../images/emoji/Weather.svg';
import xmas from '../../images/emoji/Xmas tree.svg';
import zany from '../../images/emoji/Zany face.svg';
// end of image import

const MainPage = () => {
  // 위치정보가 불러와진다면 유지
  // 안된다면 다시 locationpage로

  // useEffect((인원값) => {
  //   setCount(인원값)
  // })
  const [count, setCount] = useState<number>(10);
  const [signal, setSignal] = useState<boolean>(false);
  const isLogin: boolean = true;
  // 로그인 모달 함수
  // 성공시 isLogin True변환
  // 초기 로그인 유저인지 아닌지 확인 필요 useEffect사용
  const changeSignal = () => {
    setSignal(true);
    setTimeout(() => {
      setSignal(false);
    }, 10000);
  };

  const slides1 = [
    chebrasika,
    genshinimpact,
    itachiuchiha,
    tanjirokamado,
    tom,
    uzumaki,
    astonished,
    greenapple,
    unicorn,
    zany,
    gemstone,
    xmas,
  ];
  const slides2 = [
    cat,
    clown,
    dog,
    blowkiss,
    savoring,
    mask,
    fire,
    gemstone,
    xmas,
    zany,
  ];
  const slides3 = [
    hamburger,
    joker,
    lion,
    panda,
    peach,
    robot,
    rocket,
    santa,
    weather,
  ];

  if (!isLogin) {
    return (
      <>
        <BeforeBackGround>
          <MainNav />
          <TitleTag>
            10m 이내에{'\n'}
            좋아하는 사람이 있다면{'\n'}
            하트를 눌러보세요
          </TitleTag>
          <Heart>
            {/* 클릭시 로그인화면으로 이동 */}
            <img src={Beforeheart} alt="" onClick={changeSignal} />
          </Heart>
          <EmojiDiv>
            {slides1.map((slide) => (
              <div key={slide} className="emoji">
                <EmojiImg src={slide} alt="" />
              </div>
            ))}
          </EmojiDiv>
          <ReverseEmojiDiv>
            {slides2.map((slide) => (
              <div key={slide} className="emoji">
                <EmojiImg src={slide} alt="" />
              </div>
            ))}
          </ReverseEmojiDiv>
          <EmojiDiv>
            {slides3.map((slide) => (
              <div key={slide} className="emoji">
                <EmojiImg src={slide} alt="" />
              </div>
            ))}
          </EmojiDiv>
        </BeforeBackGround>
      </>
    );
  } else if (isLogin && !signal) {
    return (
      <>
        <BeforeBackGround>
          <MainNav />
          <TitleTag>
            10m 이내에{'\n'}
            ‘좋아하면 누르는’ 사용자가{'\n'}
            {count}명 있어요
          </TitleTag>
          <Heart>
            {/* 클릭이벤트 삭제하고 시그널이 요청이 오면 바뀌게끔 하기 */}
            <img src={Beforeheart} alt="" onClick={changeSignal} />
          </Heart>
          <ImgContainer>
            {slides1.map((slide) => (
              <div key={slide}>
                <Emoji src={slide} alt="" />
              </div>
            ))}
          </ImgContainer>
        </BeforeBackGround>
      </>
    );
  } else {
    return (
      <>
        <AfterBackGround>
          <MainNav />
          <TitleTag>
            10m 이내의 누군가가{'\n'}
            하트를 눌렀어요!{'\n'}
            당신을 좋아하는건 아닐까요..?
          </TitleTag>
          <Heart>
            {/* 10초정도 보여주고 넘기기 */}
            <img src={Afterheart} alt="" />
          </Heart>
          <ImgContainer>
            {slides1.map((slide) => (
              <div key={slide}>
                <Emoji src={slide} alt="" />
              </div>
            ))}
          </ImgContainer>
        </AfterBackGround>
      </>
    );
  }
};

// const MainNavWrapper = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
// `;

const Heart = styled.div`
  animation: heart-pulse 0.9s infinite ease-out;
  @keyframes heart-pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1);
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const EmojiDiv = styled.div`
  display: flex;
  .emoji {
    margin: 0px 10px 5px 10px;
  }
  animation-name: move;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  @keyframes move {
    from {
      transform: translateX(-250px);
    }
    to {
      transform: translateX(250px);
    }
  }
`;
const ReverseEmojiDiv = styled(EmojiDiv)`
  animation-direction: alternate-reverse;
  @keyframes move {
    from {
      transform: translateX(250px);
    }
    to {
      transform: translateX(-250px);
    }
  }
`;
const EmojiImg = styled.img`
  width: 80px;
  height: 80px;
`;

const Emoji = styled.img`
  width: 60px;
  height: 60px;
`;

const TitleTag = styled.p`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 700;
  color: white;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;
`;

const BeforeBackGround = styled.div`
  background: linear-gradient(197.56deg, #63dae2 0%, #7fade8 100%);
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AfterBackGround = styled(BeforeBackGround)`
  background: linear-gradient(
    32.33deg,
    #ff9a9e 0%,
    #fad0c4 68.68%,
    #fad0c4 69.38%
  );
`;
const ImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: start;
  justify-content: start;

  div:nth-child(1) {
    position: absolute;
    top: 70px;
    left: 30px;
  }
  div:nth-child(2) {
    position: absolute;
    top: 70px;
    left: -100px;
  }
  div:nth-child(3) {
    position: absolute;
    top: 150px;
    left: -140px;
  }
  div:nth-child(4) {
    position: absolute;
    top: 70px;
    left: 150px;
  }
  div:nth-child(5) {
    position: absolute;
    left: 60px;
  }
  div:nth-child(6) {
    position: absolute;
    left: -60px;
  }
  div:nth-child(7) {
    position: absolute;
    left: 180px;
  }
  div:nth-child(8) {
    position: absolute;
    left: -180px;
  }
  div:nth-child(9) {
    position: absolute;
    top: 70px;
    left: -220px;
  }
  div:nth-child(10) {
    position: absolute;
    top: 150px;
    left: 120px;
  }
  div:nth-child(11) {
    position: absolute;
    top: 150px;
    left: 0px;
  }
  div:nth-child(12) {
    position: absolute;
    top: 150px;
    left: -260px;
  }
`;
export default MainPage;
