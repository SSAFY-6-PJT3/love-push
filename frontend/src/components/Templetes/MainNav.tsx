/**
 * @author Hyeonsooryu
 */

import { useState, useContext } from 'react';

import { AuthContext } from '../../store/authContext';

import IconButton from '../Atoms/IconButton';
import Header from '../Organisms/Header';
import LoginModal from '../Organisms/LoginModal';
import EmojiSelectModal from '../Organisms/EmojiSelectModal';

const MainNav = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header>
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="white"
          imgURL="https://img.icons8.com/emoji/48/000000/robot-emoji.png"
          onClick={openModal}
        />
        <IconButton
          margin="4px 8px"
          imgURL="https://img.icons8.com/emoji/48/000000/robot-emoji.png"
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
