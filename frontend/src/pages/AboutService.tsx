/**
 * @author Hyeonsooryu
 */
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useDocumentTitle from '../hooks/useDocumentTitle';

import BackBtnNav from '../components/Templetes/BackBtnNav';
import Button from '../components/Atoms/Button';

const AboutService = () => {
  useDocumentTitle('서비스 소개 | 좋아하면 누르는');

  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: '0' | '1' | '2' | '3' | '4' }>();

  const content = [
    {
      imgSrc: '/images/about-service/about1.png',
      description: '좋아하는 사람이 있다면?',
    },
    {
      imgSrc: '/images/about-service/about2.png',
      description: '하트를 누르고 이름을 입력해주세요!',
    },
    {
      imgSrc: '/images/about-service/about3.png',
      description: '누가 보냈는지는 알 수 없어요.',
    },
    {
      imgSrc: '/images/about-service/about4.png',
      description: '우연히 하트를 주고 받으면 서로 채팅을 할 수 있어요!',
    },
    {
      imgSrc: '/images/about-service/about5.png',
      description: '사람들 속에 숨어서, 내 마음을 전해보세요!',
    },
  ];

  const btnClickHandler = () => {
    if (pageId === '4') {
      navigate('/');
    } else if (pageId) {
      navigate(`/about-service/${+pageId + 1}`);
    }
  };

  return (
    <Container>
      <BackBtnNav pageTitle="서비스 소개" />
      <Content>
        <Image src={pageId && content[+pageId].imgSrc} alt="about-service" />
        <Description>{pageId && content[+pageId].description}</Description>
      </Content>
      <Button
        margin="0 0 2rem"
        height="2.6rem"
        Radius="1.3rem"
        fontWeight="500"
        ariaLabel={pageId === '4' ? '완료' : '다음'}
        onClick={btnClickHandler}
      >
        {pageId === '4' ? '완료' : '다음'}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 0 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 56px;
`;

const Image = styled.img`
  width: 18rem;
`;

const Description = styled.p`
  margin: 2rem 0 0;
  width: 90%;
  color: white;
  font-size: 1.2rem;
  font-weigth: 500;
  text-align: center;
  word-break: keep-all;
  line-height: 160%;
`;

export default AboutService;
