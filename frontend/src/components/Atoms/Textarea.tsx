import styled from 'styled-components';

interface TextareaStyleProps {
  margin?: string;
  width?: string;
  fontSize?: string;
  fontWeight?: string;
}

const ContactTextarea = styled.textarea<TextareaStyleProps>`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width || '100%'};
  height: 200px;
  padding: 8px 16px;
  background-color: transparent;
  color: white;
  font-weight: ${(props) => props.fontWeight || '300'};
  font-size: ${(props) => props.fontSize || '16px'};
  text-align: center;
  border: 2px solid white;
  border-radius: 1rem;
  &:focus {
    outline: none;
  }
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.7);
  }
`;
 
 
 export { ContactTextarea };