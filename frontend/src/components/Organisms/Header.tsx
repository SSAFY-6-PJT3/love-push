import styled from 'styled-components';

interface IPropsStyledHeader {
  bgColor?: string;
  height?: string;
}

interface IPropsHeader extends IPropsStyledHeader {
  children: React.ReactNode;
}

const Header = ({ bgColor, height, children }: IPropsHeader) => {
  return (
    <StyledHeader height={height} bgColor={bgColor}>
      {children}
    </StyledHeader>
  );
};

const StyledHeader = styled.header<IPropsStyledHeader>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.bgColor || 'transparent'};
  height: ${(props) => props.height || '56px'};
`;

export default Header;
