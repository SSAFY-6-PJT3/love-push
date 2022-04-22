import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import chebrasika from "../images/emoji/chebrasika200.svg"
import clawmachine from "../images/emoji/clawmachine48.png"
import engel from "../images/emoji/engel96.png"
import genshinimpact from "../images/emoji/genshinimpact48.svg"
import genie from "../images/emoji/genie64.png"
import itachiuchiha from "../images/emoji/itachiuchiha48.svg"
import kawaii from "../images/emoji/kawaii48.png"
import pocketmon from "../images/emoji/pocketmon96.png"
import tanjirokamado from "../images/emoji/tanjirokamado48.svg"
import tom from "../images/emoji/tom48.svg"
import uzumaki from "../images/emoji/uzumaki48.svg"

const EmojiCarousel = () => {
  const [state, setState] = useState({
    activeSlide: 0,
  });
  const slides = [
    chebrasika,
    clawmachine,
    engel,
    genshinimpact,
    genie,
    itachiuchiha,
    kawaii,
    pocketmon,
    tanjirokamado,
    tom,
    uzumaki
  ];
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 500,
    focusOnSelect: true,
    beforeChange: (current:any, next:any) =>
      setState({ activeSlide: next }),
  };
  return (
    <CarouselDiv>
      <Carousel {...settings}>
      {slides.map((slide) => (
        <div key={slide} className="slide">
          <Img src={slide} alt="" />
        </div>
      ))}
      </Carousel>
      슬라이드1 {slides[state.activeSlide]}
    </CarouselDiv>
  );
}

const CarouselDiv = styled.div`
  width:160px
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
export default EmojiCarousel;