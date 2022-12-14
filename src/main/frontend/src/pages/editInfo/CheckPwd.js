// 아이디, 비밀번호 찾기 페이지

import "./CheckPwd.css";

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import UserApi from "../../api/UserApi";
import styled from "styled-components";

const Box = styled.div`
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Nanum Gothic", GmarketSansMedium;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Content = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 0px 24px #5c5696;
`;

function PwdCheck() {
  const [password, setPassword] = useState("");
  const userEmail = sessionStorage.getItem("userEmail");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickEdit = async () => {
    const res = await UserApi.userLogin(userEmail, password);
    console.log(res.data);

    if (res.data !== false) {
      // 성공 시 페이지 전환하기
      window.location.replace("/EditInfo");
    } else if (res.data === false) {
      window.alert("비밀번호를 확인해주세요.");
    }
  };
  return (
    <Box>
      <Container>
        <Content>
          <Link to="/">
            <MdArrowBack size="24" style={{ margin: 10 }} />
          </Link>
          <div className="form-title">
            <h1>CHECK YOUR PASSWORD</h1>
            <span>
              회원정보를 안전하게 보호하기 위해 비밀번호를 한번 더 확인해주세요.
            </span>
          </div>
          <div>
            <form className="pwdCheck-form">
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={onChangePassword}
              />
              <button
                type="button"
                className="submit_btn"
                onClick={onClickEdit}
              >
                submit
              </button>
            </form>
          </div>
        </Content>
      </Container>
    </Box>
  );
}

export default PwdCheck;
