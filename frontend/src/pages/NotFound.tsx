import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';

import Button from '../components/Atoms/Button';

const NotFound = () => {
  const navigate = useNavigate();

  useDocumentTitle('페이지를 찾을 수 없습니다 | 좋아하면 누르는');

  return (
    <Container>
      <Title>404</Title>
      <Content>요청하신 페이지를 찾을 수 없습니다.</Content>
      <Button
        width="12rem"
        height="3rem"
        Radius="1.5rem"
        textColor="black"
        bgColor="white"
        fontWeight="500"
        onClick={() => {
          navigate('/mainpage');
        }}
      >
        메인 페이지로 이동
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: white;
`;

const Content = styled.p`
  color: white;
  margin: 2rem;
`;

export default NotFound;
