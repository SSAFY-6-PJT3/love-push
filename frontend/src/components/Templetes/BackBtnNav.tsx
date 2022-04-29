/**
 * @author Hyeonsooryu
 */

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';

import Header from '../Organisms/Header';

interface IPropsPageTitle {
  textColor: string;
}

interface IPropsBackBtnNav extends IPropsPageTitle {
  pageTitle: string;
  rightSideBtn?: React.ReactNode;
  onRightBtnClick?: () => void;
}

const BackBtnNav = ({
  pageTitle,
  textColor,
  rightSideBtn,
  onRightBtnClick,
}: IPropsBackBtnNav) => {
  const navigate = useNavigate();
  const backBtnClickHandler = () => {
    navigate(-1);
  };

  return (
    <Header bgColor="#EEF8FF">
      <IconWrapper onClick={backBtnClickHandler}>
        <IoArrowBack size="24" color={textColor} />
      </IconWrapper>
      <PageTitle textColor={textColor}>{pageTitle}</PageTitle>
      {rightSideBtn ? (
        <div onClick={onRightBtnClick}>{rightSideBtn}</div>
      ) : (
        <Gutter />
      )}
    </Header>
  );
};

BackBtnNav.defaultProps = {
  textColor: 'white',
};

const IconWrapper = styled.div`
  padding: 0.5rem;
  margin-left: 0.5rem;
`;

const PageTitle = styled.h1<IPropsPageTitle>`
  color: ${(props) => props.textColor};
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
`;

const Gutter = styled.div`
  width: 40px;
`;

export default BackBtnNav;
