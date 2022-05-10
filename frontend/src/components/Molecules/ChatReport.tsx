import { randomFillSync } from 'crypto';
import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../Atoms/Modal';
import { FcAssistant } from 'react-icons/fc';
import Button from '../Atoms/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { reportAPI } from '../../api/accountAPI';
import { AuthContext } from '../../store/authContext';
import { Client } from '@stomp/stompjs';

type chatReportProps = {
  onClickToggleModal: () => void;
};

interface IPropsModal {
  isModalOpen: boolean;
  closeModal: () => void;
  client: Client;
  sender: number;
  partnerId?: number;
  roomSeq?: number;
}

const ChatReport = ({
  isModalOpen,
  closeModal,
  client,
  sender,
  partnerId,
  roomSeq,
}: IPropsModal) => {
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();
  const callReportAPI = () => {
    const ReportInfo = {
      reported: partnerId,
    };
    reportAPI(ReportInfo, token)
      .then(() => {
        navigate('/chatlobby');
        client.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            type: 'QUIT',
            roomId: `${roomSeq}`,
            sender: `${sender}`,
            message: '',
          }),
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  // const [isOpenModal, setOpenModal] = useState<boolean>(false);
  // const onClickToggleModal = useCallback(() => {
  //   setOpenModal(!isOpenModal);
  // }, [isOpenModal]);
  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
  }, []);

  return (
    <Modal onClickToggleModal={closeModal}>
      <TitleTag>신고하기</TitleTag>
      <div>
        <TextTag>
          신고가 누적된 유저는 {'\n'}
          채팅 이용이 정지되며 {'\n'}
          해당 채팅방은 이용이 더 이상 불가합니다. {'\n'}
          정말 신고하시겠습니까?
        </TextTag>
      </div>
      <Button
        width="296px"
        height="32px"
        bgColor="#bb0000"
        fontSize="1.2rem"
        fontWeight="400"
        textColor="white"
        ariaLabel="신고하기"
        onClick={callReportAPI}
      >
        신고하기
      </Button>
    </Modal>
  );
};

const TextTag = styled.p`
  font-size: 20px;
  white-space: pre-line;
  font-weight: 300;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 24px;
`;
const TitleTag = styled(TextTag)`
  font-weight: 700;
  margin-top: 1rem;
`;

export default ChatReport;
