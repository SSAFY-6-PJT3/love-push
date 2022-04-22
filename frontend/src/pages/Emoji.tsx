import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";
import Modal from "../components/Atoms/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chebrasika from "../images/emoji/chebrasika100.svg";
import genshinimpact from "../images/emoji/genshinimpact48.svg";
import itachiuchiha from "../images/emoji/itachiuchiha48.svg";
import tanjirokamado from "../images/emoji/tanjirokamado48.svg";
import tom from "../images/emoji/tom48.svg";
import uzumaki from "../images/emoji/uzumaki48.svg";
import astonished from "../images/emoji/Astonished face.svg";
import cat from "../images/emoji/Cat.svg";
import clown from "../images/emoji/Clown face.svg";
import dog from "../images/emoji/Dog.svg";
import blowkiss from "../images/emoji/Face blowing a kiss.svg";
import savoring from "../images/emoji/Face savoring food.svg";
import mask from "../images/emoji/Face with medical mask.svg";
import fire from "../images/emoji/Fire.svg";
import gemstone from "../images/emoji/Gemstone.svg";
import greenapple from "../images/emoji/Green apple.svg";
import hamburger from "../images/emoji/Hamburger.svg";
import joker from "../images/emoji/Joker.svg";
import lion from "../images/emoji/Lion.svg";
import panda from "../images/emoji/Panda.svg";
import peach from "../images/emoji/Peach.svg";
import robot from "../images/emoji/Robot.svg";
import rocket from "../images/emoji/Rocket.svg";
import santa from "../images/emoji/Santa Claus.svg";
import unicorn from "../images/emoji/Unicorn.svg";
import weather from "../images/emoji/Weather.svg";
import xmas from "../images/emoji/Xmas tree.svg";
import zany from "../images/emoji/Zany face.svg";


const Emoji = () => {
  const [img, setImg] = useState<string>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [state, setState] = useState<number>(0);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);


  useEffect(() => {
    getImg()
  }, [img]);

  const getImg = () => {
    fetch(`http://localhost:8080`,
      {
        method: "GET",
      })
      .then((res) => {
        console.log('기존 이모지', res)
      })
  }
  const postEmoji = () => {
    fetch(`http://localhost:8080`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ img: slides[state] }),
      })
      .then(() => {
        console.log('이모지 변경 성공')
      })
  }
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
    mask ,
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
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    beforeChange: (current:any, next:any) =>
      setState(next),
  };

  return (
    <div>
      <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <CarouselDiv>
            <Carousel {...settings}>
            {slides.map((slide) => (
              <div key={slide} className="slide">
                <Img src={slide} alt="" />
              </div>
            ))}
            </Carousel>
          </CarouselDiv>
          <button onClick={postEmoji}>이모지 선택하기</button>
          <p>나를 표현할 이모지를 골라보세요</p>
        </Modal>
      )}
      
    </div>
    
  )
}
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

  &:hover {
    transform: translateY(-1px);
  }
`;
const CarouselDiv = styled.div`
  width:400px;
  height: 100%;
`
const Carousel = styled(Slider)`
  .slick-current {
    opacity: 1;
    transform: scale(1.3)
  }
`;


const Img = styled.img`
  width: 100px;
  height: 100px;
`
export default Emoji;