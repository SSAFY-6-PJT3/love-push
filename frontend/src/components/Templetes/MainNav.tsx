/**
 * @author Hyeonsooryu
 */

import {
  useState,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';

import { AuthContext } from '../../store/authContext';

import IconButton from '../Atoms/IconButton';
import Header from '../Atoms/Header';
import LoginModal from '../Organisms/LoginModal';
import EmojiSelectModal from '../Organisms/EmojiSelectModal';
import alertImage from '../../images/bell.png';
import AlertModal from '../Organisms/AlertModal';

const MainNav = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  // const [showModal, setShowModal] = useState(false);
  const [emojiUrl, setEmojiUrl] = useState(
    'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg',
  );

  useEffect(() => {
    const sessionEmoji = sessionStorage.getItem('emojiUrl');
    if (sessionEmoji && sessionEmoji !== 'string') {
      setEmojiUrl(sessionEmoji);
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
    if (isLoggedIn) {
      ReactGA.event({
        category: '이모지 버튼 클릭',
        action: '이모지 수정 모달 열기',
      });
    } else {
      ReactGA.event({
        category: '이모지 버튼 클릭',
        action: '회원가입 모달 열기',
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const chatBtnClickHandler = () => {
    if (isLoggedIn) {
      ReactGA.event({
        category: '채팅 버튼 클릭',
        action: '채팅 목록 진입',
      });
      navigate('/chatlobby');
    } else {
      setShowModal(true);
      ReactGA.event({
        category: '채팅 버튼 클릭',
        action: '회원가입 모달 열기',
      });
    }
  };

  return (
    <>
      <Header>
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="#EEF8FF"
          imgURL={alertImage}
          ariaLabel="이모지 변경"
          onClick={openModal}
        />
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="#EEF8FF"
          imgURL="https://img.icons8.com/emoji/48/000000/speech-balloon.png"
          ariaLabel="채팅"
          onClick={chatBtnClickHandler}
        />
      </Header>
      {isLoggedIn ? (
        // <EmojiSelectModal isModalOpen={showModal} closeModal={closeModal} />
        <AlertModal isModalOpen={showModal} closeModal={closeModal} />
      ) : (
        <LoginModal isModalOpen={showModal} closeModal={closeModal} />
      )}
    </>
  );
};

export default MainNav;
