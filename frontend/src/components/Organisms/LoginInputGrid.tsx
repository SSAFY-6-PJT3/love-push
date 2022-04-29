// import LoginInputId  from "../Molecules/loginInputId" 
// import LoginInputPw  from "../Molecules/loginInputPw"
// import styled from "styled-components";
import { LoginInput } from '../Atoms/Inputs';


const LoginInputGrid = () => {
  return (
    <div>
      <LoginInput type="text" placeholder="아이디" margin="1rem 0" />
      <LoginInput type="password" placeholder="비밀번호" margin="1rem 0" />
    </div>
  )
}


export default LoginInputGrid;