import { useState } from 'react';
import styled from 'styled-components';

import { loginAPI } from '../api/userAPI';

import Header from '../components/Organisms/Header';
import Modal from '../components/Atoms/Modal';
import Button from '../components/Atoms/Button';
import IconButton from '../components/Atoms/IconButton';
import { LoginInput } from '../components/Atoms/Inputs';

const LoginTest = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const userIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    const loginData = {
      id: userId,
      password: password,
    };
    loginAPI(loginData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header>
        <IconButton
          shadow
          margin="4px 8px"
          bgColor="white"
          imgURL="https://img.icons8.com/emoji/48/000000/robot-emoji.png"
          onClick={toggleModal}
        />
        <IconButton
          margin="4px 8px"
          imgURL="https://img.icons8.com/emoji/48/000000/robot-emoji.png"
        />
      </Header>
      {isModalOpen && (
        <Modal
          height="300px"
          bgColor="#EEF8FF"
          padding=""
          onClickToggleModal={toggleModal}
        >
          <ModalHeader>로그인</ModalHeader>
          <LoginInput
            type="text"
            placeholder="아이디"
            value={userId}
            margin="1.5rem 0 .5rem"
            onChange={userIdChangeHandler}
          />
          <LoginInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={passwordChangeHandler}
          />
          <Button
            fontWeight="500"
            margin="1.5rem 0 .5rem"
            onClick={loginHandler}
          >
            로그인
          </Button>
          <Button fontWeight="500" bgColor="#2B65BC">
            회원가입
          </Button>
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

export default LoginTest;
