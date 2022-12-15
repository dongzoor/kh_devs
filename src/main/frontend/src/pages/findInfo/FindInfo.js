// 아이디, 비밀번호 찾기 페이지

import "./FindInfo.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";

import { MdArrowBack } from "react-icons/md";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
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

function FindInfo() {
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const phoneRef = useRef();
  const [pwPhone, setPwPhone] = useState("");
  const phonePwRef = useRef();
  const [isConId, setIsConId] = useState(false);
  const [ConIdMessage, setConIdMessage] = useState("");

  const navigate = useNavigate();

  const onChangeId = (e) => {
    const idCheck = e.target.value;
    setUserEmail(idCheck);

    const regExp =
      /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (regExp.test(idCheck) !== true) {
      setConIdMessage("이메일주소 형식이 올바르지 않습니다.");
      setIsConId(false);
    } else {
      setConIdMessage("");
      setIsConId(true);
    }
  };

  // 아이디찾기 - 휴대폰 번호 오토하이픈
  const onChangePhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    var result = "";

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;

        case 7:
          result += "-";
          break;

        default:
          break;
      }
      result += value[i];
    }
    phoneRef.current.value = result;
    setPhone(e.target.value);
  };

  // 비밀번호 찾기 - 휴대폰 번호 오토하이픈
  const onChangePwPhone = (e) => {
    const value = phonePwRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    var result = "";

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;

        case 7:
          result += "-";
          break;

        default:
          break;
      }
      result += value[i];
    }
    phonePwRef.current.value = result;
    setPwPhone(e.target.value);
  };

  const onClickFindId = async () => {
    const res = await UserApi.findId(phone);
    if (res.data !== null) {
      console.log(res.data);
      // window.alert("test");
      window.alert(`아이디는 ${res.data.userEmail} 입니다.`);
    } else {
      window.alert("입력하신 정보를 확인해주세요.");
    }
  };

  const onClickFindPwd = async () => {
    const res = await UserApi.findPwd(userEmail, pwPhone);
    if (res.data !== null) {
      console.log(res.data);
      // window.alert("test");
      window.alert(
        "입력하신 메일로 임시 비밀번호를 전송하였습니다. \n새로운 비밀번호로 로그인 해주세요."
      );
      navigate("/");
    } else {
      window.alert("입력하신 정보를 확인해주세요.");
    }
  };

  return (
    <Box>
      <Container>
        <Content>
          <Link to="/">
            <MdArrowBack size="24" style={{ margin: 10 }} />
          </Link>
          <h1 class="form-title">Find Account Information</h1>
          <div>
            <form className="findInfo-form">
              <Tabs
                defaultActiveKey="FindId"
                transition={false}
                id="noanim-tab-example"
                className="findInfo-tab"
              >
                <Tab
                  eventKey="FindId"
                  title="Find Id"
                  className="findId-tab"
                  style={{ margin: "20px" }}
                >
                  <div className="findId">
                    <input
                      type="text"
                      placeholder="PHONE NUMBER"
                      ref={phoneRef}
                      value={phone}
                      onChange={onChangePhone}
                      className="find__input"
                    />
                    <button
                      className="submit_btn"
                      type="button"
                      onClick={onClickFindId}
                    >
                      submit
                    </button>
                  </div>
                </Tab>

                <Tab
                  eventKey="FindPassword"
                  title="Find Password"
                  className="findPwd-tab"
                  style={{ margin: "20px" }}
                >
                  <div className="findPwd">
                    <input
                      type="text"
                      className="find__input"
                      placeholder="ID(EMAIL)"
                      value={userEmail}
                      onChange={onChangeId}
                    />
                    <input
                      type="text"
                      className="find__input"
                      placeholder="PHONE NUMBER"
                      ref={phonePwRef}
                      value={pwPhone}
                      onChange={onChangePwPhone}
                    />
                    <button
                      className="submit_btn"
                      type="button"
                      onClick={onClickFindPwd}
                    >
                      submit
                    </button>
                  </div>
                </Tab>
              </Tabs>
            </form>
          </div>
        </Content>
      </Container>
    </Box>
  );
}

export default FindInfo;
