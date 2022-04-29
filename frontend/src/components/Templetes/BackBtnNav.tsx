/**
 * @author Hyeonsooryu
 */

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';

import Header from '../Organisms/Header';

const BackBtnNav = ({ pageTitle }: { pageTitle: string }) => {
  const navigate = useNavigate();
  const backBtnClickHandler = () => {
    navigate(-1);
  };

  return (
    <Header>
      <IconWrapper onClick={backBtnClickHandler}>
        <IoArrowBack size="24" color="white" />
      </IconWrapper>
      <PageTitle>{pageTitle}</PageTitle>
      <Gutter />
    </Header>
  );
};

const IconWrapper = styled.div`
  padding: 0.5rem;
  margin-left: 0.5rem;
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
`;

const Gutter = styled.div`
  width: 40px;
`;

export default BackBtnNav;
