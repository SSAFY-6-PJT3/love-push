import { TiLocation } from "react-icons/ti";
import styled from "styled-components";

const LocationPage = () => {
  return (
    <BackGround>
      <TitleTag>
        위치 정보를 켜면{"\n"}
        다른 사람들의 하트를{"\n"}
        받아볼 수 있어요!
      </TitleTag> 

      <Button><TiLocation size="12px"/>위치 정보 켜기</Button>
    </BackGround>
  )
}

const Button = styled.button`
  width: 160px;
  height: 40px;
  border-radius: 20px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  background-color: white;
  color: black;
  box-shadow:
`
const TitleTag = styled.p`
  white-space: pre-line;
  font-size: 20px;
  font-weight: 700;
  color: white;
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