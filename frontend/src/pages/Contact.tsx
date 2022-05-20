import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import BackBtnNav from '../components/Templetes/BackBtnNav';
import ContactContent from '../components/Organisms/ContactContent';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { postContactAPI } from '../api/contactAPI';
import SelectBox from '../components/Organisms/SelectBox';

const Contact = () => {
  useDocumentTitle('건의사항 | 좋아하면 누르는');
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const [errMsg, setErrMsg] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('inquiry');

  useEffect(() => {
    if (pageId === ('3' || '9')) {
      setTimeout(() => {
        navigate('/');
      }, 1200);
    }
  }, [pageId]);

  const callPostContactAPI = () => {
    const contactInfo = {
      type: category,
      content: content,
    };
    postContactAPI(contactInfo)
      .then((res) => {
        navigate('/contact/3');
        setErrMsg('');
      })
      .catch((err) => {
        console.log(err);
        // api 요청 에러시 페이지
        navigate('/contact/9');
      });
  };

  const inputChangeHandler = (v: string) => {
    switch (pageId) {
      case '1':
        setCategory(v);
        break;
      case '2':
        setContent(v);
        break;
    }
  };

  const formSubmitHandler = async (v: string) => {
    switch (pageId) {
      // 아이디 입력 페이지
      case '1':
        setCategory(v);
        if (!category) {
          setErrMsg('카테고리를 정해주세요');
        } else {
          navigate('/contact/2');
          setErrMsg('');
        }
        break;
      // 비밀번호 입력 페이지
      case '2':
        setContent(v);
        if (content.trim().length <= 1000 && content.trim().length > 0) {
          callPostContactAPI();
        } else {
          setErrMsg('1자 이상 1000자 이하로 입력해주세요.');
        }
        break;
    }
  };

  const OPTIONS = [
    { value: 'inquiry', name: '건의 사항' },
    { value: 'bug', name: '버그 리포트' },
    { value: 'review', name: '사용 후기' },
    { value: 'etc', name: '기타' },
  ];

  return (
    <>
      <BackBtnNav pageTitle="건의 사항" />
      <Wrapper>
        {pageId === '1' && (
          <>
            <SelectBox
              options={OPTIONS}
              label="카테고리를 골라주세요."
              value={category}
              onInputChange={inputChangeHandler}
              onFormSubmit={formSubmitHandler}
            ></SelectBox>
          </>
        )}
        {pageId === '2' && (
          <ContactContent
            label="건의할 내용을 적어주세요."
            value={content}
            onInputChange={inputChangeHandler}
            onFormSubmit={formSubmitHandler}
          />
        )}
        {pageId === '3' && (
          <ContactResult>건의 사항이 제출되었습니다.</ContactResult>
        )}
        {pageId === '9' && <ContactResult>전송에 실패했습니다.</ContactResult>}
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

const ContactResult = styled.h1`
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

export default Contact;
