import {
  IoChatboxOutline,
  IoEyeOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { deleteObject, ref } from "@firebase/storage";

import CommentList from "./comment/CommentList";
import CommentWriter from "./comment/CommentWriter";
import SocialApi from "../../api/SocialApi";
import { storageService } from "../../lib/api/fbase";
import styled from "styled-components";

const DetailBox = styled.div`
  & > * {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  margin: 0px auto;
  /* background-color: rgba(211, 188, 230, 0.25); */
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
  .content-title {
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    background-color: white;
    font-size: 25px;
  }
  hr {
    width: 98%;
    height: 1px;
    border: 0;
    background-color: rgba(209, 209, 209, 0.8);
  }
  .content-text {
    padding: 10px;
    // text 개행 처리 !
    white-space: pre-wrap;
  }
  .post-info {
    display: flex;
    justify-content: space-between;
  }
  .publisher-info {
    display: flex;
    align-items: center;
  }
  .icon-box {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  .userImage {
    margin: 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .date {
    color: grey;
    margin: 0 5px;
  }
  .count {
    padding: 5px;
  }
  .hashtag-box {
    margin: 10px;
  }
  .hashtag {
    margin: 0px 3px;
    padding: 8px;
    font-style: italic;
    background-color: rgba(219, 219, 219, 0.5);
    border-radius: 10px;
  }
  // 첨부 사진 최대 크기 조정
  .preview {
    max-width: 95%;
  }
  // 첨부 사진 가운데 정렬
  .attachedImg {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SocialDetail = () => {
  const navigate = useNavigate();
  const params = useParams().socialId; // router에서 지정한 :social 을 붙여줘야함!!
  const [socialDetail, setSocialDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const userEmail = window.sessionStorage.getItem("userEmail");
  // 게시글 ID session Set
  const setSocialId = window.sessionStorage.setItem(
    "social_id",
    socialDetail.socialId
  );
  // 이미지 UUID session Set
  const setImageId = window.sessionStorage.setItem(
    "social_imageId",
    socialDetail.imageId
  );
  const setImageUrl = window.sessionStorage.setItem(
    "social_imageUrl",
    socialDetail.image
  );
  // 게시글 수정 화면으로 전환
  const onClickUpdate = async () => {
    navigate(`/social/${params}/update`);
  };

  // 게시글 삭제
  const onClickDelete = async () => {
    console.log("삭제 버튼 클릭");
    const res = await SocialApi.socialDelete(params);
    let imageId = sessionStorage.getItem("social_image");
    // 기존 이미지가 존재하면 삭제(이미지 ID로 확인)
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
    if (res.data.result === "SUCCESS") {
      navigate(`/social`);
      alert("게시글 삭제 완료 !");
    } else {
      alert("게시글 삭제 실패 ㅜ");
      console.log(res.data.result);
    }
  };

  useEffect(() => {
    const socialData = async () => {
      setLoading(true);
      try {
        console.log("★ 게시글 번호 : " + params);
        const response = await SocialApi.socialDetail(params);
        setSocialDetail(response.data);
        console.log("★ 게시글 내용 ", response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    socialData();
  }, []);
  if (loading) {
    return <DetailBox>조금만 기다려주세요...👩‍💻</DetailBox>;
  }
  return (
    <div>
      <DetailBox>
        <div className="subtitle">Board Detail Page</div>
        <div className="parentBox">
          <div key={socialDetail.socialId}>
            <div className="content-title">{socialDetail.title}</div>
            <div className="post-info">
              <div className="publisher-info">
                <img
                  className="userImage"
                  alt="프로필 사진"
                  src={
                    socialDetail.userImageUrl
                      ? socialDetail.userImageUrl
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                ></img>
                <span className="nickName">{socialDetail.userNickName}</span>
                <span className="date">| {socialDetail.postDate}</span>
              </div>
              <div className="icon-box">
                <IoEyeOutline />
                <span className="count">{socialDetail.view}</span>
                <IoHeartOutline />
                <span className="count">{socialDetail.like}</span>
                <IoChatboxOutline />
                <span className="count">{socialDetail.comment}</span>
              </div>
            </div>
            <div className="attachedImg">
              {`${socialDetail.image}` != null && (
                <img src={socialDetail.image} className="preview" alt="" />
              )}
            </div>
            <div className="content-text">{socialDetail.content}</div>
            <div className="hashtag-box">
              <span className="hashtag">{socialDetail.tag}</span>
            </div>
            {/* 게시글 작성자 email = 로그인한 유저 email 이면 출력 */}
            {userEmail == socialDetail.userEmail && (
              <>
                <button className="deleteBt" onClick={onClickDelete}>
                  삭제
                </button>
                <button className="updateBt" onClick={onClickUpdate}>
                  수정
                </button>
              </>
            )}
            <Link to="/social">
              <button>목록보기</button>
            </Link>
            <hr />
            <CommentList />
          </div>
        </div>
      </DetailBox>
    </div>
  );
};

export default SocialDetail;
