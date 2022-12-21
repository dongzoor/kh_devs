import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import SocialApi from "../../api/SocialApi";
import { storageService } from "../../lib/api/fbase";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";

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
  hr {
    width: 98%;
    height: 1px;
    border: 0;
    background-color: rgba(209, 209, 209, 0.8);
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
  .hashtag {
    margin: 0px 3px;
    padding: 8px;
    font-style: italic;
    background-color: rgba(219, 219, 219, 0.5);
    border-radius: 10px;
    box-shadow: 0 1px 3px grey;
    /* color: rgba(3, 0, 209, 0.9); */
    margin-top: 50px;
  }
`;

const SocialWrite = () => {
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("userEmail");
  const socialId = sessionStorage.getItem("social_id");

  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [attachment, setAttachment] = useState("");

  // // #################해시태그
  // const [socialData, setSocialData] = useState("");
  // const [tags, setTags] = useState([]);
  // const [inputTag, setInputTag] = useState("");
  // const [nextId, setNextId] = useState(0);
  // const onTagChange = (e) => setInputTag(e.target.value);
  // const onClickTag = () => {
  //   const nextTags = tags.concat({
  //     id: nextId,
  //     name: inputTag,
  //     userEmail: userEmail,
  //   });
  //   console.log(nextTags);
  //   setNextId(nextId + 1);
  //   setTags(nextTags);
  //   setInputTag("");
  // };
  // const onRemoveTag = (id) => {
  //   const nextTags = tags.filter((tag) => tag.id !== id);
  //   setTags(nextTags);
  // };
  // const tagsList = tags.map((tag) => (
  //   <span
  //     className="hashtag"
  //     key={tag.id}
  //     onDoubleClick={() => {
  //       onRemoveTag(tag.id);
  //     }}
  //   >
  //     {tag.name}
  //   </span>
  // ));

  const onChangeTitle = (title) => setTitleInput(title.target.value);
  const onChangeContent = (content) => setContentInput(content.target.value);

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
      console.log("###############################");
      console.log("★ 이미지 주소 : " + attachmentUrl);
      console.log("★ 이미지 UUID : " + imageName);

      const res = await SocialApi.socialWrite(
        userEmail,
        titleInput,
        contentInput,
        attachmentUrl,
        imageName
      );
      console.log("제출 버튼 클릭");
      if (res.data.result === "SUCCESS") {
        window.alert("Social 게시글 작성 완료 !");
        navigate(`/social`);
      } else {
        window.alert("Social 게시글 작성 실패 ㅜ");
        console.log(res.data);
      }
      // if (res.data.result === "SUCCESS") {
      //   setSocialData(res.data.socialId);
      //   const resTag = await SocialApi.hashtagWrite(socialData, tags);
      //   console.log(resTag);
      //
      //   if (resTag === true) {
      //     console.log("back 에서 가져온 소셜아이디 : ", res.data.socialId);
      //     window.alert("Social 게시글 작성 완료");
      //     navigate(`/social`);
      //   } else {
      //     window.alert("Social 게시글 작성 실패 ㅜ");
      //     console.log(res.data);
      //   }
      // }
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
        {/* 해시태그 */}
        {/*<div>*/}
        {/*  <textarea value={inputTag} onChange={onTagChange}></textarea>*/}
        {/*  <button onClick={onClickTag}>입력</button>*/}
        {/*  <div>{tagsList}</div>*/}
        {/*</div>*/}
        <hr />
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

export default SocialWrite;
