import { randomFillSync } from "crypto";
import { useState, useCallback } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const ChatReport = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  // 함수 => 사용
  function postReport() {
    fetch(`http://localhost:8080`,
      {
        method: "POST",
      })
      .then(() => {
        console.log('성공')
      })
  }


  return (
    <div>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <div>
            신고하기
          </div>
          <div>
            <TextTag>신고가 누적된 유저는 {"\n"}
            채팅 이용이 정지됩니다. {"\n"}
            정말 신고하시겠습니까?</TextTag>
          </div>
          <button onClick={postReport}>신고하기</button>
        </Modal>
      )}
      <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton>
    </div>
  );
}

const TextTag = styled.p`
  white-space: pre-line;
`

const DialogButton = styled.button`
  width: 160px;
  height: 48px;
  background-color: blueviolet;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`;

export default ChatReport;