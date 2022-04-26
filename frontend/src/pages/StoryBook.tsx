/**
 * @author Hyeonsooryu
 */

import Button from '../components/Atoms/Button';
import { SignupInput, LoginInput, ChatInput } from '../components/Atoms/Inputs';
import { IoLocationSharp } from 'react-icons/io5';
import styled from 'styled-components';

const StoryBook = () => {
  return (
    <Container>
      <Title>Buttons</Title>
      <Button
        width="160px"
        height="40px"
        bgColor="white"
        textColor="black"
        fontSize="12px"
        icon={<IoLocationSharp />}
        shadow
      >
        위치 정보 켜기
      </Button>
      <Button width="200px" margin="1rem 0">
        로그인
      </Button>
      <Title>Inputs</Title>
      <Wrapper>
        <SignupInput type="text" />
        <LoginInput type="text" placeholder="아이디" margin="1rem 0" />
        <ChatInput type="text" />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 2rem 0;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 180px;
  background-color: royalblue;
`;

export default StoryBook;
