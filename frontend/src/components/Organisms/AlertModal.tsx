import React from 'react';

import '../../styles/AlertModal.style.css';

interface IProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const AlertModal = ({ isModalOpen, closeModal }: IProps) => {
  const dommyDate = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
  return (
    <>
      {isModalOpen && (
        <div className="alert_box">
          <div className="alert_list">
            {dommyDate.map((data, i) => (
              <div key={i} className="alert_card">
                알림
              </div>
            ))}
          </div>
          <button onClick={closeModal}>닫기</button>
        </div>
      )}
    </>
  );
};

export default AlertModal;
