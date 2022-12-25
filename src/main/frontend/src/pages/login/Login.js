/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */

import "../login/Login.css";

import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import KakaoLogin from "react-kakao-login";
import UserApi from "../../api/UserApi";
import { auth } from "../../api/fbase";
import kakaoimages from "./images/kakao_login_small.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";

const Box = styled.div`
  margin: 0 auto;
  padding: 0;
  font-family: "Gowun Dodum";
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
`;

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // 세션이 존재하는 경우 프로필 화면으로
    if (sessionStorage.getItem("userEmail") !== null) {
      navigate("/user/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 키보드 입력
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };
  // useEffect(() => {
  //   const Data = async () => {
  //     try {
  //       requestPermission()
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   Data();
  // }, []);


  // function requestPermission() {
  //   console.log('Requesting permission...');
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.')}})
  //     };

  const onChangePw = (e) => {
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
  };

  const onEnterDown = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  const onClickLogin = async () => {
    // 로그인을 위한 axios 호출
    const res = await UserApi.userLogin(inputId, inputPw);

    console.log(res.data);
    if (res.data === "BAN_USER") {
      window.alert("차단된 유저입니다 서비스이용이 불가합니다.");
      window.location.replace("/");
    }
    // 로그인을 성공하는 경우
    else if (res.data !== false) {
      // 사람정보에 이미지가 존재하는 경우

      sessionStorage.setItem("profileImage", res.data.profileImage);
      sessionStorage.setItem("profileImagePath", res.data.profileImagePath);
      sessionStorage.setItem("userEmail", res.data.userEmail);
      sessionStorage.setItem("userNickname", res.data.userNickname);
      sessionStorage.setItem("phone", res.data.phone);
      // 마이페이지에서 사용
      sessionStorage.setItem("userId", res.data.userId);

      // Fire베이스에 로그인
      await signInWithEmailAndPassword(auth, inputId, res.data.password);

      window.location.replace("/user/profile");
    } else if (res.data === false) {
      window.alert("이메일이나 비밀번호를 확인해주세요.");
    }
  };

  //카카오 로그인 성공 시
  const socialLoginSuccess = (res) => {
    kakaoLoginInfo(
      res.profile.kakao_account.email,
      res.profile.kakao_account.profile.nickname
    );
  };

  // 카카오 로그인 실패
  const socialLoginFail = (res) => {
    console.log("카카오 로그인 실패");
    console.log(res);
  };

  // 카카오 로그인(카카오 API로 불러온 정보로 DB에 저장)
  const kakaoLoginInfo = async (email, nickname) => {
    // 로그인을 위한 axios 호출
    const res = await UserApi.kakaoLogin(email, nickname);

    console.log(res.data);

    // 로그인을 성공하는 경우
    if (res.data !== false) {
      // 사람정보에 이미지가 존재하는 경우

      sessionStorage.setItem("profileImage", res.data.profileImage);
      sessionStorage.setItem("profileImagePath", res.data.profileImagePath);
      sessionStorage.setItem("userEmail", res.data.userEmail);
      sessionStorage.setItem("userNickname", res.data.userNickname);
      sessionStorage.setItem("phone", res.data.phone);
      // 마이페이지에서 사용
      sessionStorage.setItem("userId", res.data.userId);

      // Fire베이스에 로그인
      await signInWithEmailAndPassword(
        auth,
        res.data.userEmail,
        res.data.password
      );

      window.location.replace("/user/profile");
    } else if (res.data === false) {
      if (window.confirm("가입된 정보가 없습니다, 가입하시겠습니까?")) {
        sessionStorage.setItem("kakaoEmail", email);
        sessionStorage.setItem("kakaoNickname", nickname);
        console.log(email);
        console.log(nickname);
        window.location.replace("/user/register");
      }
    }
  };

  return (
    <Box>
      <Container>
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <FaUser className="login__icon" />
                <input
                  type="text"
                  className="login__input"
                  placeholder="Email"
                  value={inputId}
                  onChange={onChangeId}
                  onKeyDown={onEnterDown}
                />
              </div>
              <div className="login__field">
                <FaLock className="pwd__icon" />
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  value={inputPw}
                  onChange={onChangePw}
                  onKeyDown={onEnterDown}
                />
              </div>

              <button
                type="button"
                className="login_btn"
                onClick={onClickLogin}
              >
                Log in now
              </button>
              <div className="menu_link">
                <Link to="/user/register">
                  <label
                    className="menu"
                    style={{
                      textDecoration: "none",
                      margin: "10px 10px 20px 10px",
                      color: "#7875b5",
                      fontWeight: 600,
                    }}
                  >
                    Register
                  </label>
                </Link>
                <Link to="/user/find">
                  <label
                    className="menu"
                    style={{
                      textDecoration: "none",
                      margin: "10px 10px 20px 10px",
                      color: "#7875b5",
                      fontWeight: 600,
                    }}
                  >
                    Find Id/Pw
                  </label>
                </Link>
              </div>
            </form>
            <div className="social-login">
              <label
                className="login_via"
                style={{ fontSize: "1.2rem", fontWeight: 500 }}
              >
                log in via
              </label>
              <div className="social-icons">
                <KakaoLogin
                  // rest api 키가 아닌 js 키를 사용
                  token="51ea48e71122b98e104d1afe6e741b1c"
                  onSuccess={(res) => socialLoginSuccess(res)}
                  onFail={(res) => socialLoginFail(res)}
                  render={({ onClick }) => (
                    <img
                      src={kakaoimages}
                      className="kakaoIcon"
                      onClick={(e) => {
                        e.preventDefault();
                        onClick();
                      }}
                    />
                  )}
                ></KakaoLogin>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default Login;
