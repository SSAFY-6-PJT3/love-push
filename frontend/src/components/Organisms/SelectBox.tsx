import styled from 'styled-components';
import Button from '../Atoms/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { grey } from '@mui/material/colors';
import { fontSize } from '@mui/system';

interface IProps_SelectBox {
  label: string;
  options: any;
  value: string;
  onInputChange: (val: string) => void;
  onFormSubmit: (val: string) => void;
}

const SelectBox = ({
  label,
  value,
  options,
  onInputChange,
  onFormSubmit,
}: IProps_SelectBox) => {
  const RadioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit(value);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormControl>
        <StyledLabel id="demo-row-radio-buttons-group-label">
          {label}
        </StyledLabel>
        <RadioContainer>
          <RadioCategory
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={RadioChangeHandler}
          >
            {options.map((option: any) => (
              <FormControlLabel
                value={option.value}
                control={
                  <Radio
                    sx={{
                      'color': grey[50],
                      '&.Mui-checked': {
                        color: grey[900],
                      },
                    }}
                  />
                }
                label={option.name}
                key={option.value}
              />
            ))}
          </RadioCategory>
        </RadioContainer>
        <Button
          bgColor="white"
          textColor="black"
          fontWeight="500"
          margin="1rem 0 0"
        >
          다음
        </Button>
      </FormControl>
    </StyledForm>
  );
};

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioCategory = styled(RadioGroup)`
  color: white;
`;

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
  margin-bottom: 1rem;
`;

export default SelectBox;
