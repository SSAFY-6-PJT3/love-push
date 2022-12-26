/**
 * @author Hyeonsooryu
 */

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { loginAPI } from '../../api/accountAPI';
import { AuthContext } from '../../store/authContext';
import { AlertContext } from '../../store/alertContext';

import Modal from '../Atoms/Modal';
import Button from '../Atoms/Button';
import { LoginInput } from '../Atoms/Inputs';

interface IPropsModal {
  isModalOpen: boolean;
  closeModal: () => void;
}

interface IPropsOnLogin {
  token: string;
  emojiUrl: string;
  seq: string;
  firstName: string;
  lastName: string;
  schoolSeq: string;
  schoolName: string;
}

const LoginModal = ({ isModalOpen, closeModal }: IPropsModal) => {
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);
  const { openAlert, setAlertText, setAlertSeverity } =
    useContext(AlertContext);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState(false);

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
      .then((res: IPropsOnLogin) => {
        onLogin(res);
        closeModal();
        setUserId('');
        setPassword('');
        setAlertText('로그인 확인!');
        openAlert();
        window.location.reload();
      })
      .catch((err: any) => {
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
      {isModalOpen && (
        <Modal
          padding="1.5rem 1rem"
          bgColor="#EEF8FF"
          onClickToggleModal={closeModal}
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
            ariaLabel="로그인"
            onClick={loginHandler}
          >
            로그인
          </Button>
          <Button
            fontWeight="500"
            bgColor="#2B65BC"
            ariaLabel="회원가입"
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

export default LoginModal;
