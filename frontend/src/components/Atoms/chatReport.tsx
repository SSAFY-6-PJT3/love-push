import { randomFillSync } from "crypto";
import { useState, useCallback } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { FcAssistant } from "react-icons/fc";
import Button from './Button';


const ChatReport = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  // 함수 => 사용
  function postReport() {
    fetch(`http://localhost:8080/accounts/report`,
      {
        method: "POST",
        headers: {
          Authorization : `Bearer `,
        },
      })
      .then(() => {
        console.log('성공')
      })
  }


  return (
    <div>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <TitleTag>
            신고하기
          </TitleTag>
          <div>
            <TextTag>신고가 누적된 유저는 {"\n"}
            채팅 이용이 정지됩니다. {"\n"}
            정말 신고하시겠습니까?</TextTag>
          </div>
          <Button
            
            onClick={postReport}>신고하기</Button>
        </Modal>
      )}
      <FcAssistant size="32px" onClick={onClickToggleModal}/>
    </div>
  );
}

const TitleTag = styled.p`
  font-size: 20px;
  font-weight: 700;
`

const TextTag = styled.p`
  font-size: 20px;
  white-space: pre-line;
  font-weight: 300;

`
const ReportButton = styled(Button)`
`

export default ChatReport;