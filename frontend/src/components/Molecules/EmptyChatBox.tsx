import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import MainNav from '../Templetes/MainNav';
import MainFooter from '../Templetes/MainFooter';
import AfterBackGround from '../Molecules/AfterBackground';
import HeartBtn from '../Molecules/HeartBtn';

import { readEmojiAPI } from '../../api/emojiAPI';

import { AlertContext } from '../../store/alertContext';
import { ClientContext } from '../../store/clientContext';

const EmptyChatBox = () => {
  const navigate = useNavigate();

  const heartClickHandler = () => {
    navigate('/');
  };

  const { CheckGPS, sendHeart, signal, nearBy10mState } =
    useContext(ClientContext);
  const { openAlert, setAlertText } = useContext(AlertContext);

  useDocumentTitle('채팅방이 없습니다 | 좋아하면 누르는');

  const [slides, setSildes] = useState([]);
  useEffect(() => {
    callReadEmojiAPI();
  }, []);
  const callReadEmojiAPI = () => {
    const emojiUrl = sessionStorage.getItem('emojiUrl') || '';
    readEmojiAPI({ emojiUrl: emojiUrl })
      .then((res: any) => {
        console.log(res);
        setSildes(res.slice(13, 25));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <AfterBackGround show={signal} />
      <Container>
        <MainNav />
        <Title>
          <p>
            서로 하트를 보내면
            <br />
            익명 채팅방이 개설됩니다!
            <br />
            좋아하는 사람 근처에서
            <br />
            하트를 보내보세요!
          </p>
        </Title>
        <HeartWrapper>
          <HeartBtn show={signal} onClickHeart={heartClickHandler} />
        </HeartWrapper>
        <ImgContainer>
          {slides.map((slide) => (
            <Emoji key={slide} src={slide} alt={slide} />
          ))}
        </ImgContainer>
        <MainFooter />
      </Container>
    </>
  );
};

export default EmptyChatBox;

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
  color: black;
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
