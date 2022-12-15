/* eslint-disable react-hooks/exhaustive-deps */

import "../login/Login.css";

import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SiGithub, SiGoogle, SiKakaotalk } from "react-icons/si";

import UserApi from "../../api/UserApi";
import styled from "styled-components";

const Box = styled.div`
  margin: 0 auto;
  padding: 0;
  font-family: "Nanum Gothic", GmarketSansMedium;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // 세션이 존재하는 경우 프로필 화면으로
    if (sessionStorage.getItem("userEmail") !== null) {
      navigate("/Profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 키보드 입력
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };

  const onChangePw = (e) => {
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
  };

  const onClickLogin = async () => {
    // 로그인을 위한 axios 호출
    const res = await UserApi.userLogin(inputId, inputPw);

    console.log(res.data);

    // 로그인을 성공하는 경우
    if (res.data !== false) {
      // 사람정보에 이미지가 존재하는 경우

      sessionStorage.setItem("profileImage", res.data.profileImage);
      sessionStorage.setItem("profileImagePath", res.data.profileImagePath);
      sessionStorage.setItem("userEmail", res.data.userEmail);
      sessionStorage.setItem("userNickname", res.data.userNickname);
      sessionStorage.setItem("phone", res.data.phone);
      window.location.replace("/Profile");
    } else if (res.data === false) {
      window.alert("이메일이나 비밀번호를 확인해주세요.");
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
                />
              </div>

              <button
                type="button"
                className="login_btn"
                onClick={onClickLogin}
              >
                Log in now
              </button>

              <Link to="/Register" className="linktoReg">
                <label
                  style={{
                    textDecoration: "none",
                    margin: "10px 10px 20px 0px",
                    color: "#7875b5",
                  }}
                >
                  <div className="linktoReg">Register</div>
                </label>
              </Link>
              <Link to="/FindInfo">
                <label
                  style={{
                    textDecoration: "none",
                    margin: "10px ",
                    color: "#7875b5",
                  }}
                >
                  Find Id/Pw
                </label>
              </Link>
            </form>
            <div className="social-login">
              <h3>log in via</h3>
              <div className="social-icons">
                <a href="#" className="kakaoIcon">
                  <SiKakaotalk />
                </a>
                <a href="#" className="kakaoIcon">
                  <SiGoogle />
                </a>

                <a href="#" className="githubIcon">
                  <SiGithub />
                </a>
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
