import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <h3>환영합니다 회원님</h3>
      <ul>
        <Link to="/">
          <button>로그아웃</button>
        </Link>
        <Link to="/editsign">
          <button>회원정보 수정</button>
        </Link>
      </ul>
    </>
  );
};

export default About;
