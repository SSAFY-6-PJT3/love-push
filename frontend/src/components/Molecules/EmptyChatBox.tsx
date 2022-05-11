import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { readEmojiAPI } from '../../api/emojiAPI';

const EmptyChatBox = () => {
  const [slides, setSildes] = useState([]);

  useEffect(() => {
    callReadEmojiAPI();
  }, []);

  const callReadEmojiAPI = () => {
    const emojiUrl = sessionStorage.getItem('emojiUrl') || '';
    readEmojiAPI({ emojiUrl: emojiUrl })
      .then((res: any) => {
        setSildes(res.slice(13, 25));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <Container>
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
      <ImgContainer>
        {slides.map((slide) => (
          <Emoji key={slide} src={slide} alt={slide} />
        ))}
      </ImgContainer>
    </Container>
  );
};

export default EmptyChatBox;

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
  font-size: 1.3rem;
  font-weight: 700;
  color: black;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 9rem;
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

const ImgContainer = styled.div`
  position: relative;

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
