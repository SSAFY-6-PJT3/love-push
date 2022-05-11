import styled from 'styled-components';

import { SignupInput } from '../Atoms/Inputs';

interface IProps_SignupForm {
  label: string;
  value: string;
  type: string;
  onInputChange: (val: string) => void;
  onFormSubmit: (val: string) => void;
}

const SignupForm = ({
  label,
  value,
  type,
  onInputChange,
  onFormSubmit,
}: IProps_SignupForm) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit(value);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledLabel>{label}</StyledLabel>
      <SignupInput
        type={type}
        value={value}
        fontSize="20px"
        fontWeight="700"
        onChange={inputChangeHandler}
      />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2rem 2rem;
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

export default SignupForm;
