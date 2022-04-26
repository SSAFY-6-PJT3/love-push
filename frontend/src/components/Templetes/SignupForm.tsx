import React from 'react';
import { useParams } from 'react-router-dom';
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
      <ErrorMsg />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2rem 2rem;
`;

const StyledLabel = styled.label`
  font-size: 20px;
  text-align: center;
  color: white;
  font-weight: 700;
  margin-bottom: 3rem;
`;

const ErrorMsg = styled.p``;

export default SignupForm;
