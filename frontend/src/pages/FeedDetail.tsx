/**
 * @author SeunghunHan
 */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useDocumentTitle from '../hooks/useDocumentTitle';

import BackBtnNav from '../components/Templetes/BackBtnNav';
import Button from '../components/Atoms/Button';

import HeartIcon from '../images/icon/heart_icon.svg';
import HeartLikeIcon from '../images/icon/heart_like_icon.svg';
import MessageIcon from '../images/icon/message_icon.svg';
import ThreeDotsIcon from '../images/icon/dots_icon.svg';
import { IoArrowUpSharp } from 'react-icons/io5';
import IconImage from '../components/Atoms/IconImage';
import { IconText } from '../components/Atoms/Text';
import CommentBoxList from '../components/Templetes/CommentBoxList';
import {
  addCommentLikeAPI,
  addFeedLikeAPI,
  createFeedChildCommentAPI,
  createFeedCommentAPI,
  deleteCommentLikeAPI,
  deleteFeedCommentAPI,
  deleteFeedLikeAPI,
  readFeedDetailAPI,
} from '../api/feedAPI';

const Feed = () => {
  useDocumentTitle('상세 페이지 | 좋아하면 누르는');
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(true);

  const [writestatus, setWriteStatus] = useState(false);
  const [commentId, setCommentId] = useState(0);
  const [detail, setDetail] = useState({
    allComments: [
      {
        childCommentDto: [
          {
            childId: 0,
            commentId: 0,
            content: 'string',
            createdAt: '2022-12-22T14:09:31.337Z',
            likeCnt: 0,
            userId: 0,
          },
        ],
        commentId: 0,
        content: 'string',
        createdAt: '2022-12-22T14:09:31.337Z',
        likeCnt: 0,
        userId: 0,
      },
    ],
    commentCnt: 0,
    content: 'string',
    createdAt: '2022-12-22T14:09:31.337Z',
    feedId: 0,
    likeCnt: 0,
    likeStatus: true,
    mediaUrl: 'string',
    school: 'string',
    tags: ['string'],
    updatedAt: '2022-12-22T14:09:31.337Z',
    userId: 0,
    username: 'string',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const state:any = location.state;
  useEffect(() => {
    readFeedDetailAPI({ feedId: state.feedId, userId: state.userId }).then(
      (res) => {
        setDetail(res);
        setLike(res.likeStatus);
      },
    );
  }, [like]);

  const sendCommentBtn = () => {
    // 댓글 달기
    if (comment.trim().length) {
      if (!writestatus) {
        createFeedCommentAPI({
          content: comment,
          feedId: state.feedId,
          userId: state.userId,
        }).then(() => {
          readFeedDetailAPI({
            feedId: state.feedId,
            userId: state.userId,
          }).then((res) => {
            setDetail(res);
          });
          setComment('');
        });
      } else {
        createFeedChildCommentAPI({
          commentId: commentId,
          content: comment,
          userId: state.userId,
        }).then(() => {
          readFeedDetailAPI({
            feedId: state.feedId,
            userId: state.userId,
          }).then((res) => {
            setDetail(res);
          });
          setComment('');
          setWriteStatus(false);
          setCommentId(0);
        });
      }
    }
  };

  const sendLike = () => {
    // 하트 보내기 & 새로고침
    if (like) {
      deleteFeedLikeAPI({ feedId: state.feedId, userId: state.userId }).then(
        () => {
          setLike(!like);
        },
      );
    } else {
      addFeedLikeAPI({ feedId: state.feedId, userId: state.userId }).then(
        () => {
          setLike(!like);
        },
      );
    }
  };
  const sendCommentLike = (commentId: number) => {
    // 하트 보내기 & 새로고침
    if (like) {
      deleteCommentLikeAPI({ commentId: commentId, userId: state.userId }).then(
        () => {
          readFeedDetailAPI({
            feedId: state.feedId,
            userId: state.userId,
          }).then((res) => {
            setDetail(res);
          });
        },
      );
    } else {
      addCommentLikeAPI({ commentId: commentId, userId: state.userId }).then(
        () => {
          readFeedDetailAPI({
            feedId: state.feedId,
            userId: state.userId,
          }).then((res) => {
            setDetail(res);
          });
        },
      );
    }
  };

  const onChangeMessage = (e: any) => {
    setComment(e.target.value);
  };

  const editDate = (data: string) => {
    if (data) {
      const date = [data[0], '년 ', data[1], '월 ', data[2], '일'];
      return date.join('');
    } else {
      return '시간미정';
    }
  };

  const deleteCommentBtn = (d: any) => {
    if (state.userId == d.userId) {
      deleteFeedCommentAPI({
        commentId: d.commentId,
        feedId: state.feedId,
        userId: state.userId,
      }).then(() => {
        readFeedDetailAPI({ feedId: state.feedId, userId: state.userId }).then(
          (res) => {
            setDetail(res);
          },
        );
      });
    }
    // 댓글 달기
  };

  const createChildCommentBtn = (data: any) => {
    console.log('대댓글 달꺼냐고 모달창 생성!');
    setWriteStatus(!writestatus);
    setCommentId(data);
  };

  return (
    <Container>
      <FeedArg>
        <BackBtnNav pageTitle="상세 페이지" textColor="black" />

        <Content>
          <br />
          <FeedDetail key={detail.feedId}>
            {/* <Image src={Feed.imgSrc} alt="Feed-img" /> */}
            {/* <Title>{Feed.title}</Title> */}
            <Description>{detail.content}</Description>
            <hr />
            <SubData>
              <IconLine>
                {detail.likeStatus ? (
                  <IconImage
                    src={HeartLikeIcon}
                    alt="하트"
                    onClick={sendLike}
                  />
                ) : (
                  <IconImage src={HeartIcon} alt="빈하트" onClick={sendLike} />
                )}

                <IconText margin="0 1rem 0 0.5rem">{detail.likeCnt}</IconText>
                <IconImage src={MessageIcon} height="20" alt="메세지수" />
                <IconText margin="0 1rem 0 0.5rem">
                  {detail.commentCnt}
                </IconText>
              </IconLine>
              <Date>{editDate(detail.createdAt)}</Date>
            </SubData>
            <hr />
            <div>
              {detail.allComments.map((val) => {
                return (
                  <Comments
                    key={val.createdAt}
                    color={
                      writestatus && commentId === val.commentId ? 'grey' : ''
                    }
                  >
                    <CommentStatus>
                      <div>익명</div>
                      <InfoDiv>
                        {/* {val.likeStatus ? (
                          <IconImage
                            src={HeartLikeIcon}
                            alt="하트"
                            onClick={() => sendCommentLike(val.commentId)}
                          />
                        ) : (
                          <IconImage src={HeartIcon} alt="빈하트" onClick={() => sendCommentLike((val.commentId)} />
                        )} */}
                        <IconImage
                          src={MessageIcon}
                          height="18"
                          alt="대댓글달기"
                          onClick={() => createChildCommentBtn(val.commentId)}
                        />
                        <span>대댓글</span>
                        <IconImage
                          src={ThreeDotsIcon}
                          height="18"
                          alt="삭제"
                          onClick={() => deleteCommentBtn(val)}
                        />
                      </InfoDiv>
                    </CommentStatus>
                    <CommentBoxList data={val} />
                  </Comments>
                );
              })}
            </div>

            {/* // <div>
            //   {content[0].allComments.map((comment: any) => {
            //       <Description>{comment.content}</Description>
            //       {
            //         comment.childCommentDto.map((child: any) => {
            //           return (
            //               <div key={child.childId}>
            //                 <SubComment>{child.content}</SubComment>
            //               </div>;
            //             )
            //         }); 
            //       }
            //     })}
            // </div> */}
          </FeedDetail>
        </Content>

        <BottomContext>
          <ChatFooter>
            <InputText
              value={comment}
              onChange={onChangeMessage}
              placeholder="댓글을 입력하세요."
              rows={1}
            />
            <Button
              width="2rem"
              height="2rem"
              bgColor="#4095FF"
              textColor="white"
              fontSize="20px"
              Radius="50%"
              margin="1rem"
              icon={<IoArrowUpSharp />}
              shadow
              children=""
              ariaLabel="댓글 달기"
              onClick={sendCommentBtn}
            ></Button>
          </ChatFooter>
        </BottomContext>
      </FeedArg>
    </Container>
  );
};

const InfoDiv = styled.div`
  display: flex;
`;

const FeedDetail = styled.div`
  margin-bottom: 60px;
`;

const CommentStatus = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0rem 0.5rem 0;
  justify-content: space-between;
`;

const Comments = styled.div`
  background-color: ${(props) => props.color};
  min-height: 96px;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const SubData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const Date = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const FeedArg = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 1rem;
`;
const IconLine = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const BottomContext = styled.div`
  bottom: 0;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  background-color: #eef8ff;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  div::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FeedNotice = styled.div`
  border: 1px solid black;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
`;

const Image = styled.img`
  width: 18rem;
`;

const Description = styled.p`
  width: 95%;
  margin-bottom: 2rem;
  // color: white;
  // font-size: 1.2rem;
  // font-weigth: 500;
  white-space: pre-wrap;
  word-break: break-all;
  // line-height: 160%;
`;

const ChatFooter = styled.div`
  bottom: 0;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 8vh;
`;

const InputText = styled.textarea`
  border-radius: 10px;
  border: none;
  font-weight: 300;
  font-size: 16px;
  background-color: #ededed;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1);
  display: block;
  border-top: 2px solid #f0f0f0;
  margin: 0 0 0 1rem;
  padding: 8px 16px;
  width: 86%;
  &:focus {
    outline: none;
  }
`;

export default Feed;
