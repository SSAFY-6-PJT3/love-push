import { randomFillSync } from 'crypto';
import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../Atoms/Modal';
import { FcAssistant } from 'react-icons/fc';
import Button from '../Atoms/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { reportAPI } from '../../api/accountAPI';
import { AuthContext } from '../../store/authContext';

type chatReportProps = {
  onClickToggleModal: () => void;
};

const ChatReport: React.FC<chatReportProps> = ({ onClickToggleModal }) => {
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();
  let { userId } = useParams<{ userId: string }>();
  const callReportAPI = () => {
    const ReportInfo = {
      id: userId,
    };
    reportAPI(ReportInfo, token)
      .then(() => {
        navigate('/mainpage');
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
    setToken(localStorage.getItem('token') || '');
  }, []);

  return (
    <Modal onClickToggleModal={onClickToggleModal}>
      <TitleTag>신고하기</TitleTag>
      <div>
        <TextTag>
          신고가 누적된 유저는 {'\n'}
          채팅 이용이 정지됩니다. {'\n'}
          정말 신고하시겠습니까?
        </TextTag>
      </div>
      <Button
        width="296px"
        height="32px"
        bgColor="#4095FF"
        fontSize="1.2rem"
        fontWeight="400"
        textColor="white"
        onClick={callReportAPI}
      >
        신고하기
      </Button>
    </Modal>
    // <FcAssistant size="32px" onClick={onClickToggleModal} />
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
  margin-top: 32px;
`;

export default ChatReport;
