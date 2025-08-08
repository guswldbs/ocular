import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

type User = {
    userid: string;
    password: string
};

export const Signup: React.FC = () => {
    // 입력값 상태
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

    // 기존 사용자 목록
    const [users, setUsers] = useState<User[]>([]);

    // 중복 체크 상태
    const [isChecking, setIsChecking] = useState(false); //중복확인 로딩중
    const [isChecked, setIsChecked] = useState(false); //중복확인을 눌렀는가?
    const [isAvailable, setIsAvailable] = useState < boolean | null > (null); // 사용 가능한가
    const [checkMsg, setCheckMsg] = useState(''); //중복체크 결과 메세지

    // 제출 오류 메시지
    const [submitMsg, setSubmitMsg] = useState('');

    const navigate = useNavigate();

    // 마운트 시 로컬스토리지에서 기존 사용자 불러오기
    useEffect(() => {
        const raw = localStorage.getItem('users');
        if (raw) {
            try {
                const parsed: User[] = JSON.parse(raw);
                setUsers(parsed);
            } catch  {
                setUsers([]);
            }
        }
    }, []);

    // userid 변경 시 중복체크 초기화
    useEffect(() => {
        setIsChecked(false);
        setIsAvailable(null);
        setCheckMsg('');
    }, [userid]);

    // 아이디 중복 체크
    const handleCheckDuplicate = async () => {
        const trimmed = userid.trim();
        if (!trimmed) {
            setIsChecked(true);
            setIsAvailable(false);
            setCheckMsg('아이디를 입력하세요.');
            return;
        }

        setIsChecking(true);
        await new Promise(r => setTimeout(r, 400)); // 가짜 지연
        const exists = users.some(u => u.userid === trimmed);

        setIsChecked(true);
        setIsAvailable(!exists);
        setCheckMsg(
            exists
                ? '이미 사용 중인 아이디입니다.'
                : '사용 가능한 아이디입니다.'
        );
        setIsChecking(false);
    };

    // 회원가입 제출
    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        setSubmitMsg('');

        if (!userid.trim()) {
            setSubmitMsg('아이디를 입력하세요.');
            return;
        }
        if (!isChecked) {
            setSubmitMsg('아이디 중복확인을 해주세요.');
            return;
        }
        if (!isAvailable) {
            setSubmitMsg('사용 불가한 아이디입니다. 다른 아이디로 시도하세요.');
            return;
        }
        if (!password.trim()) {
            setSubmitMsg('비밀번호를 입력하세요.');
            return;
        }

        const newUsers: User[] = [
            ...users, {
                userid: userid.trim(),
                password
            }
        ];
        localStorage.setItem('users', JSON.stringify(newUsers));
        setUsers(newUsers);

        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
    };

    // 버튼 활성화 조건
    const canSubmit = isChecked && isAvailable === true && password
        .trim()
        .length > 0;

    return (
        <PageWrapper>
            <Card>
                <Title>회원가입</Title>

                <Form onSubmit={handleSubmit}>
                    {/* 아이디 */}
                    <FormRow>
                        <Label htmlFor="userid">아이디</Label>
                        <Row>
                            <Input
                                id="userid"
                                type="text"
                                placeholder="아이디를 입력하세요"
                                value={userid}
                                onChange={e => setUserid(e.target.value)}/>
                            <SmallButton
                                type="button"
                                onClick={handleCheckDuplicate}
                                disabled={isChecking || !userid.trim()}>
                                {
                                    isChecking
                                        ? '확인중...'
                                        : '중복확인'
                                }
                            </SmallButton>
                        </Row>
                        {isChecked && <HelpText $ok={!!isAvailable}>{checkMsg}</HelpText>}
                    </FormRow>

                    {/* 비밀번호 */}
                    <FormRow>
                        <Label htmlFor="password">비밀번호</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                    </FormRow>

                    {submitMsg && <ErrorText>{submitMsg}</ErrorText>}

                    <SubmitButton type="submit" disabled={!canSubmit}>
                        회원가입
                    </SubmitButton>
                </Form>
            </Card>
        </PageWrapper>
    );
};

// --------------------------------------
// styled-components 정의
// --------------------------------------

const PageWrapper = styled.div `
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f6f8;
`;

const Card = styled.div `
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 14px;
  padding: 32px 28px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
`;

const Title = styled.h2 `
  margin: 0 0 18px;
  text-align: center;
`;

const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormRow = styled.div `
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label `
  font-size: 14px;
  color: #333;
`;

const Row = styled.div `
  display: flex;
  gap: 8px;
`;

const Input = styled.input `
  flex: 1;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #4c83ff;
    box-shadow: 0 0 0 3px rgba(76, 131, 255, 0.15);
  }
`;

const SmallButton = styled.button `
  padding: 0 12px;
  border: 1px solid #ccc;
  background: black;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: blue;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const HelpText = styled.p < {
    $ok: boolean
} > `
  margin: 0;
  font-size: 13px;
  color: ${ ({
    $ok}) => ($ok ? '#0f9d58' : '#e53935')};
`;

    const ErrorText = styled.p `
  margin: 0;
  color: #e53935;
  font-size: 13px;
`;

    const SubmitButton = styled.button `
  padding: 12px;
  border: 0;
  border-radius: 8px;
  background: #4c83ff;
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #3d6de0;
  }
  &:disabled {
    background: #c9d3ff;
    cursor: not-allowed;
  }
`;
