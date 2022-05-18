import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getContactAPI } from '../api/contactAPI';
import useDocumentTitle from '../hooks/useDocumentTitle';

import BackBtnNav from '../components/Templetes/BackBtnNav';
import ContactList from '../components/Organisms/ContactList';
import Button from '../components/Atoms/Button';

const CheckContact = () => {
  useDocumentTitle('건의함 확인 | 좋아하면 누르는');

  const navigate = useNavigate();

  const [bug, setBug] = useState([]);
  const [review, setReview] = useState([]);
  const [etc, setEtc] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [listType, setListType] = useState('');

  useEffect(() => {
    callgetContactAPI();
  }, []);

  const callgetContactAPI = () => {
    getContactAPI()
      .then((res: any) => {
        setBug(res.filter((data: any) => data.type === 'bug'));
        setReview(res.filter((data: any) => data.type === 'review'));
        setEtc(res.filter((data: any) => data.type === 'etc'));
        setInquiry(res.filter((data: any) => data.type === 'inquiry'));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const changeList = (type: string) => (e: any) => {
    if (type === listType) {
      setListType('');
    } else {
      setListType(type);
    }
  };

  return (
    <CheckContentList>
      <BackBtnNav pageTitle="건의함" textColor="black" />
      <ContentList>
        <ContactButton
          onClick={changeList('inquiry')}
          bgColor="#eef8ff"
          textColor="black"
          fontWeight="700"
          fontSize="1.5rem"
        >
          문의
        </ContactButton>
        <ContactList ContactList={inquiry} name={listType} />
        <ContactButton
          onClick={changeList('bug')}
          bgColor="#eef8ff"
          textColor="black"
          fontWeight="700"
          fontSize="1.5rem"
        >
          버그
        </ContactButton>
        <ContactList ContactList={bug} name={listType} />
        <ContactButton
          onClick={changeList('review')}
          bgColor="#eef8ff"
          textColor="black"
          fontWeight="700"
          fontSize="1.5rem"
        >
          사용 후기
        </ContactButton>
        <ContactList ContactList={review} name={listType} />
        <ContactButton
          onClick={changeList('etc')}
          bgColor="#eef8ff"
          textColor="black"
          fontWeight="700"
          fontSize="1.5rem"
        >
          기타
        </ContactButton>
        <ContactList ContactList={etc} name={listType} />
      </ContentList>
    </CheckContentList>
  );
};

const CheckContentList = styled.div`
  padding: 3rem 0 0 0;
  width: 100%;
  height: 100%;
  align-items: normal;
  background-color: #eef8ff;
  overflow-y: auto;
`;
const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContactButton = styled(Button)`
  border-bottom: solid 1px black;
  margin: 1rem;
`;
export default CheckContact;
