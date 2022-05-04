import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import IconButton from '../Atoms/IconButton';

const MainFooter = () => {
  const navigate = useNavigate();
  const helpBtnClickHandler = () => {
    navigate('/about-service');
  };

  return (
    <Footer>
      <IconButton
        shadow
        margin="4px 8px"
        bgColor="#EEF8FF"
        imgURL="https://img.icons8.com/emoji/48/000000/question-mark-emoji.png"
        onClick={helpBtnClickHandler}
      />
    </Footer>
  );
};

interface IPropsStyledFooter {
  bgColor?: string;
  height?: string;
}

const Footer = styled.footer<IPropsStyledFooter>`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.bgColor || 'transparent'};
  height: ${(props) => props.height || '56px'};
`;

export default MainFooter;
