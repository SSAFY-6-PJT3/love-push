/**
 * @author Hyeonsooryu
 */

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { signUpAPI, idVaidateAPI } from '../api/accountAPI';
import useDocumentTitle from '../hooks/useDocumentTitle';

import BackBtnNav from '../components/Templetes/BackBtnNav';
import SignupForm from '../components/Templetes/SignupForm';

const Signup = () => {
  useDocumentTitle('회원가입 | 좋아하면 누르는');
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (pageId === ('4' || '9')) {
      setTimeout(() => {
        navigate('/');
      }, 1200);
    }
  }, [pageId]);

  // 아이디, 비밀번호 정규식
  const userIdRegExp = /^[a-z0-9]{4,16}$/;
  const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/;

  // 회원가입 API 호출
  const callSignUpAPI = () => {
    const signupInfo = {
      emoji:
        'https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Face blowing a kiss.svg',
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

  const formSubmitHandler = async (v: string) => {
    switch (pageId) {
      // 아이디 입력 페이지
      case '1':
        setUserId(v);
        if (!userIdRegExp.test(v)) {
          setErrMsg('4자 이상, 16자 이하의 영문 혹은 숫자로 입력해주세요.');
        } else {
          await idVaidateAPI(v)
            .then((res) => {
              navigate('/signup/2');
              setErrMsg('');
            })
            .catch((err) => {
              console.log(err);
              setErrMsg('이미 사용 중인 아이디입니다.');
            });
        }
        break;
      // 비밀번호 입력 페이지
      case '2':
        setPassword(v);
        if (passwordRegExp.test(v)) {
          navigate('/signup/3');
          setErrMsg('');
        } else {
          setErrMsg('4자 이상, 16자 이하의 영문, 숫자 조합으로 입력해주세요.');
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

  return (
    <>
      <BackBtnNav pageTitle="회원가입" />
      <Wrapper>
        {pageId === '1' && (
          <>
            <SignupForm
              label="아이디를 입력해주세요."
              type="text"
              value={userId}
              onInputChange={inputChangeHandler}
              onFormSubmit={formSubmitHandler}
            />
          </>
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
        <SignupText>
          회원가입시{' '}
          <Link to="/policy">
            <LinkText>개인정보처리방침</LinkText> 및
          </Link>
          <Link to="/eula">
            <LinkText> 최종 사용자 라이센스 계약</LinkText>
          </Link>
          에<br /> 동의하는 것으로 간주됩니다.
        </SignupText>
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
  margin: 1rem 0 2rem;
`;

const SignupText = styled.span`
  text-align: center;
  color: white;
  font-weight: 300;
  line-height: 1.5;
  font-size: 12px;
  animation: 0.6s ease-in-out 0s 1 normal forwards running fadeinBottom;
  @keyframes fadeinBottom {
    from {
      opacity: 0;
      transform: translate3d(0, 50px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const LinkText = styled.span`
  font-weight: 700;
`;

export default Signup;
