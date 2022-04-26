import Button from '../Atoms/Button';
import styled from "styled-components";
import { IoLocationSharp } from 'react-icons/io5';

const LocationPage = () => {
  return (
    <BackGround>
      <TitleTag>
        위치 정보를 켜면{"\n"}
        다른 사람들의 하트를{"\n"}
        받아볼 수 있어요!
      </TitleTag> 
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
    </BackGround>
  )
}

const TitleTag = styled.p`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 700;
  color: white;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 40px;
`
const BackGround = styled.div`
  background: linear-gradient(197.56deg, #63DAE2 0%, #7FADE8 100%);
  width:100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default LocationPage;