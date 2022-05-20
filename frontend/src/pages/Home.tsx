/**
 * @author Seung Hoon Han | UI 개발
 * @modified Joo Ho Kim | 하트 송수신 로직 추가
 * @modified Hyeonsooryu | 마크업 구조 리팩터링 & 애니메이션 추가
 */

import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import MainNav from '../components/Templetes/MainNav';
import MainFooter from '../components/Templetes/MainFooter';
import AfterBackGround from '../components/Atoms/AfterBackground';
import HeartBtn from '../components/Molecules/HeartBtn';

import { ClientContext } from '../store/clientContext';

import useDocumentTitle from '../hooks/useDocumentTitle';

const MainPage = () => {
  useDocumentTitle('좋아하면 누르는');

  const { activateClient, sendHeart, signal, nearBy100mState } =
    useContext(ClientContext);

  const [pushHeart, setPushHeart] = useState(false);
  const [heartText, setHeartText] = useState('');

  useEffect(() => {
    activateClient();
  }, [activateClient]);

  useEffect(() => {
    if (signal) {
      setHeartText(
        '100m 이내의 누군가가\n하트를 눌렀어요!\n당신을 좋아하는건 아닐까요..?',
      );
    }
  }, [signal]);

  const updatePushHeart = () => {
    setHeartText(
      '주변 100m 유저에게\n하트를 전송했어요!\n하트가 교환되면 채팅방이 생성될 거에요!',
    );
    setPushHeart(true);
    setTimeout(() => {
      setPushHeart(false);
    }, 4000);
  };

  const heartClickHandler = () => {
    ReactGA.event({
      category: '하트 버튼 클릭',
      action: '하트 버튼 클릭',
    });
    updatePushHeart();
    sendHeart();
  };

  return (
    <>
      <AfterBackGround show={signal || pushHeart} />
      <Container>
        <MainNav />
        {(pushHeart || signal) && <Title>{heartText}</Title>}
        {!signal && !pushHeart && (
          <Title>
            {nearBy100mState.sessions.size === 0 ? (
              <p>
                잠시만요!
                <br />
                주변의 사용자를
                <br />
                검색하는 중이에요..
              </p>
            ) : (
              <p>
                100m 이내에 <br />
                {nearBy100mState.sessions.size - 1}명의 <br />
                사용자가 있어요!
              </p>
            )}
          </Title>
        )}
        <HeartWrapper>
          <HeartBtn
            show={signal || pushHeart}
            onClickHeart={heartClickHandler}
          />
        </HeartWrapper>
        <ImgContainer>
          {nearBy100mState.emojis.slice(0,12).map((slide, idx) => (
            <Emoji key={idx} src={slide} alt={`emoji-${idx}`} />
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
  height: calc(var(--vh, 1vh) * 100);
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
