import styled from 'styled-components';
import IconImage from '../Atoms/IconImage';
import ThreeDotsIcon from '../../images/icon/dots_icon.svg';
import { deleteFeedChildCommentAPI } from '../../api/feedAPI';

const ChildCommentBoxList = ({ data }: any) => {
  const ChildCommentBtn = () => {
    deleteFeedChildCommentAPI({
      commentId: data.commentId,
      childId: data.childId,
    }).then(() => {
      console.log('삭제완료');
    });
  };
  return (
    <div>
      <UpperTitle>
        <div>익명</div>
        <IconImage
          src={ThreeDotsIcon}
          height="18"
          alt="삭제"
          onClick={ChildCommentBtn}
        />
      </UpperTitle>
      <ChildComment>
        <p>{data.content}</p>
      </ChildComment>
    </div>
  );
};

const UpperTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 0 2rem;
`;

const ChildComment = styled.div`
  margin: 1rem 0 1rem 3rem;
  width: 95%;
  // color: white;
  // font-size: 1.2rem;
  // font-weigth: 500;
  white-space: pre-wrap;
  word-break: break-all;
  // line-height: 160%;
`;

export default ChildCommentBoxList;
