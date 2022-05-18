import styled from 'styled-components';

import Button from '../Atoms/Button';
import { ContactTextarea } from '../Atoms/Textarea';

interface IProps_SignupForm {
  label: string;
  value: string;
  onInputChange: (val: string) => void;
  onFormSubmit: (val: string) => void;
}

const ContactContent = ({
  label,
  value,
  onInputChange,
  onFormSubmit,
}: IProps_SignupForm) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit(value);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledLabel>{label}</StyledLabel>
      <ContactTextarea
        value={value}
        fontSize="16px"
        onChange={inputChangeHandler}
      />
      <Button
        bgColor="white"
        textColor="black"
        fontWeight="500"
        margin="1rem 0 0"
      >
        전송
      </Button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2rem 1rem;
  animation: 0.6s ease-in-out 0s 1 normal forwards running fadeinBottom;
  @keyframes fadeinBottom {
    from {
      opacity: 0;
      transform: translate3d(0, 50px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const StyledLabel = styled.label`
  font-size: 20px;
  text-align: center;
  color: white;
  font-weight: 700;
  margin-bottom: 3rem;
`;

export default ContactContent;
