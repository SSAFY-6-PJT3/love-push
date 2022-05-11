/**
 * @author Hyeonsooryu
 */
import styled from 'styled-components';
import ReactGA from 'react-ga';

import Modal from '../Atoms/Modal';
import Button from '../Atoms/Button';

interface IPropsModal {
  isModalOpen: boolean;
  closeModal: () => void;
}

const ReportModal = ({ isModalOpen, closeModal }: IPropsModal) => {
  const reportBtnClickHandler = () => {
    ReactGA.event({
      category: '건의하기 버튼 클릭',
      action: '유저 건의사항 구글 설문 이동',
    });
    window.open('https://forms.gle/nUCVQ3bFpiwDTD8h6');
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          padding="1.5rem 1rem"
          bgColor="#EEF8FF"
          onClickToggleModal={closeModal}
        >
          <ModalHeader>유저 건의함</ModalHeader>
          <ModalText>
            서비스를 이용하시면서 겪었던 불편함이나
            <br />
            발견한 버그가 있다면 알려주세요.
            <br />
            추후 업데이트에 반영하도록 하겠습니다.
          </ModalText>
          <Button onClick={reportBtnClickHandler}>건의하기</Button>
        </Modal>
      )}
    </>
  );
};

const ModalHeader = styled.h1`
  padding-top: 0.5rem;
  font-weight: 700;
  font-size: 1.3rem;
`;

const ModalText = styled.p`
  margin: 1.6rem 0.5rem;
  line-height: 1.6;
  text-align: center;
  font-weight: 300;
  word-break: keep-all;
`;

export default ReportModal;
