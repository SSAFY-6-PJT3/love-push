import styled from "styled-components";
import { deleteFeedCommentAPI } from "../../api/feedAPI";
import ChildCommentBoxList from "./ChildCommentBoxList";



const CommentBoxList = ({ data }: any) => {

  return (
    <CommentContent>
      <p>{data.content}</p>
      
      {data.childCommentDto.map((val:any) => {
                return (
                  <ChildCommentBoxList data={val} key={ val.createdAt } />
                )
              })}
    </CommentContent>
  );
};

const CommentContent = styled.div`
  width: 95%;
  margin: 0.5rem 1rem;
  // color: white;
  // font-size: 1.2rem;
  // font-weigth: 500;
  white-space: pre-wrap;
  word-break: break-all;
  // line-height: 160%;
`;

const SubComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: grey;
`;
export default CommentBoxList;
