/**
 * @author Hyeonsooryu
 */

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { signUpAPI } from '../api/userAPI';

import IconButton from '../components/Atoms/IconButton';
import BackBtnNav from '../components/Templetes/BackBtnNav';
import SignupForm from '../components/Templetes/SignupForm';

const Signup = () => {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (pageId === ('4' || '9')) {
      setTimeout(() => {
        navigate('/mainpage');
      }, 1200);
    }
  }, [pageId]);

  // 아이디, 비밀번호 정규식
  const userIdRegExp = /^[a-z0-9]{6,16}$/;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,16}$/;

  // 회원가입 API 호출
  const callSignUpAPI = () => {
    const signupInfo = {
      emoji: 'string',
      id: userId,
      password: password,
    };
    signUpAPI(signupInfo)
      .then((res) => {
        navigate('/signup/4');
      })
      .catch((err) => {
        console.log(err);
        navigate('/signup/9');
      });
  };

  const inputChangeHandler = (v: string) => {
    switch (pageId) {
      case '1':
        setUserId(v);
        break;
      case '2':
        setPassword(v);
        break;
      case '3':
        setPasswordConfirm(v);
        break;
    }
  };

  const formSubmitHandler = (v: string) => {
    switch (pageId) {
      // 아이디 입력 페이지
      case '1':
        setUserId(v);
        if (userIdRegExp.test(v)) {
          navigate('/signup/2');
          setErrMsg('');
        } else {
          setErrMsg('6자 이상, 16자 이하의 영문 혹은 숫자로 입력해주세요.');
        }
        break;
      // 비밀번호 입력 페이지
      case '2':
        setPassword(v);
        if (passwordRegExp.test(v)) {
          navigate('/signup/3');
          setErrMsg('');
        } else {
          setErrMsg('6자 이상, 16자 이하의 영문, 숫자 조합으로 입력해주세요.');
        }
        break;
      // 비밀번호 확인 페이지
      case '3':
        setPasswordConfirm(v);
        if (password === passwordConfirm) {
          callSignUpAPI();
        } else {
          setErrMsg('비밀번호가 일치하지 않습니다.');
        }
        break;
    }
  };

  // const goBack = () => {
  //   navigate(-1);
  // };

  return (
    <>
      <BackBtnNav pageTitle="회원가입" />
      <Wrapper>
        {pageId === '1' && (
          <SignupForm
            label="아이디를 입력해주세요."
            type="text"
            value={userId}
            onInputChange={inputChangeHandler}
            onFormSubmit={formSubmitHandler}
          />
        )}
        {pageId === '2' && (
          <SignupForm
            label="비밀번호를 입력해주세요."
            type="password"
            value={password}
            onInputChange={inputChangeHandler}
            onFormSubmit={formSubmitHandler}
          />
        )}
        {pageId === '3' && (
          <SignupForm
            label="비밀번호를 한 번 더 입력해주세요."
            type="password"
            value={passwordConfirm}
            onInputChange={inputChangeHandler}
            onFormSubmit={formSubmitHandler}
          />
        )}
        {pageId === '4' && (
          <SignupResult>회원가입이 완료되었습니다.</SignupResult>
        )}
        {pageId === '9' && (
          <SignupResult>회원가입에 실패했습니다.</SignupResult>
        )}
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const SignupResult = styled.h1`
  font-size: 20px;
  text-align: center;
  color: white;
  font-weight: 700;
  margin-bottom: 3rem;
`;

const ErrMsg = styled.p`
  font-size: 14px;
  text-align: center;
  font-weight: 300;
  color: red;
`;

export default Signup;
