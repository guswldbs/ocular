//아이디 비밀번호 치면 로그인 되기
//데이터 휘발없게 하기
//로그아웃 누르면 다시 로그인 창으로 돌아가기
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
type User = {
  userid: string;
  password: string;
};

export const Login = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  //로그인 되면 마이페이지 들어갈 수 있게 하기

  // 1.로그인 버튼 클릭 시 실행되는 함수
  // 1-1.로그인 버튼 핸들러 연결하기
  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault(); //새로고침 막기

    // 아이디 비번 콘솔로그 찍기
    console.log(userid);
    console.log(password);

    // localStorage에서 회원가입 데이터 가져오기
    const raw = localStorage.getItem('users'); // Signup.tsx에서 저장한 키와 동일해야 함
    if (!raw) {
      setErrorMsg('가입된 사용자가 없습니다.');
      return;
    }

    //  입력값과 저장된 값 비교 문자열-객체로 바꿔주기
    const users: User[] = JSON.parse(raw) as User[];

    const found: User | undefined = users.find(
      (u: User) => u.userid.trim() === userid.trim() && u.password.trim() === password.trim()
    );

    if (found) {
      console.log('로그인 성공!');
      setErrorMsg('');

      // 로그인 상태를 유지하려면 localStorage에 로그인 유저 정보 저장
      localStorage.setItem('loggedInUser', JSON.stringify(found));

      // 맞으면 마이페이지로 넘어가기
      navigate('/about');
    } else {
      // 아이디/비밀번호 불일치
      setErrorMsg('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };
  return (
    <PageWrapper>
      <LoginWrapper>
        <Title>
          <Link to="/">OCULARS</Link>
        </Title>
        <LoginForm onSubmit={loginHandler}>
          <FormGroup>
            <Label htmlFor="userid">아이디:</Label>
            <Input
              type="text"
              id="userid"
              name="userid"
              value={userid}
              onChange={e => setUserId(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>

          {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
          {/* 하나라도 입력 안되면 로그인 버튼 비활성화 */}
          <LoginButton type="submit" disabled={!userid || !password}>
            로그인
          </LoginButton>
          {/* 회원가입 버튼 만들고 회원가입 버튼 누르면 회원가입 페이지로 이동하기 */}

          {/* 소셜 로그인 추가 필요 */}
        </LoginForm>
        <Signup>
          <button>
            <Link to="/signup">회원가입</Link>
          </button>
        </Signup>
      </LoginWrapper>
    </PageWrapper>
  );
};

// --------------------------------------
// styled-components 정의
// --------------------------------------

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
`;
const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 12px;
`;
const LoginWrapper = styled.div`
  background-color: white;
  padding: 40px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;
const Signup = styled.p`
  color: blue;
  background-color: white;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: 60px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  color: black;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const LoginButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
