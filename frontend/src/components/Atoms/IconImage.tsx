/**
 * @author SeunghunHan
 */

import { ReactNode } from 'react';
import styled from 'styled-components';

interface ImageStyleProps {
  width: string;
  height: string;
  src: string;
  bgColor: string;
}

interface ImageProps extends ImageStyleProps {
  alt?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const IconImage = ({ width, height, alt, src, bgColor, onClick, }: ImageProps) => {
  return (
    <StyledImage
      width={width}
      height={height}
      alt={alt ? alt : '아이콘'}
      src={src ? src : ''}
      bgColor={bgColor ? bgColor : ''}
      onClick={onClick}
    ></StyledImage>
  );
};

IconImage.defaultProps = {
  width: '24px',
  height: '24px',
  src: '',
  alt: '아이콘',
  bgColor: '',
};

const StyledImage = styled.img<ImageStyleProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  src: ${(props) => props.src};
  alt: ${(props) => props.alt};
  background-color ${(props) => props.bgColor};
`;

export default IconImage;
