/**
 * @author Hyeonsooryu
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { loginAPI } from '../../api/userAPI';

import Header from '../Organisms/Header';
import Modal from '../Atoms/Modal';
import Button from '../Atoms/Button';
import IconButton from '../Atoms/IconButton';
import { LoginInput } from '../Atoms/Inputs';

const MainNav = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginResult, setLoginResult] = useState(false);

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
        setLoginResult(true);
      });
  };

  const keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      loginHandler();
    }
  };

  const signupClickHandler = () => {
    navigate('/signup/1');
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
          padding="1.5rem 1rem"
          bgColor="#EEF8FF"
          onClickToggleModal={toggleModal}
        >
          <ModalHeader>로그인</ModalHeader>
          {loginResult && <ErrMsg>아이디, 비밀번호를 확인해주세요.</ErrMsg>}
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
            onKeyUp={keyUpHandler}
          />
          <Button
            fontWeight="500"
            margin="1.5rem 0 .5rem"
            onClick={loginHandler}
          >
            로그인
          </Button>
          <Button
            fontWeight="500"
            bgColor="#2B65BC"
            onClick={signupClickHandler}
          >
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

const ErrMsg = styled.p`
  padding: 1rem 0 0;
  color: red;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
`;

export default MainNav;
