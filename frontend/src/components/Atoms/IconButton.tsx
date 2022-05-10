/**
 * @author Hyeonsooryu
 */

import styled from 'styled-components';

interface IPropsStyledButton {
  margin?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  shadow?: boolean;
}

interface IPropsIcon {
  imgWidth?: string;
  imgHeight?: string;
}

interface IPropsIconButton extends IPropsStyledButton, IPropsIcon {
  imgURL: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton = ({
  margin,
  width,
  height,
  imgURL,
  bgColor,
  shadow,
  imgWidth,
  imgHeight,
  onClick,
}: IPropsIconButton) => {
  return (
    <StyledButton
      margin={margin}
      width={width}
      height={height}
      bgColor={bgColor}
      shadow={shadow}
      onClick={onClick}
    >
      <Icon
        src={imgURL}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        alt="버튼 이미지"
      />
    </StyledButton>
  );
};

const StyledButton = styled.button<IPropsStyledButton>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '40px'};
  height: ${(props) => props.height || '40px'};
  background-color: ${(props) => props.bgColor || 'transparent'};
  padding: 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.shadow ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : ''};
`;

const Icon = styled.img<IPropsIcon>`
  width: ${(props) => props.imgWidth || '24px'};
  height: ${(props) => props.imgHeight || '24px'};
`;

export default IconButton;
