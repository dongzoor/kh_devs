import "./EditInfo.css";

import React, { useEffect, useRef, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "@firebase/storage";

import { Link, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { storageService } from "../../lib/api/fbase";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import AdminApi from "../../api/AdminApi";

const Box = styled.div`
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Raleway, GmarketSansMedium;
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

function AdminEditUser() {

  const params = useParams().userId;
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [password, setPassword] = useState(""); // 새로운 비밀번호
  const [inputConPw, setInputConPw] = useState(""); // 비밀번호 확인
  const [phone, setPhone] = useState("");
  const phoneRef = useRef();
  
  const [imgId, setIimgId] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [changeImgFile, setChangeImgFile] = useState("");
  const imgRef = useRef();

  const [isConId, setIsConId] = useState(false);
  const [ConIdMessage, setConIdMessage] = useState("");

  const [isConPw, setIsConPw] = useState(false);
  const [conPwMessage, setConPwMessage] = useState("");
  // 초기값 설정
  


  useEffect(() => {
    const MemberData = async () => {
      try {
        console.log(params);
        const response = await AdminApi.admemberDetail(params)
        const originEmail = response.data.userEmail;
        const originNickname = response.data.userNickname;
        const originPhone = response.data.phone;
        const profileImagePath = response.data.profileImage;
console.log("이메일 확인 : " , originEmail )
      setUserEmail(originEmail);
      setUserNickname(originNickname);
      setPhone(originPhone);
      setImgFile(profileImagePath);   
      setIimgId(profileImagePath);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    MemberData();
  }, []);

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
      if (imgId !== "") {
      // 파이어베이스 상 파일주소 지정
      const attachmentRef = ref(storageService, `/USER/${imgId}`);
      // 참조경로로 firebase 이미지 삭제
      await deleteObject(attachmentRef)
        .then(() => {
          console.log("Firebase File deleted successfully !");
        })
        .catch((error) => {
          console.log("Uh-oh, File Delete error occurred!");
        });
    }
 // 1-2. 기존에 이미지 없었는데 생겼다? firebase, db에 모두 저장
 if (changeImgFile !== "") {
  // 파일 참조 경로 지정
  var changeImgFileUrl = null;
  var imageid = uuidv4(); // 이미지 UUID
  const changeImgRef = ref(storageService, `/USER/${imageid}`);
  // 참조경로로 storage에 저장
  const response = await uploadString(
    changeImgRef,
    changeImgFile,
    "data_url"
  );
  console.log("changeImgFile :", changeImgFile);
  changeImgFileUrl = await getDownloadURL(response.ref);
  console.log("이미지 주소 : " + changeImgFileUrl);
  console.log("이미지 ID : " + imageid);
}
const userUpdate = await AdminApi.AdUserUpdate(
  params,
  userNickname,
  password,
  phone,
  changeImgFileUrl,
  //imageName,
);
console.log("수정 버튼 클릭");
if (userUpdate.data === true) {
            window.location.replace("/AdminMemberList");
            alert("수정 완료 !");
  
} else {
  alert(" 수정 실패 ");
  console.log(userUpdate.data);
}
};

 // 회원정보 수정
//  const onClickEdit2 = async () => {
//   if (userNickname === "") {
//     window.alert("닉네임을 입력해주세요.");
//     return;
//   }

//   if (phone === "") {
//     window.alert("전화번호를 입력해주세요.");
//     return;
//   }

//   if (window.confirm("회원정보를 수정하시겠습니까?")) {
//     if (true) {
//       let profileImage = null;
//       let nowProfileImage = imgFile;

//       // 이미지가 바뀌는 경우
//       if (changeImgFile !== "") {
//         //새로운 파일이름 생성
//         profileImage = uuidv4();
//       } else {
//         //기존이미지이름 넣기
//         profileImage = nowProfileImage;
//       }

//       const userUpdate = await AdminApi.AdUserUpdate(
//         userEmail,
//         password,
//         userNickname,
//         phone,
//         profileImage
//       );

//       if (userUpdate.data !== false) {
//         if (imgFile !== "") {
//           // 기존 이미지가 존재하는 경우
//           if (nowProfileImage !== null) {
//             // 이미지가 바뀌는 경우
//             if (changeImgFile !== "") {
//               const attachmentRefDelete = ref(
//                 storageService,
//                 `/USER/${nowProfileImage}`
//               );
//               //storage 참조 경로로 기존 이미지 삭제
//               await deleteObject(attachmentRefDelete);

//               // 바꿀 이미지 업로드
//               const attachmentRefUpload = ref(
//                 storageService,
//                 `/USER/${profileImage}`
//               );
//               await uploadString(attachmentRefUpload, imgFile, "data_url");
//             }
//           } else {
//             if (changeImgFile !== "") {
//               // 바꿀 이미지 업로드
//               const attachmentRefUpload = ref(
//                 storageService,
//                 `/USER/${profileImage}`
//               );
//               await uploadString(attachmentRefUpload, imgFile, "data_url");
//             }
//           }
//         }
//         window.alert("회원정보 수정이 완료되었습니다.");
//         window.location.replace("/AdminMemberList");
//       }
//     }
//   } else {
//     return;
//   }
// };

////////////////////////// 온체인지 

const onChangeImage = (e) => {
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
    setChangeImgFile(result);
    setImgFile(result);
  };
  reader.readAsDataURL(theFile);
};

const onChangeNickname = (e) => {
  console.log("닉네임 확인" , userNickname)
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
      setConPwMessage("비밀 번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀 번호가 일치 합니다.");
      setIsConPw(true);
    }
  };

  return (
    <Box>
      <Container>
        <Content>
          <Link to="/AdminMemberList">
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
                onChange={onChangeImage}
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
            </form>
          </div>
        </Content>
      </Container>
    </Box>
  );
}

export default AdminEditUser;