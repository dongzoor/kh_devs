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
  const [loading, setLoading] = useState(false);
  const params = useParams().socialId;
  const imageId = sessionStorage.getItem("social_image");
  // 기존 데이터 가져옴
  const [socialDetail, setSocialDetail] = useState("");
  // 기존 데이터를 넣어줄 곳
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [attachment, setAttachment] = useState(""); // 이미지를 string 으로 변환한 값
  // firebase 참조 주소(파일주소)
  const [attachmentRef, setAttachmentRef] = useState("");
  const [inputVal, setInputVal] = useState("");

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
    setInputVal(e.target.value);
    console.log(inputVal);
  };

  const onClickEdit = async () => {
    console.log("수정 버튼 클릭");
    // ※ 1. 기존 이미지가 있을 때
    if (imageId !== "null") {
      // ※※ 1-1. 새로 이미지가 생겼을 때
      // if (attachment !== null) {
      if (inputVal !== null) {
        console.log(attachment);
        console.log("1-1. 새로 이미지가 생겼을 때");
        // 파이어베이스 상 파일주소 지정
        // =============== 기존 이미지 삭제 =================
        setAttachmentRef(ref(storageService, `/SOCIAL/${imageId}`));
        // 참조경로로 firebase 이미지 삭제
        await deleteObject(attachmentRef)
          .then(() => {
            console.log("Firebase File deleted successfully !");
          })
          .catch((error) => {
            console.log("Uh-oh, File Delete error occurred!");
          });
        // =============== 신규 이미지 저장 =================
        var attachmentUrl = null; // 이미지 URL
        var imageName = uuidv4(); // 이미지 UUID
        // 참조경로로 storage에 저장
        setAttachmentRef(ref(storageService, `/SOCIAL/${imageName}`));
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        attachmentUrl = await getDownloadURL(response.ref);
        // api 전송
        const res = await SocialApi.socialUpdate(
          params,
          titleInput,
          contentInput,
          tagInput,
          attachmentUrl,
          imageName
        );
        window.sessionStorage.setItem("social_image", imageName);
        if (res.data === true) {
          navigate(`/social/${params}`); //수정된 게시글로 이동
          alert("Social 게시글 수정 완료 !");
        } else {
          alert("Social 게시글 수정 실패 ");
          console.log(res.data);
        }
      } else if (attachment == null) {
        // ※※ 1-2. 기존 이미지 그대로 유지할 때
        console.log("1-2. 기존 이미지 그대로 유지할 때");
        const res = await SocialApi.socialUpdate(
          params,
          titleInput,
          contentInput,
          tagInput
        );
        if (res.data === true) {
          navigate(`/social/${params}`); // 수정된 게시글로 이동
          alert("Social 게시글 수정 완료 !");
        } else {
          alert("Social 게시글 수정 실패 ");
          console.log(res.data);
        }
      }
    } else {
      // ※ 2. 기존 이미지가 없을 때
      // ※※ 2-1. 새로 이미지가 생겼을 때
      if (inputVal !== null) {
        console.log("2-1. 새로 이미지가 생겼을 때");
        // 파일 참조 경로 지정
        attachmentUrl = null;
        imageName = uuidv4(); // 이미지 UUID
        const attachmentRef = ref(storageService, `/SOCIAL/${imageName}`);
        // 참조경로로 storage에 저장
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        attachmentUrl = await getDownloadURL(response.ref);
        // api 전송
        const res = await SocialApi.socialUpdate(
          params,
          titleInput,
          contentInput,
          tagInput,
          attachmentUrl,
          imageName
        );
        window.sessionStorage.setItem("social_image", imageName);

        if (res.data === true) {
          navigate(`/social/${params}`); //수정된 게시글로 이동
          alert("Social 게시글 수정 완료 !");
        } else {
          alert("Social 게시글 수정 실패 ");
          console.log(res.data);
        }
      } else if (inputVal == null) {
        // ※ 2-2. 계속 이미지가 없을 때
        console.log("2-2. 계속 이미지가 없을 때");
        // api 전송
        attachmentUrl = null;
        const res = await SocialApi.socialUpdate(
          params,
          titleInput,
          contentInput,
          tagInput,
          attachmentUrl
        );
        if (res.data === true) {
          navigate(`/social/${params}`); //수정된 게시글로 이동
          alert("Social 게시글 수정 완료 !");
        } else {
          alert("Social 게시글 수정 실패 ");
          console.log(res.data);
        }
      }
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
            value={inputVal}
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
