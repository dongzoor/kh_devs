// 회원정보 수정페이지

import "./EditInfo.css";

import React, { useEffect, useRef, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "@firebase/storage";

import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import UserApi from "../../api/UserApi";
import { storageService } from "../../lib/api/Fbase";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Content = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: white;
  width: 40vw;
  box-shadow: 0px 0px 24px #5c5696;
`;

function EditInfo() {
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [password, setPassword] = useState(""); // 새로운 비밀번호
  const [inputConPw, setInputConPw] = useState(""); // 비밀번호 확인
  const [phone, setPhone] = useState("");
  const phoneRef = useRef();

  const [imgFile, setImgFile] = useState("");
  const [changeImgFile, setChangeImgFile] = useState("");
  const imgRef = useRef();

  const [isConId, setIsConId] = useState(false);
  const [ConIdMessage, setConIdMessage] = useState("");

  const [isConPw, setIsConPw] = useState(false);
  const [conPwMessage, setConPwMessage] = useState("");

  // 초기값 설정
  useEffect(() => {
    const originEmail = sessionStorage.getItem("userEmail");
    const originNickname = sessionStorage.getItem("userNickname");
    const originPhone = sessionStorage.getItem("phone");
    const profileImagePath = sessionStorage.getItem("profileImagePath");
    if (originEmail || originNickname || originPhone || profileImagePath) {
      setUserEmail(originEmail);
      setUserNickname(originNickname);
      setPhone(originPhone);
      // 원래 설정한 이미지를 세션 스토리지에서 가져옴
      setImgFile(profileImagePath);
    }
  }, []);

  const saveImgFile = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    console.log(theFile);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImgFile(result);
      setChangeImgFile(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onChangeNickname = (e) => {
    setUserNickname(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // 휴대폰 번호 오토하이픈 추가
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

  // 비밀번호 일치 여부 검사
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPw(passwordCurrent);
    if (passwordCurrent !== password) {
      setConPwMessage("비밀번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀번호가 일치합니다.");
      setIsConPw(true);
    }
  };

  // 회원정보 수정
  const onClickEdit = async () => {
    if (userNickname === "") {
      window.alert("닉네임을 입력해주세요.");
      return;
    }

    if (phone === "") {
      window.alert("전화번호를 입력해주세요.");
      return;
    }

    if (window.confirm("회원정보를 수정하시겠습니까?")) {
      if (true) {
        let profileImage = null;
        let nowProfileImage = sessionStorage.getItem("profileImage");

        // 이미지가 바뀌는 경우
        if (changeImgFile !== "") {
          //새로운 파일이름 생성
          profileImage = uuidv4();
        } else {
          //기존이미지이름 넣기
          profileImage = nowProfileImage;
        }

        const userUpdate = await UserApi.userUpdate(
          userEmail,
          password,
          userNickname,
          phone,
          profileImage
        );

        if (userUpdate.data !== false) {
          if (imgFile !== "") {
            // 기존 이미지가 존재하는 경우
            if (nowProfileImage !== null) {
              // 이미지가 바뀌는 경우
              if (changeImgFile !== "") {
                const attachmentRefDelete = ref(
                  storageService,
                  `/USER/${nowProfileImage}`
                );
                //storage 참조 경로로 기존 이미지 삭제
                await deleteObject(attachmentRefDelete);

                // 바꿀 이미지 업로드
                const attachmentRefUpload = ref(
                  storageService,
                  `/USER/${profileImage}`
                );
                await uploadString(attachmentRefUpload, imgFile, "data_url");
              }
            } else {
              if (changeImgFile !== "") {
                // 바꿀 이미지 업로드
                const attachmentRefUpload = ref(
                  storageService,
                  `/USER/${profileImage}`
                );
                await uploadString(attachmentRefUpload, imgFile, "data_url");
              }
            }
          }

          window.alert("회원정보 수정이 완료되었습니다.");
          if (userUpdate.data.profileImage !== null) {
            let attachmentUrl = ref(
              storageService,
              `/USER/${userUpdate.data.profileImage}`
            );
            // 이미지 불러오기
            let profileImageNow = await getDownloadURL(attachmentUrl);
            // 불러온 이미지 이름 저장
            sessionStorage.setItem(
              "profileImage",
              userUpdate.data.profileImage
            );
            // 불러온 이미지 경로 세션에 저장
            sessionStorage.setItem("profileImagePath", profileImageNow);
          }
          sessionStorage.setItem("userEmail", userUpdate.data.userEmail);
          sessionStorage.setItem("userNickname", userUpdate.data.userNickname);
          sessionStorage.setItem("phone", userUpdate.data.phone);
          window.location.replace("/Profile");
        }
      }
    } else {
      return;
    }
  };

  // 회원정보 탈퇴
  const onDeleteUser = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      const deleteUser = await UserApi.delete(userEmail);

      if (deleteUser.data === true) {
        window.confirm("탈퇴를 완료하였습니다.");
        sessionStorage.clear();
        window.location.replace("/");
      }
    }
  };

  return (
    <Box>
      <Container>
        <Content>
          <Link to="/Profile">
            <MdArrowBack size="24" style={{ margin: 10 }} />
          </Link>
          <h1 class="form-title">Edit Account Information</h1>
          <div>
            <form className="edit-form">
              <img
                className="profile-img"
                src={
                  imgFile
                    ? imgFile
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="프로필 이미지"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
              <label className="profileImg-label" htmlFor="profileImg">
                Add Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImg"
                onChange={saveImgFile}
                ref={imgRef}
              />
              <input
                type="text"
                placeholder="ID(EMAIL)"
                value={userEmail}
                style={{ background: "#F2F3F4" }}
                readOnly
              />
              <span
                className={`message ${isConId ? "success" : "error"}`}
                style={{ color: "#ff0000" }}
              >
                {ConIdMessage}
              </span>
              <input
                type="text"
                placeholder="NICKNAME"
                value={userNickname}
                onChange={onChangeNickname}
              />
              <input
                type="password"
                placeholder="NEW PASSWORD"
                value={password}
                onChange={onChangePassword}
              />
              <input
                type="password"
                placeholder="VERIFY PASSWORD"
                value={inputConPw}
                onChange={onChangeConPw}
              />
              <span
                className={`message ${isConPw ? "success" : "error"}`}
                style={{ color: "#ff0000" }}
              >
                {conPwMessage}
              </span>
              {/* <input type="text" placeholder="CODE" />  */}
              {/* 휴대폰이나 이메일 인증 기능 구현 시 사용 예정 */}

              <input
                type="text"
                placeholder="PHONE NUMBER"
                ref={phoneRef}
                value={phone}
                onChange={onChangePhone}
              />
              <div></div>
              <button
                type="button"
                className="submit_btn"
                onClick={onClickEdit}
              >
                Submit
              </button>
              <label
                className="Withdraw"
                style={{ margin: "10px", color: "#7875b5" }}
                onClick={onDeleteUser}
              >
                Withdraw
              </label>
            </form>
          </div>
        </Content>
      </Container>
    </Box>
  );
}

export default EditInfo;
