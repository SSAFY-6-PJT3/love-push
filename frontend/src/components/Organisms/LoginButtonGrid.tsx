import Button from '../Atoms/Button';
import { Link } from 'react-router-dom';

const LoginButtonGrid = () => {
  return (
    <div>
      <Button width="400px" margin="1rem 0">
        로그인
      </Button>
      <Link to="/signup">
        <Button width="400px" margin="1rem 0" bgColor="#2B65BC">
          회원가입
        </Button>
      </Link>
    </div>
  );
};

export default LoginButtonGrid;
