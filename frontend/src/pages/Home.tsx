/**
 * @author Seung Hoon Han | UI 개발
 * @modified Joo Ho Kim | 하트 송수신 로직 추가
 * @modified Hyeonsooryu | 마크업 구조 리팩터링 & 애니메이션 추가
 */

import { useCallback, useState } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';

import MainNav from '../components/Templetes/MainNav';
import MainFooter from '../components/Templetes/MainFooter';
import AfterBackGround from '../components/Atoms/AfterBackground';
import HeartBtn from '../components/Molecules/HeartBtn';

import useDocumentTitle from '../hooks/useDocumentTitle';

import '../styles/Home.style.css';
import { heartSendSetAPI } from '../api/heartAPI';

const MainPage = () => {
  useDocumentTitle('좋아하면 누르는');

  const [pushHeart, setPushHeart] = useState(false);
  const [isNameInputOpen, setIsNameInputOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback((status: boolean) => {
    setIsNameInputOpen(status);
    setPushHeart(status);
    setFirstName('');
    setLastName('');
  }, []);

  const heartClickHandler = () => {
    if (!sessionStorage.getItem('seq')) {
      alert('로그인이 필요합니다');
      setShowModal(true);
      return;
    }
    ReactGA.event({
      category: '하트 버튼 클릭',
      action: '하트 버튼 클릭',
    });
    toggleModal(true);
  };

  const sendBtnClickHandler = async () => {
    const accountSeq = Number(sessionStorage.getItem('seq'));
    const school = sessionStorage.getItem('school');

    if (accountSeq && school) {
      try {
        const schoolSeq = JSON.parse(school).seq;

        await heartSendSetAPI({
          accountSeq,
          firstName,
          lastName,
          schoolSeq,
        });

        alert(`${firstName}${lastName}님께 마음을 전했습니다`);
      } catch (error) {
        alert(`${firstName}${lastName}님께 마음을 전하지 못했습니다`);
      } finally {
        toggleModal(false);
      }
    }
  };

  const cancelBtnClickHandler = async () => {
    toggleModal(false);
  };

  return (
    <>
      {isNameInputOpen && (
        <div className={`modal_box`}>
          <div className="name_box">
            <div className="card first_name">
              <label htmlFor="first_name">성&nbsp;씨&nbsp;&#58;&nbsp;</label>
              <input
                type="text"
                id="first_name"
                className="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="card last_name">
              <label htmlFor="last_name">이&nbsp;름&nbsp;&#58;&nbsp;</label>
              <input
                type="text"
                id="last_name"
                className="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="button_box">
              <button className="send" onClick={sendBtnClickHandler}>
                보내기
              </button>
              <button className="cancel" onClick={cancelBtnClickHandler}>
                취&nbsp;&nbsp;소
              </button>
            </div>
          </div>
        </div>
      )}
      <AfterBackGround show={pushHeart} />
      <div className="text_box">
        <MainNav showModal={showModal} setShowModal={setShowModal} />
        <div className="title">
          <p>
            누군가에게
            <br />
            당신의 마음을
            <br />
            몰래 전해보세요
          </p>
        </div>
        <div className="heart_box">
          <HeartBtn show={pushHeart} onClickHeart={heartClickHandler} />
        </div>
        <MainFooter />
      </div>
    </>
  );
};

const Emoji = styled.img`
  width: 60px;
  height: 60px;
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
