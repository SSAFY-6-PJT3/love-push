import { buttonBaseClasses } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createFeedAPI } from '../api/feedAPI';

import Button from '../components/Atoms/Button';
import IconImage from '../components/Atoms/IconImage';
import BackBtnNav from '../components/Templetes/BackBtnNav';

import useDocumentTitle from '../hooks/useDocumentTitle';

import CheckIcon from '../images/icon/check_icon.svg'

const FeedWrite = () => {
  useDocumentTitle('글작성 | 좋아하면 누르는');

  const [userId, setUserId] = useState(0);
  const [school, setSchool] = useState('');

  const SubmitFeed = () => {
    if (checkItemContent.trim().length) {
      console.log('전송');
      createFeedAPI({ userId: userId, content: checkItemContent, school: school })
        .then(() => {
          console.log('성공')
          navigate(-1)
        })
      
      
    }
    // 보내버리기~
    // ===============================================================
    
  };
  const navigate = useNavigate();


  // 유저 입력 값을 넣을 변수
  const [checkItemContent, setCheckItemContent] = useState('');
  // 줄 수를 계산해서 저장할 변수
  const [textareaHeight, setTextareaHeight] = useState(0);

  // 사용자 입력 값이 변경될 때마다 checkItemContent에 저장하고
  // 엔터('\n') 개수를 세서 textareaHeight에 저장
  const checkItemChangeHandler = (event: any) => {
    setTextareaHeight(event.target.value.split('\n').length - 1);
    setCheckItemContent(event.target.value);
  };

  useEffect(() => {
    const userId = Number(sessionStorage.getItem('seq')) || 0;
    setUserId(userId)
    const school = JSON.parse(sessionStorage.getItem('school') || '')
    setSchool(school.name)
  }, [])

  return (
    <Container>
      <BackBtnNav
        pageTitle="글작성" textColor='black'
        rightSideBtn={
          <Button
            width="48px"
            height="32px"
            margin="0 0.5rem 0 0"
            bgColor="transparent"
          >
            <IconImage src={CheckIcon} alt="빈하트"/>
          </Button>
        }
        onRightBtnClick={SubmitFeed}
      />
      <InputText
        placeholder="내용"
        value={checkItemContent}
        onChange={checkItemChangeHandler}
        style={{ height: (textareaHeight + 1) * 27 + 'px' }}
        rows={1}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #eef8ff;
`;

const InputText = styled.textarea`
  min-height: 25%;
  overflow: hidden;
  font-size: 16px;
  line-height: 27px;
  resize: none;
  border: 0.5px grey solid;
  margin: 60px 1rem 0 1rem;
`;

export default FeedWrite;
