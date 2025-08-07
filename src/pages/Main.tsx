 // button 하나 만들어서 login 화면으로 넘어가기
 //계정 로그인에 구글 계정만 추가
import {Link} from 'react-router-dom'

const Main = () => {
	return (
		<>
			<h3>안녕하세요. 메인페이지 입니다.</h3>
			<ul>
				<Link to="/login"><li>로그인하러가기</li></Link>
			</ul>

		</>
	);
};


export default Main;


