import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from './Button';
import DeleteChatModal from '../Organisms/DeleteModal'

const DeleteChatButton = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={openModal}
      >
        x
      </Button>
      <DeleteChatModal isModalOpen={showModal} closeModal={closeModal} />
    </>
  );
};

export default DeleteChatButton;
