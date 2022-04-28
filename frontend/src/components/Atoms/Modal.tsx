import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface IPropsDialogBox {
  height?: string;
  padding?: string;
  bgColor?: string;
}

interface ModalDefaultType extends IPropsDialogBox {
  onClickToggleModal: () => void;
}

const Modal = ({
  height,
  bgColor,
  padding,
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) => {
  return (
    <ModalContainer>
      <DialogBox height={height} padding={padding} bgColor={bgColor}>
        {children}
      </DialogBox>
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
};

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

const DialogBox = styled.dialog<IPropsDialogBox>`
  width: 328px;
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: ${(props) => props.bgColor || 'white'};
  padding: ${(props) => props.padding || '1rem'};
  z-index: 10000;
  border-radius: 10px;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
