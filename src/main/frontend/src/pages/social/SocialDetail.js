import React, { useEffect, useState } from "react";
import { deleteObject, ref } from "@firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "./comment/CommentList";
import SocialApi from "../../api/SocialApi";
import { storageService } from "../../api/fbase";
import styled from "styled-components";

const DetailBox = styled.div`
  overflow-x: hidden;
  & > * {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  .subtitle {
    margin: 20px 0px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-basis: 100%;
    font-size: 25px;
    color: rgba(0, 0, 0, 0.35);
    font-family: "Alfa Slab One", cursive;
  }
  .subtitle::before,
  .subtitle::after {
    content: "";
    height: 1px;
    margin: 0px 16px;
    line-height: 0px;
    flex-grow: 1;
    font-size: 0px;
    background: rgba(0, 0, 0, 0.35);
  }
  .parentBox {
    max-width: 1024px;
    min-width: 300px;
    margin: 0px auto;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    font-family: "Gowun Dodum", sans-serif;
    background-color: rgba(211, 188, 230, 0.25);
  }
  .content-title {
    margin: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 25px;
    background-color: rgba(255, 255, 255, 0.8);
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
    margin: 15px 5px;
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
    font-size: 0.8em;
  }
  // 첨부 사진 최대 크기 조정
  .attachedImg {
    max-width: 90%;
  }
  // 첨부 사진 가운데 정렬
  .attachedImg-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hashtags-box {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    .hashtags {
      margin: 5px 3px;
      padding: 8px;
      font-size: 0.75em;
      font-style: italic;
      background-color: rgba(3, 0, 209, 0.2);
      border-radius: 10px;
      box-shadow: 0 1px 3px grey;
    }
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
  @media (width < 450px) {
    .deleteBt,
    .updateBt {
      font-size: 12px;
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
    // console.log("삭제 버튼 클릭");
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
          // console.log("Firebase File deleted successfully !");
        })
        .catch((error) => {
          // console.log("Uh-oh, File Delete error occurred!");
        });
    }
    if (res.data.result === "SUCCESS") {
      navigate(`/social`);
      alert("게시글 삭제 완료 !");
    } else {
      alert("게시글 삭제 실패 ㅜ");
      // console.log(res.data.result);
    }
  };

  useEffect(() => {
    const socialData = async () => {
      setLoading(true);
      try {
        // console.log("★ 게시글 번호 : " + params);
        const response = await SocialApi.socialDetail(params);
        await SocialApi.socialViewUpdate(params);
        setSocialDetail(response.data);
        setPostDate(response.data.postDate);
        // console.log("★ 게시글 내용 ", response.data);
      } catch (e) {
        // console.log(e);
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
        <div className="subtitle">Dev' Social</div>
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
            <div className="attachedImg-box">
              {`${socialDetail.image}` != null && (
                <img src={socialDetail.image} className="attachedImg" alt="" />
              )}
            </div>
            <div className="content-text">{socialDetail.content}</div>
            <div className="hashtags-box">
              {socialDetail.hashtag &&
                socialDetail.hashtag.map((e, index) => (
                  <span className="hashtags" key={index}>
                    #{e}{" "}
                  </span>
                ))}
            </div>
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
