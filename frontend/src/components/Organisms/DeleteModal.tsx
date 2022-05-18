import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../Atoms/Modal';
import Button from '../Atoms/Button';
import { deleteChatAPI } from '../../api/deleteChatAPI';

interface IPropsModal {
  isModalOpen: boolean;
  closeModal: () => void;
}

const DeleteChatModal = ({ isModalOpen, closeModal }: IPropsModal) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');
  let { userId, roomId } = useParams<{ userId: string, roomId: string }>();
  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
  }, []);
  const deleteHandler = () => {
    const deleteChatInfo = {
      userId: userId,
      roomId: roomId,
    };
    deleteChatAPI(deleteChatInfo, token)
      .then(() => {
        console.log('삭제완료')
        navigate('/chatlobby')
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          padding="1.5rem 1rem"
          bgColor="#EEF8FF"
          onClickToggleModal={closeModal}
        >
          <ModalHeader>채팅방 나가기</ModalHeader>
          <TextTag>
          채팅방에서 나가시겠습니까? {'\n'}
          나가기를 하면 대화내용이 모두 삭제되고 {'\n'}
          채팅목록에서도 삭제됩니다.
          </TextTag>
          <Button
            width="296px"
            height="32px"
            bgColor="#4095FF"
            fontSize="1.2rem"
            fontWeight="400"
            textColor="white"
            onClick={deleteHandler}
          >
            채팅방 나가기
          </Button>
        </Modal>
      )}
    </>
  );
};

const ModalHeader = styled.h1`
  padding-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 1.3rem;
`;


const TextTag = styled.p`
  font-size: 1rem;
  white-space: pre-line;
  font-weight: 300;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 24px;
`;

export default DeleteChatModal;
