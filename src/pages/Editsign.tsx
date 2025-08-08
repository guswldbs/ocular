import { Link } from 'react-router-dom';

const Editsign = () => {
  return (
    <>
      {' '}
      <h3> 안녕하세요.메인페이지 입니다.</h3>
      <ul>
        <Link to="/login">
          <li>로그인하러가기</li>
        </Link>
      </ul>
    </>
  );
};

export default Editsign;
