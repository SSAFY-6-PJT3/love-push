import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function LoginModal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const DialogBox = styled.dialog`
width: 50vh;
height: 50vh;

display: flex;
flex-direction: column;
align-items: center;
border: none;
border-radius: 10px;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
box-sizing: border-box;
background-color: #EEF8FF;
z-index: 10000;
justify-content: center;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default LoginModal;