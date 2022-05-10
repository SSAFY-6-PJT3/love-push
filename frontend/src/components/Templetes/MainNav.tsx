/**
 * @author Hyeonsooryu
 */

import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../store/authContext';

import { readEmojiUserAPI } from '../../api/emojiAPI';

import IconButton from '../Atoms/IconButton';
import Header from '../Organisms/Header';
import LoginModal from '../Organisms/LoginModal';
import EmojiSelectModal from '../Organisms/EmojiSelectModal';

const MainNav = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [emojiUrl, setEmojiUrl] = useState(
    'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Astonished%20face.svg',
  );

  useEffect(() => {
    const sessionEmoji = sessionStorage.getItem('emojiUrl');
    if (sessionEmoji && sessionEmoji !== 'string') {
      setEmojiUrl(sessionEmoji);
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const chatBtnClickHandler = () => {
    if (isLoggedIn) {
      navigate('/chatlobby');
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Header>
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="#EEF8FF"
          imgURL={emojiUrl}
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
        <EmojiSelectModal isModalOpen={showModal} closeModal={closeModal} />
      ) : (
        <LoginModal isModalOpen={showModal} closeModal={closeModal} />
      )}
    </>
  );
};

export default MainNav;
