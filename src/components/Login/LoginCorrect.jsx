import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCollect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');  // 3초 후에 메인 페이지로 이동
        }, 4000);
        return () => clearTimeout(timer);  // 컴포넌트가 언마운트되면 타이머를 제거합니다.
    }, [navigate]);

    return (
        <div className='logincollect_wrap'>
          <div className="fade-out-box">
            <h2>환영해요 <br /><strong>임형준님</strong></h2>
            <p>오늘도 <strong>틈새시간</strong><br /><i>손틈새로</i> 알차게</p>
          </div>
        </div>
    )
}

export default LoginCollect
