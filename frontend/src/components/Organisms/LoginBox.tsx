import LoginButtonGrid from './LoginButtonGrid';
import LoginInputGrid from './LoginInputGrid';
import { LoginTitle } from '../Atoms/Text';

const LoginBox = () => {
  return (
    <div>
      <LoginTitle>로그인</LoginTitle>
      <LoginInputGrid />
      <LoginButtonGrid />
    </div>
  );
};

export default LoginBox;
