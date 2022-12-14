import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { storageService } from "../../lib/api/fbase";
import { v4 as uuidv4 } from "uuid";
import SocialApi from "../../api/SocialApi";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { async } from "@firebase/util";

const SocialUpdate = () => {
  const navigate = useNavigate();
  const params = useParams().socialId;
  const getUserId = window.sessionStorage.getItem("userId");
  const getImageId = window.sessionStorage.getItem("social_image");
  const imageId = sessionStorage.getItem("social_image");

  const [loading, setLoading] = useState(false);
  const [socialDetail, setSocialDetail] = useState(""); // 기존 데이터 가져옴
  // 기존 데이터를 넣어줄 곳
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [attachment, setAttachment] = useState(""); //이미지의 string 으로 변환한 값

  // 사진을 안올릴 경우 들어갈 수 있도록 빈 값 지정
  let attachmentUrl = " ";

  const onChangeTitle = (title) => setTitleInput(title.target.value);
  const onChangeContent = (content) => setContentInput(content.target.value);
  const onChangeTag = (tag) => setTagInput(tag.target.value);

  // 문자로 된 파일을 이미지로 보여줌 - 미리보기 코드
  const onChangeImage = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    console.log("★ 이미지 파일", theFile);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result); // 바뀐 파일의 string값 저장
      console.log(attachment);
    };
    reader.readAsDataURL(theFile);
  };

  // [수정] 버튼 클릭 시
  const onClickEdit = async () => {
    // 1-1. 일단 기존 사진ID가 있으면 firebase에서 삭제하고(db는 덮어쓰기 하니까 노신경)
    if (imageId !== null) {
      // 파이어베이스 상 파일주소 지정
      const attachmentRef = ref(storageService, `/SOCIAL/${imageId}`);
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
    if (attachment !== "") {
      // 파일 참조 경로 지정
      var attachmentUrl = null;
      var imageName = uuidv4(); // 이미지 UUID
      const attachmentRef = ref(storageService, `/SOCIAL/${imageName}`);
      // 참조경로로 storage에 저장
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      console.log("★ attachment(이미지의 string 형태) :", attachment);
      attachmentUrl = await getDownloadURL(response.ref);
      console.log("★ 이미지 주소 : " + attachmentUrl);
      console.log("★ 이미지 ID : " + imageName);
    }
    const res = await SocialApi.socialUpdate(
      params,
      titleInput,
      contentInput,
      tagInput,
      attachmentUrl,
      imageName
    );
    console.log("수정 버튼 클릭");
    if (res.data === true) {
      navigate(`/social/${params}`); //수정된 게시글로 이동
      alert("Social 게시글 수정 완료 !");
    } else {
      alert("Social 게시글 수정 실패 ");
      console.log(res.data);
    }
  };

  useEffect(() => {
    const socialData = async () => {
      setLoading(true);
      try {
        console.log("게시글ID : " + params);
        const response = await SocialApi.socialDetail(params);
        // 기존 데이터를 useState 값에 다 따로 받아주기 !
        setTitleInput(response.data.title);
        setContentInput(response.data.content);
        setTagInput(response.data.tag);
        setAttachment(response.data.image);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    socialData();
  }, []);
  if (loading) {
    return <WriteBox>조금만 기다려주세요...👩‍💻</WriteBox>;
  }
  return (
    <WriteBox>
      <div className="subtitle">Write anything you want 👩🏻‍💻✨</div>
      <div className="parentBox">
        <label>제목</label>
        <textarea
          className="title"
          value={titleInput}
          onChange={onChangeTitle}
        ></textarea>
        <hr />
        <label>내용</label>
        <textarea
          className="content"
          value={contentInput}
          onChange={onChangeContent}
        />
        <hr />
        <label>#해시태그</label>
        <textarea className="hashTag" value={tagInput} onChange={onChangeTag} />
        <label htmlFor="formFile" className="form-label">
          이미지 첨부
        </label>
        <div className="image-box">
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={onChangeImage}
          />
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
        <button className="editBt" onClick={onClickEdit}>
          수 정
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
  .editBt {
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
export default SocialUpdate;
