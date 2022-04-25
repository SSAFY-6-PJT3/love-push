/**
 * @author Hyeonsooryu
 */

import Button from '../components/Atoms/Button';
import { IoLocationSharp } from 'react-icons/io5';
import styled from 'styled-components';

const StoryBook = () => {
  return (
    <Container>
      <Title>Buttons</Title>
      <Button
        width="160px"
        height="40px"
        bgColor="white"
        textColor="black"
        fontSize="12px"
        icon={<IoLocationSharp />}
        shadow
      >
        위치 정보 켜기
      </Button>
      <Button width="200px" margin="1rem 0">
        로그인
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export default StoryBook;
