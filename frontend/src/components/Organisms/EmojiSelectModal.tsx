/**
 * @author Hyeonsooryu
 */

import React, { useState, useEffect, useCallback } from 'react';
import Button from '../Atoms/Button';
import styled from 'styled-components';
import Modal from '../Atoms/Modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

interface IPropsModal {
  isModalOpen: boolean;
  closeModal: () => void;
}

const EmojiSelectModal = ({ isModalOpen, closeModal }: IPropsModal) => {
  const [img, setImg] = useState<string>();
  const [state, setState] = useState<number>(0);

  useEffect(() => {
    getImg();
  }, [img]);

  const getImg = () => {
    fetch(`http://localhost:8080`, {
      method: 'GET',
    }).then((res) => {
      console.log('기존 이모지', res);
    });
  };
  const postEmoji = () => {
    fetch(`http://localhost:8080`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ img: slides[state] }),
    }).then(() => {
      console.log('이모지 변경 성공');
    });
  };
  const slides = [
    chebrasika,
    genshinimpact,
    itachiuchiha,
    tanjirokamado,
    tom,
    uzumaki,
    astonished,
    cat,
    clown,
    dog,
    savoring,
    blowkiss,
    fire,
    hamburger,
    mask,
    gemstone,
    joker,
    greenapple,
    lion,
    peach,
    panda,
    robot,
    rocket,
    santa,
    unicorn,
    weather,
    xmas,
    zany,
  ];
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '5px',
    slidesToShow: 5,
    arrows: false,
    speed: 500,
    focusOnSelect: true,
    beforeChange: (current: any, next: any) => setState(next),
  };

  return (
    <div>
      {isModalOpen && (
        <Modal onClickToggleModal={closeModal}>
          <CarouselDiv>
            <Carousel {...settings}>
              {slides.map((slide) => (
                <div key={slide} className="slide">
                  <Img src={slide} alt="" />
                </div>
              ))}
            </Carousel>
          </CarouselDiv>
          <Button
            width="160px"
            height="40px"
            fontSize="12px"
            Radius="20px"
            margin="20px 0px 32px 0px"
            onClick={postEmoji}
          >
            선택 완료
          </Button>
          <TextTag>
            나를 표현할 이모지를{'\n'}
            골라보세요
          </TextTag>
        </Modal>
      )}
    </div>
  );
};
const DialogButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: blueviolet;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
const CarouselDiv = styled.div`
  width: 300px;
  height: 100px;
`;
const Carousel = styled(Slider)`
   .slick-list {
     height: 100px;
     display: flex;
     align-items: center;
   }
   .slick-track {
     display: flex;
     align-items: center
     height: 100px;
   }
   .slick-current {
     opacity: 1;
     transform: scale(1.6)
   }
 `;

const TextTag = styled.p`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;
export default EmojiSelectModal;
