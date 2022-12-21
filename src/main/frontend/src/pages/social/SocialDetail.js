import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../../lib/api/fbase";
import CommentList from "./comment/CommentList";
import SocialApi from "../../api/SocialApi";

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
  .subtitle {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 25px;
    margin: 8px 0px;
  }
  .subtitle::before,
  .subtitle::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
  .parentBox {
    font-family: "Gowun Dodum", sans-serif;
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
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 25px;
  }
  hr {
    width: 98%;
    height: 3px;
    border: 0;
    background-color: rgba(209, 209, 209);
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
  .button-box {
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

  .goList {
    float: right;
    margin: 20px;
    padding: 10px;
    border-radius: 50px;
    border-color: #8e44ad;
    border-radius: 0;
    color: #8e44ad;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 150ms ease-in-out;
    &:after {
      content: "";
      position: absolute;
      display: block;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 100%;
      background: #8e44ad;
      z-index: -1;
      transition: width 150ms ease-in-out;
    }
    &:hover {
      color: #fff;
      &:after {
        width: 110%;
      }
    }
  }
  .deleteBt,
  .updateBt {
    border: 0;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);
    transition-duration: 0.5s;
    &:hover {
      color: white;
      background-color: rgba(190, 100, 255, 0.5);
      box-shadow: 5px 5px 10px rgba(190, 100, 255, 0.2);
      box-shadow: none;
    }
  }
`;

const SocialDetail = () => {
  const navigate = useNavigate();
  const params = useParams().socialId; // router에서 지정한 :social 을 붙여줘야함!!
  const [socialDetail, setSocialDetail] = useState("");
  const [postDate, setPostDate] = useState("");
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
  const goList = () => {
    navigate("/social");
  };
  // 게시글 수정 화면으로 전환
  const onClickUpdate = async () => {
    navigate(`/social/${params}/update`);
  };

  // 게시글 삭제
  const onClickDelete = async () => {
    console.log("삭제 버튼 클릭");
    const res = await SocialApi.socialDelete(params);
    let imageId = sessionStorage.getItem("social_imageId");
    // 기존 이미지가 존재하면 삭제(이미지 ID로 확인)
    if (imageId !== "null") {
      // 이미지없는 게시글 삭제 에러 수정 완료
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
        setPostDate(response.data.postDate);
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
                <span className="date">
                  | {postDate[0]}-{postDate[1]}-{postDate[2]} {postDate[3]}:
                  {postDate[4]}
                </span>
              </div>
              <div className="button-box">
                {/* 게시글 작성자 email = 로그인한 유저 email 이면 출력 */}
                {userEmail === socialDetail.userEmail && (
                  <>
                    <button className="deleteBt" onClick={onClickDelete}>
                      삭제
                    </button>
                    <button className="updateBt" onClick={onClickUpdate}>
                      수정
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="attachedImg">
              {`${socialDetail.image}` != null && (
                <img src={socialDetail.image} className="preview" alt="" />
              )}
            </div>
            <div className="content-text">{socialDetail.content}</div>
            <hr className="line" />
            <CommentList />
            <button className="goList" onClick={goList}>
              GO LIST
            </button>
          </div>
        </div>
      </DetailBox>
    </div>
  );
};

export default SocialDetail;
