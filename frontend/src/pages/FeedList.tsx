/**
 * @author SeunghunHan
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useDocumentTitle from '../hooks/useDocumentTitle';

import BackBtnNav from '../components/Templetes/BackBtnNav';
import Button from '../components/Atoms/Button';

import HeartIcon from '../images/icon/heart_icon.svg';
import MessageIcon from '../images/icon/message_icon.svg';
import WriteIcon from '../images/icon/write_icon.svg';
import IconImage from '../components/Atoms/IconImage';
import { IconText } from '../components/Atoms/Text';

import { readFeedListAPI } from '../api/feedAPI';

const FeedList = () => {
  useDocumentTitle('게시판 | 좋아하면 누르는');
  const [pageId, updatepageId] = useState(1);
  const [contents, updateContents] = useState([
    {
      commentsCount: 0,
      content: 'string',
      createdAt: '2022-12-18T13:47:47.665Z',
      feedId: 2,
      likeCnt: 0,
      likeStatus: true,
      mediaUrl: 'string',
      school: 'string',
      tags: ['string'],
      updatedAt: '2022-12-18T13:47:47.665Z',
      userId: 0,
      username: 'string',
    },
  ]);
  const [school, setSchool] = useState('게시판');
  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();

  const btnClickHandler = (Feed: any) => {
    navigate(`/Feed/${Feed.feedId}`, {
      state: { feedId: Feed.feedId, userId: userId },
    });
  };

  // const btnMoreFeed = () => {
  //   updatepageId(pageId + 1);
  //   if (content.length < 10 * pageId) {
  //     updateMoreFlag(false)
  //   }
  // };

  const btnWriteFeed = () => {
    navigate(`/FeedWrite`);
  };

  const callReadContentsAPI = (userId?: string, sch?: string) => {
    readFeedListAPI({ userId: Number(userId), school: sch })
      .then((res: any) => {
        console.log('불러오기 완료');
        updateContents(res);
      })
      .catch(() => {
        console.log('불러오기 실패');
      });
  };

  const editDate = (data: string) => {
    if (data) {
      const date = [data[0], '년 ', data[1], '월 ', data[2], '일'];
      return date.join('');
    } else {
      return '시간미정';
    }
  };
  useEffect(() => {
    const sch = JSON.parse(sessionStorage.getItem('school') || '');
    setSchool(sch.name);
    const userId = sessionStorage.getItem('seq') || '';
    setUserId(Number(userId));

    callReadContentsAPI(userId, sch.name);
    // content 불러오기 & pageId로 자르기
    // 초기 더보기 보여줄지 결정하는게 필요
  }, []);

  return (
    <Container>
      <BackBtnNav
        pageTitle={school}
        textColor="black"
        rightSideBtn={
          <Button
            bgColor="transparent"
            width="3rem"
            margin="1rem 0"
            height="3rem"
            onClick={btnWriteFeed}
          >
            <IconImage src={WriteIcon} alt="글쓰기" />
          </Button>
        }
      />
      <Content>
        {contents.map((Feed) => (
          <FeedSection key={Feed.feedId}>
            <FeedNotice onClick={() => btnClickHandler(Feed)}>
              {/* <Image src={Feed.imgSrc} alt="Feed-img" /> */}
              {/* <Title>{Feed.title}</Title> */}
              <Description>{Feed.content}</Description>
              <Date>{editDate(Feed.createdAt)}</Date>
              <IconLine>
                <IconImage src={HeartIcon} alt="빈하트" />
                <IconText margin="0 0.5rem 0 0">{Feed.likeCnt}</IconText>
                <IconImage src={MessageIcon} height="20" alt="메세지수" />
                <IconText margin="0 0.5rem 0 0">{Feed.commentsCount}</IconText>
              </IconLine>
            </FeedNotice>
          </FeedSection>
        ))}
      </Content>

      {/* <MoreBtn>
        {MoreFlag && 
        <Button
          bgColor="white"
          textColor="black"
          width="5rem"
          margin="0.5rem 0"
          height="2.6rem"
          Radius="1.3rem"
          fontWeight="500"
          ariaLabel={'더보기'}
          onClick={btnMoreFeed}
        >
          {'더보기'}
        </Button>
        }
      </MoreBtn> */}
    </Container>
  );
};
const Date = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 0.5rem;
`;

const IconLine = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const FeedSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.2rem 0;
`;

const MoreBtn = styled.div`
  // display: flex;
  // justify-content: center;
  bottom: 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: #eef8ff;
  // background-color: white;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FeedNotice = styled.div`
  margin-top: 1rem;
  width: 95%;
  min-height: 100px;
  max-height: 160px;
  outline: 1px solid black;
`;
const Content = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 60px 0 0 0;
  overflow: scroll;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 18rem;
`;

const Description = styled.div`
  width: 85%;
  padding: 1rem;
  display: block;
  max-height: 90px;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  overflow: hidden;
  text-align: left;
  line-height: 1.6;
  word-break: break-all;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 0.5rem;
`;

export default FeedList;
