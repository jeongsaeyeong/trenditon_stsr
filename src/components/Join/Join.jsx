import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom'
import logoImage from '../../assets/img/logo.png'
import eyeOpenImage from '../../assets/img/login_eye_open.svg'
import eyeClosedImage from '../../assets/img/login_eye_closed.svg'
import ScrollTop from '../../utils/ScrollTop';
import Nav from '../Nav/Nav'
import axios from 'axios'

const useSignUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (userData) => axios.post('https://3.34.197.56:443/api/users/signup', userData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userData');
      },
    }
  );
};

export default function Join() {
  const [displayName, setDisplayName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const [displayNameValid, setDisplayNameValid] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [pwVisible, setPwVisible] = useState(false);
  const [pwCheckVisible, setPwCheckVisible] = useState(false);

  

  useEffect(() => {
    if(displayNameValid && idValid && pwValid && pwCheckValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [displayNameValid, idValid, pwValid, pwCheckValid]);

  const handleNickname = (e) => {
    setDisplayName(e.target.value);
    const regex =
    /(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]+$/;
    if (regex.test(e.target.value)) {
      setDisplayNameValid(true);
    } else {
      setDisplayNameValid(false);
    }
  };
  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
    if (regex.test(e.target.value)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  const handlePwCheck = (e) => {
    setPwCheck(e.target.value);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (regex.test(e.target.value)) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  };

  const signUpMutation = useSignUpMutation();

  const onClickConfirmButton = async () => {
    const userData = {
      userId: id,
      userName: displayName,
      userPw: pw,
    };

    try {
      await signUpMutation.mutateAsync(userData);
      alert('회원가입에 성공했습니다.');
    } catch (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  

  return (
    <>
      <Nav />
      <div className="join-container">
        <div className="join-header">
          <div className="join-title">
            회원가입
          </div>
          <div className="join-text">
            출퇴근 · 통학 틈새시간<br />
            손틈새로 공부
          </div>
        </div>
        <div className="join-input">
          <div className="input-title">별명</div>
          <div className="input-wrap">
            <input
              className="input"
              type="text"
              placeholder="nickname"
              value={displayName}
              onChange={handleNickname}
            />
          </div>
          <div className="input-title">아이디</div>
          <div className="input-wrap">
            <input
              className="input"
              type="text"
              placeholder="ID"
              value={id}
              onChange={handleId}/>
          </div>
          <div className="errorMessageWrap">
            {!idValid && id.length > 0 && (
              <div>영문, 숫자 포함 6자 이상 입력해주세요.</div>
            )}
          </div>
          <div className="input-title">
            비밀번호
          </div>
          <div className="input-wrap pweyes">
            <input
              className="input"
              type={pwVisible ? "text" : "password"}
              placeholder="Password"
              value={pw}
              onChange={handlePw} />
            <button 
              style={{ backgroundImage: `url(${pwVisible ? eyeOpenImage : eyeClosedImage})` }} 
              onClick={() => setPwVisible(!pwVisible)}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
          <div className="input-title">
            비밀번호 확인
          </div>
          <div className="input-wrap pweyes" >
            <input
              className="input"
              type={pwCheckVisible ? "text" : "password"}
              placeholder="Password Confirm"
              value={pwCheck}
              onChange={handlePwCheck} />
            <button 
              style={{ backgroundImage: `url(${pwCheckVisible ? eyeOpenImage : eyeClosedImage})` }} 
              onClick={() => setPwCheckVisible(!pwCheckVisible)}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwCheckValid && pwCheck.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>
        <div>
          <Link to='/login'>
            <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
              확인
            </button>
          </Link>
        </div>
        <div className="goLoginWrap">
          이미 가입하셨나요? 
          <Link to='/login'>
            <div className="goToLogin">
              로그인 하러가기
            </div>
          </Link>
        </div>
      </div>
      <ScrollTop />
    </>
  );
}