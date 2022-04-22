import LoginTitle from '../Atoms/loginTitle';
import LoginButtonGrid from "./loginButtonGrid"
import LoginInputGrid from "./loginInptGrid"

const LoginBox = () => {
  return (
    <div>
      <LoginTitle />
      <LoginInputGrid />
      <LoginButtonGrid />
    </div>
  )
}

export default LoginBox;