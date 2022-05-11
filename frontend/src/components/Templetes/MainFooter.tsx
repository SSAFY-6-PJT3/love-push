/**
 * @author Hyeonsooryu
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import IconButton from '../Atoms/IconButton';
import ReportModal from '../Organisms/ReportModal';

const MainFooter = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const helpBtnClickHandler = () => {
    ReactGA.event({
      category: '도움말 클릭',
      action: '도움말 페이지 진입',
    });
    navigate('/about-service/0');
  };

  const reportBtnClickHandler = () => {
    ReactGA.event({
      category: '건의사항 버튼 클릭',
      action: '건의사항 모달 열기',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Footer>
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="#EEF8FF"
          imgURL="https://img.icons8.com/emoji/48/000000/question-mark-emoji.png"
          ariaLabel="도움말"
          onClick={helpBtnClickHandler}
        />
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="#EEF8FF"
          imgURL="https://img.icons8.com/emoji/96/000000/open-mailbox-with-lowered-flag.png"
          ariaLabel="유저 소리함"
          onClick={reportBtnClickHandler}
        />
      </Footer>
      <ReportModal isModalOpen={showModal} closeModal={closeModal} />
    </>
  );
};

interface IPropsStyledFooter {
  bgColor?: string;
  height?: string;
}

const Footer = styled.footer<IPropsStyledFooter>`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.bgColor || 'transparent'};
  height: ${(props) => props.height || '56px'};
`;

export default MainFooter;
