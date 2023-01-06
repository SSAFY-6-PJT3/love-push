/**
 * @author Hyeonsooryu
 */

import styled from 'styled-components';

interface InputStyleProps {
  margin?: string;
  width?: string;
  fontSize?: string;
  fontWeight?: string;
}

const SignupInput = styled.input<InputStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  padding: 8px 16px;
  background-color: transparent;
  color: white;
  font-weight: ${(props) => props.fontWeight || '300'};
  font-size: ${(props) => props.fontSize || '16px'};
  text-align: center;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid white;
  &:focus {
    outline: none;
  }
  &:hover {
    border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  }
`;

const LoginInput = styled.input<InputStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-weight: ${(props) => props.fontWeight || '300'};
  font-size: ${(props) => props.fontSize || '16px'};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`;

const ChatInput = styled.input<InputStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-weight: ${(props) => props.fontWeight || '300'};
  font-size: ${(props) => props.fontSize || '16px'};
  background-color: #ededed;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1);
  display: block;
  height: 50px;
  border-top: 2px solid #f0f0f0;
  margin: 0 0 0 1rem;
  placeholder : ${(props) => props.placeholder};
  &:focus {
    outline: none;
  }
`;

export { SignupInput, LoginInput, ChatInput };
