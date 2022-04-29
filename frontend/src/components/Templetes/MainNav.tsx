/**
 * @author Hyeonsooryu
 */

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../store/authContext';

import IconButton from '../Atoms/IconButton';
import Header from '../Organisms/Header';
import LoginModal from '../Organisms/LoginModal';
import EmojiSelectModal from '../Organisms/EmojiSelectModal';

const MainNav = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const chatBtnClickHandler = () => {
    if (isLoggedIn) {
      navigate('/');
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
          imgURL="https://img.icons8.com/emoji/48/000000/robot-emoji.png"
          onClick={openModal}
        />
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="#EEF8FF"
          imgURL="https://img.icons8.com/emoji/48/000000/speech-balloon.png"
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
