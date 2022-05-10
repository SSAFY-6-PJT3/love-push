/**
 * @author Seung Hoon Han | UI 개발
 * @modified Joo Ho Kim | 하트 송수신 로직 추가
 * @modified Hyeonsooryu | 마크업 구조 리팩터링 & 애니메이션 추가
 */

import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import MainNav from './MainNav';
import MainFooter from './MainFooter';
import AfterBackGround from '../Molecules/AfterBackground';
import HeartBtn from '../Molecules/HeartBtn';

import { ClientContext } from '../../store/clientContext';

// start of image import
import chebrasika from '../../images/emoji/chebrasika100.svg';
import genshinimpact from '../../images/emoji/genshinimpact48.svg';
import itachiuchiha from '../../images/emoji/itachiuchiha48.svg';
import tanjirokamado from '../../images/emoji/tanjirokamado48.svg';
import tom from '../../images/emoji/tom48.svg';
import uzumaki from '../../images/emoji/uzumaki48.svg';
import astonished from '../../images/emoji/Astonished face.svg';
import gemstone from '../../images/emoji/Gemstone.svg';
import greenapple from '../../images/emoji/Green apple.svg';
import unicorn from '../../images/emoji/Unicorn.svg';
import xmas from '../../images/emoji/Xmas tree.svg';
import zany from '../../images/emoji/Zany face.svg';
import { AlertContext } from '../../store/alertContext';
// end of image import

const MainPage = () => {
  // 위치정보가 불러와진다면 유지
  // 안된다면 다시 locationpage로

  // useEffect((인원값) => {
  //   setCount(인원값)
  // })
  // 로그인 모달 함수
  // 성공시 isLogin True변환
  // 초기 로그인 유저인지 아닌지 확인 필요 useEffect사용 -> 필요없어져서 삭제했습니다.

  const { activateClient, sendHeart, signal, nearBy10mState } =
    useContext(ClientContext);
  const { openAlert, setAlertText } = useContext(AlertContext);

  useEffect(() => {
    activateClient();
  }, [activateClient]);

  const heartClickHandler = () => {
    setAlertText('하트 발사!');
    openAlert();
    sendHeart();
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

  return (
    <>
      <AfterBackGround show={signal} />
      <Container>
        <MainNav />
        {signal && (
          <Title>
            10m 이내의 누군가가 <br />
            하트를 눌렀어요! <br />
            당신을 좋아하는건 아닐까요..?
          </Title>
        )}
        {!signal && (
          <Title>
            {nearBy10mState.sessions.size === 0 ? (
              <p>
                잠시만요!
                <br />
                주변의 사용자를
                <br />
                검색하는 중이에요..
              </p>
            ) : (
              <p>
                10m 이내에 <br />
                {nearBy10mState.sessions.size - 1}명의 <br />
                사용자가 있어요!
              </p>
            )}
          </Title>
        )}
        <HeartWrapper>
          <HeartBtn show={signal} onClickHeart={heartClickHandler} />
        </HeartWrapper>
        <ImgContainer>
          {nearBy10mState.emojis.map((slide, idx) => (
            <Emoji key={idx} src={slide} alt="" />
          ))}
        </ImgContainer>
        <MainFooter />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  overflow-y: hidden;
  overflow-x: hidden;
`;

const Emoji = styled.img`
  width: 60px;
  height: 60px;
`;

const Title = styled.h1`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 700;
  color: white;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;
  animation: 0.8s ease-in-out 0s 1 normal forwards running fadeinBottom;
  @keyframes fadeinBottom {
    from {
      opacity: 0;
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const HeartWrapper = styled.div`
  width: 220px;
  height: 202px;
`;

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: start;
  justify-content: start;

  img:nth-child(1) {
    position: absolute;
    top: 70px;
    left: 30px;
  }
  img:nth-child(2) {
    position: absolute;
    top: 70px;
    left: -100px;
  }
  img:nth-child(3) {
    position: absolute;
    top: 150px;
    left: -140px;
  }
  img:nth-child(4) {
    position: absolute;
    top: 70px;
    left: 150px;
  }
  img:nth-child(5) {
    position: absolute;
    left: 60px;
  }
  img:nth-child(6) {
    position: absolute;
    left: -60px;
  }
  img:nth-child(7) {
    position: absolute;
    left: 180px;
  }
  img:nth-child(8) {
    position: absolute;
    left: -180px;
  }
  img:nth-child(9) {
    position: absolute;
    top: 70px;
    left: -220px;
  }
  img:nth-child(10) {
    position: absolute;
    top: 150px;
    left: 120px;
  }
  img:nth-child(11) {
    position: absolute;
    top: 150px;
    left: 0px;
  }
  img:nth-child(12) {
    position: absolute;
    top: 150px;
    left: -260px;
  }
`;

export default MainPage;
