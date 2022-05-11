/**
 * @author Hyeonsooryu
 * @modified Hanseunghun
 */

import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import { AuthContext } from '../../store/authContext';
import { AlertContext } from '../../store/alertContext';

import { updateEmojiAPI, readEmojiAPI, SlidesProps } from '../../api/emojiAPI';

import Button from '../Atoms/Button';
import Modal from '../Atoms/Modal';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface IPropsModal {
  isModalOpen: boolean;
  closeModal: () => void;
}

const EmojiSelectModal = ({ isModalOpen, closeModal }: IPropsModal) => {
  const [state, setState] = useState<number>(0);
  const [slides, setSlides] = useState<SlidesProps[]>([]);
  const [token, setToken] = useState<string>('');
  const { onChangeEmoji } = useContext(AuthContext);
  const { openAlert, setAlertText, setAlertSeverity } =
    useContext(AlertContext);

  useEffect(() => {
    callReadEmojiAPI();
    setToken(sessionStorage.getItem('token') || '');
  }, []);
  const callReadEmojiAPI = () => {
    const emojiUrl = sessionStorage.getItem('emojiUrl') || '';
    readEmojiAPI({ emojiUrl: emojiUrl })
      .then((res: any) => {
        setSlides(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const callUpdateEmojiAPI = () => {
    const UpdateEmojiInfo = {
      emojiUrl: slides[state],
    };
    updateEmojiAPI(UpdateEmojiInfo, token)
      .then(() => {
        onChangeEmoji(UpdateEmojiInfo.emojiUrl.toString());
        callReadEmojiAPI();
        closeModal();
      })
      .then(() => {
        setAlertText('이모티콘 변경 완료');
        openAlert();
        window.location.reload();
      })
      .catch((err: any) => {
        setAlertSeverity('error');
        setAlertText('이모티콘 변경 실패');
        openAlert();
        closeModal();
      });
  };

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
              {slides.map((slide: any) => (
                <div key={slide} className="slide">
                  <Img src={slide} alt={slide} />
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
            ariaLabel="선택 완료"
            onClick={callUpdateEmojiAPI}
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
