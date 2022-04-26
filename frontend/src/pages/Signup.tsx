import styled from 'styled-components';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SignupForm from '../components/Templetes/SignupForm';

const Signup = () => {
  const navigate = useNavigate();
  let { pageId } = useParams<{ pageId: string }>();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  if (pageId === '4') {
    const signupInfo = {
      userId: userId,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    console.log(signupInfo);
  }

  const formSubmitHandler = (v: string) => {
    switch (pageId) {
      case '1':
        setUserId(v);
        navigate('/signup/2');
        break;
      case '2':
        setPassword(v);
        navigate('/signup/3');
        break;
      case '3':
        setPasswordConfirm(v);
        navigate('/signup/4');
        break;
    }
  };

  return (
    <Wrapper>
      {pageId === '1' && (
        <SignupForm
          label="아이디를 입력해주세요."
          onFormSubmit={formSubmitHandler}
        />
      )}
      {pageId === '2' && (
        <SignupForm
          label="비밀번호를 입력해주세요."
          onFormSubmit={formSubmitHandler}
        />
      )}
      {pageId === '3' && (
        <SignupForm
          label="비밀번호를 한 번 더 입력해주세요."
          onFormSubmit={formSubmitHandler}
        />
      )}
      {pageId === '4' && <SignupDone>회원가입이 완료되었습니다.</SignupDone>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const SignupDone = styled.h1`
  font-size: 20px;
  text-align: center;
  color: white;
  font-weight: 700;
  margin-bottom: 3rem;
`;

export default Signup;
