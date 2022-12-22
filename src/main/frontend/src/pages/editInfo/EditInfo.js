// 회원정보 수정페이지

import "./EditInfo.css";

import React, { useEffect, useRef, useState } from "react";
import { db, storageService } from "../../lib/api/fbase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "@firebase/storage";
import {
  deleteUser,
  getAuth,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import UserApi from "../../api/UserApi";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Box = styled.div`
  margin: 0 auto;
  padding: 0;
  font-family: "Gowun Dodum";
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
  overflow-x: hidden;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
`;

const Content = styled.div`
  display: block;
  align-items: center;
  width: 30vw;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 0px 24px #5c5696;
  @media screen and (max-width: 1024px) {
    width: 80vw;
  }
`;

const IdContainer = styled.div`
  position: relative;
  input {
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    width: 100%;
    margin: 8px 0;
    padding: 10px 0;
  }
  input:hover,
  input:active {
    outline: none;
    border-bottom-width: 2px;
    border-bottom-color: #6a679e;
  }
  button {
    position: absolute;
    top: 15px;
    right: 5px;
    background: #fff;
    font-size: 0.8rem;
    border-radius: 1rem;
    border: 1px solid #d4d3e8;
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    align-items: center;
    color: #4c489d;
    box-shadow: 0px 2px 2px #5c5696;
    cursor: pointer;
    transition: 0.2s;
  }

  button:hover,
  button:focus,
  button:active {
    border-color: #6a679e;
    outline: none;
  }

  button:disabled {
    background: lightgray;
  }
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

  //유효한 비밀번호 체크
  const [isValidPw, setIsValidPw] = useState(false);
  const [pwMessage, setPwMessage] = useState("");

  // 비밀번호 일치 체크
  const [isConPw, setIsConPw] = useState(false);
  const [conPwMessage, setConPwMessage] = useState("");

  // 버튼활성화 체크
  const [isPhoneDuplCheck, setIsPhoneDuplCheck] = useState(true);
  // 중복체크여부 체크
  const [isPhoneDuplCheckYn, setIsPhoneDuplCheckYn] = useState(true);
  // 전화번호 바꿀지 여부 체크
  const [isPhoneUpdateYn, setIsPhoneUpdateYn] = useState(false);

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

  // 문자로 된 파일을 이미지로 미리보여주기
  const saveImgFile = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    console.log("이미지 파일 : ", theFile);

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
    const pwdCheck = e.target.value;
    setPassword(pwdCheck);

    const regExp =
      /(?=.*\d{1,50})(?=.*[~`!@#$%\\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/;

    if (regExp.test(pwdCheck) !== true) {
      setPwMessage("8자리 이상 영문, 숫자, 특수문자를 혼합하여 입력해 주세요.");
      setIsValidPw(false);
    } else {
      setPwMessage("");
      setIsValidPw(true);
    }
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
    if (phone.valueOf().length === 12) {
      setIsPhoneDuplCheck(false);
    } else {
      setIsPhoneDuplCheck(true);
    }
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

  // 핸드폰번호 중복체크
  const onPhoneDuplCheck = async () => {
    if (phone === "") {
      window.alert("전화번호를 입력해주세요.");
      return;
    }

    const duplPhoneCheck = await UserApi.phoneDuplCheck(phone);

    if (duplPhoneCheck.data === true) {
      window.confirm("사용 가능한 전화번호입니다.");
      setIsPhoneDuplCheckYn(true);
    } else {
      window.confirm("중복된 전화번호입니다.");
      setIsPhoneDuplCheckYn(false);
    }
  };

  // 핸드폰번호 수정
  const onPhoneUpdate = async () => {
    setIsPhoneDuplCheckYn(false);
    setIsPhoneUpdateYn(true);
  };

  // 회원정보 수정
  const onClickEdit = async () => {
    // 변경할 이미지 경로
    let profileImagePath = null;

    if (userNickname === "") {
      window.alert("닉네임을 입력해주세요.");
      return;
    }

    if (phone === "") {
      window.alert("전화번호를 입력해주세요.");
      return;
    }

    if (isPhoneDuplCheckYn === false) {
      window.alert("전화번호 중복 여부를 체크해주세요.");
      return;
    }

    if (window.confirm("회원정보를 수정하시겠습니까?")) {
      if (true) {
        let profileImage = null; // 이미지를 수정할 경우 넣을 이미지 파일명
        let nowProfileImage = sessionStorage.getItem("profileImage"); // 현재 이미지 파일명

        // 이미지가 바뀌는 경우 -> 새로운 파일 이름 생성 후 이미지 이름 업데이트
        if (changeImgFile !== "") {
          profileImage = uuidv4();
        } else {
          profileImage = nowProfileImage;
        }

        // 세션에 이미지 정보가 있는 경우 -> 1. 그대로 냅두기 or 2. 변경하기
        if (imgFile !== "null") {
          // 기존 이미지가 존재하는 경우
          if (nowProfileImage !== "null") {
            // 2. 변경하는 경우
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

              //storage 참조 경로로 파일경로 가져오기
              profileImagePath = await getDownloadURL(attachmentRefUpload);
            } else {
              profileImagePath = sessionStorage.getItem("profileImagePath");
            }
          } else {
            if (changeImgFile !== "") {
              // 바꿀 이미지 업로드
              const attachmentRefUpload = ref(
                storageService,
                `/USER/${profileImage}`
              );
              await uploadString(attachmentRefUpload, imgFile, "data_url");

              //storage 참조 경로로 파일경로 가져오기 -> 변수에 넣고 DB에도 반영시킴
              profileImagePath = await getDownloadURL(attachmentRefUpload);
            }
          }
        }

        const userUpdate = await UserApi.userUpdate(
          userEmail,
          password,
          userNickname,
          phone,
          profileImage,
          profileImagePath
        );

        if (userUpdate.data !== false) {
          window.alert("회원정보 수정이 완료되었습니다.");
          sessionStorage.clear();
          // 이미지가 존재하는 경우
          if (userUpdate.data.profileImage !== "null") {
            // 불러온 이미지 이름 저장
            sessionStorage.setItem(
              "profileImage",
              userUpdate.data.profileImage
            );
            // 불러온 이미지 경로 세션에 저장
            sessionStorage.setItem(
              "profileImagePath",
              userUpdate.data.profileImagePath
            );
          }
          sessionStorage.setItem("userEmail", userUpdate.data.userEmail);
          sessionStorage.setItem("userNickname", userUpdate.data.userNickname);
          sessionStorage.setItem("phone", userUpdate.data.phone);
          const auth = getAuth();
          const user = auth.currentUser;
          await updatePassword(user, userUpdate.data.password);
          await updateProfile(user, {
            displayName: userNickname,
            photoURL: profileImagePath,
          });
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: userNickname,
            userEmail,
            photoURL: profileImagePath,
          });
          window.location.replace("/user/profile");
        }
      }
    } else {
      return;
    }
  };

  // 회원정보 탈퇴
  const onDeleteUser = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      const deleteUserInfo = await UserApi.delete(userEmail);

      if (deleteUserInfo.data === true) {
        window.confirm("탈퇴를 완료하였습니다.");

        // 세션에서 정보 삭제
        sessionStorage.clear();

        // 탈퇴시 firebase에서도 정보를 삭제
        const auth = getAuth();
        const user = auth.currentUser;
        await deleteUser(user);

        //카카오 로그인 정보도 삭제
        KakaoLogout();

        window.location.replace("/");
      }
    }
  };
  const KakaoLogout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.API.request({
        url: "/v1/user/unlink",
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
      window.Kakao.Auth.setAccessToken(undefined);
    }
  };

  return (
    <Box>
      <Container>
        <Content>
          <Link to="/user/profile">
            <MdArrowBack size="24" style={{ margin: 10 }} />
          </Link>
          <h1 class="form-title">Edit Account Information</h1>
          <div>
            <form className="edit-form">
              <img
                className="profile-img"
                src={
                  imgFile !== "null"
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
              <span
                className={`message ${isValidPw ? "success" : "error"}`}
                style={{ color: "#ff0000", fontSize: "0.8rem" }}
              >
                {pwMessage}
              </span>
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

              {isPhoneUpdateYn === false ? (
                <IdContainer>
                  <input
                    type="text"
                    value={phone}
                    style={{ background: "#F2F3F4" }}
                    readOnly
                  />
                  <button type="button" onClick={onPhoneUpdate}>
                    수정
                  </button>
                </IdContainer>
              ) : (
                <IdContainer>
                  <input
                    type="text"
                    placeholder="PHONE NUMBER"
                    ref={phoneRef}
                    value={phone}
                    onChange={onChangePhone}
                  />
                  <button
                    type="button"
                    onClick={onPhoneDuplCheck}
                    disabled={isPhoneDuplCheck}
                  >
                    중복확인
                  </button>
                </IdContainer>
              )}
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
