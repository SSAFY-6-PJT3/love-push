import styled from 'styled-components';

interface IPropsStyledHeader {
  height?: string;
}

interface IPropsHeader extends IPropsStyledHeader {
  children: React.ReactNode;
}

const Header = ({ children }: IPropsHeader) => {
  return <StyledHeader>{children}</StyledHeader>;
};

const StyledHeader = styled.header<IPropsStyledHeader>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height || '56px'};
`;

export default Header;
