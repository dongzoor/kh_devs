import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import SocialApi from "../../api/SocialApi";
import { storageService } from "../../lib/api/fbase";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";

const SocialWrite = () => {
  const getUserId = "3";
  const navigate = useNavigate();
  // const userNickname = sessionStorage.getItem("userNickname");
  // const getUserId = window.sessionStorage.getItem("userId");
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [attachment, setAttachment] = useState("");

  const onChangeTitle = (title) => setTitleInput(title.target.value);
  const onChangeContent = (content) => setContentInput(content.target.value);
  const onChangeTag = (tag) => setTagInput(tag.target.value);

  // 사진을 안올릴 경우 들어갈 수 있도록 빈 값 지정
  let attachmentUrl = " ";

  // 문자로 된 파일을 이미지로 보여줌 - 미리보기 코드
  const onFileChange = (e) => {
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
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClickSubmit = async () => {
    if (true) {
      // 변수 scope 때문에 함수로 묶어놓음
      let attachmentUrl = null;
      let imageName = null;

      if (attachment !== "") {
        // 파일 참조 경로 지정
        imageName = uuidv4(); // 이미지 UUID
        const attachmentRef = ref(storageService, `/SOCIAL/${imageName}`);
        // 참조경로로 storage에 저장
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        attachmentUrl = await getDownloadURL(response.ref);
        console.log("★ 이미지 주소 : " + attachmentUrl);
        console.log("★ 이미지 UUID : " + imageName);
      }
      const res = await SocialApi.socialWrite(
        getUserId,
        titleInput,
        contentInput,
        tagInput,
        attachmentUrl,
        imageName
      );

      console.log("제출 버튼 클릭");
      if (res.data === true) {
        window.alert("Social 게시글 작성 완료 !");
        navigate(`/social/`);
      } else {
        window.alert("Social 게시글 작성 실패 ㅜ");
        console.log(res.data);
      }
    }
  };

  return (
    <WriteBox>
      <div className="subtitle">Write anything you want 👩🏻‍💻✨</div>
      <div className="parentBox">
        <label>제목</label>
        <textarea
          className="title"
          placeholder="게시글의 제목을 입력해주세요."
          value={titleInput}
          onChange={onChangeTitle}
        ></textarea>
        <hr />
        <label>내용</label>
        <textarea
          className="content"
          placeholder="개발, 비개발 무엇이든 작성해주세요 (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧^"
          value={contentInput}
          onChange={onChangeContent}
        />
        <hr />
        <label>#해시태그</label>
        <textarea
          className="hashTag"
          placeholder="#이직 #프리랜서"
          value={tagInput}
          onChange={onChangeTag}
        />
        <label htmlFor="formFile" className="form-label">
          이미지 첨부
        </label>
        <div className="image-box">
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={onFileChange}
          />
          {/* 이미지 미리보기 */}
          {attachment && (
            <img
              src={attachment}
              className="preview"
              width="50px"
              height="50px"
              alt=""
            />
          )}
        </div>
        <button className="submitBt" onClick={onClickSubmit}>
          제 출
        </button>
      </div>
    </WriteBox>
  );
};

const WriteBox = styled.div`
  & > * {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  .subtitle {
    font-family: "Alfa Slab One", cursive;
    text-align: center;
    font-size: 25px;
    padding: 10px;
    margin: 20px;
  }
  .parentBox {
    font-family: "Song Myung", serif;
    width: 1024px;
    margin: 0px auto;
    padding: 5px;
    /* border: 1px solid black; */
    background-color: rgba(211, 188, 230, 0.25);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }
  label {
    margin: 10px 20px;
  }
  textarea {
    padding: 10px;
    margin: 0px 20px;
    resize: none;
    box-sizing: border-box;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);
    border: none;
    border-radius: 10px;
    color: rgb(98, 98, 112);
    background-color: rgba(245, 245, 245, 255);
    &::placeholder {
      color: rgb(98, 98, 112);
    }
  }
  .title {
    height: 50px;
  }
  .content {
    height: 600px;
  }
  .hashTag {
    height: 50px;
  }
  hr {
    width: 98%;
    height: 1px;
    border: 0;
    background-color: rgba(209, 209, 209, 0.8);
  }
  .hashTag-input {
    margin: 5px 20px;
  }
  .submitBt {
    width: 96%;
    height: 40px;
    margin: 20px auto;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);
    transition-duration: 0.3s;
    &:hover {
      color: white;
      background-color: rgba(190, 100, 255, 0.5);
      box-shadow: 5px 5px 10px rgba(190, 100, 255, 0.2);
      left: 5px;
      margin-top: 5px;
      box-shadow: none;
    }
  }
  .image-box {
    display: flex;
    margin: 0 20px;
  }
  .form-control {
    height: 100%;
    border-radius: 10px;
    font-size: 20px;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);
    color: rgb(98, 98, 112);
    margin-right: 10px;
  }
`;
export default SocialWrite;