/**
 * @author Hyeonsooryu
 */

import { useState } from 'react';
import styled from 'styled-components';

import { IoLocationSharp } from 'react-icons/io5';

import Button from '../components/Atoms/Button';
import IconButton from '../components/Atoms/IconButton';
import Header from '../components/Organisms/Header';
import { SignupInput, LoginInput, ChatInput } from '../components/Atoms/Inputs';

const StoryBook = () => {
  const [test, setTest] = useState('default');

  const myHandler = () => {
    setTest('hello');
  };

  return (
    <>
      <Header>
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="white"
          imgURL="https://img.icons8.com/emoji/48/000000/robot-emoji.png"
        />
        <IconButton
          margin="4px 8px"
          imgURL="https://img.icons8.com/emoji/48/000000/robot-emoji.png"
        />
      </Header>
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
        <p>{test}</p>
        <Button width="200px" margin="1rem 0" onClick={myHandler}>
          로그인
        </Button>
        <Title>Inputs</Title>
        <Wrapper>
          <SignupInput type="text" />
          <LoginInput type="text" placeholder="아이디" margin="1rem 0" />
          <ChatInput type="text" />
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 2rem 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 180px;
`;

export default StoryBook;
