import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SocialApi from "../../../api/SocialApi";
import { useParams } from "react-router-dom";

const BOX = styled.div`
  margin: 5px 20px;
  * {
    font-family: "Song Myung", serif;
  }
  .comment-box {
    display: flex;
    flex-direction: column;
  }
  .child-box {
    display: flex;
    align-items: center;
  }
  .comment-writer {
    padding: 5px;
  }
  .comment-date {
    color: grey;
    padding: 5px;
    font-size: 0.9em;
  }
  .comment-text {
    padding: 0px 5px 20px;
    border-bottom: 1px dashed rgba(209, 209, 209, 0.8);
  }
  .userImage {
    margin: 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
`;

const CommentList = () => {
  const getSocialId = window.sessionStorage.getItem("social_id");
  const getUserId = window.sessionStorage.getItem("userId");

  const [commentList, setCommentList] = useState([]);
  const [inputContent, setInputContent] = useState(""); // 댓글 내용 입력 받을 객체
  const [deleteComplete, setDeleteComplete] = useState(false);
  const params = useParams().socialId; // router에서 지정한 :social 을 붙여줘야함!!

  // 댓글 조회
  useEffect(() => {
    const CommentData = async () => {
      try {
        const response = await SocialApi.socialDetail(params);
        setCommentList(response.data.comments);
      } catch (e) {
        console.log(e);
      }
    };
    CommentData();
  }, [deleteComplete, inputContent]);

  // 삭제 버튼 클릭 시
  const onClickButton = async (postId) => {
    console.log("댓글 삭제 버튼 클릭");
    console.log("postid: " + postId);
    const res = await SocialApi.deleteComment(postId);
    console.log(res.data.result);
    if (res.data.result === "OK") {
      setDeleteComplete(true);
    } else setDeleteComplete(false);
  };

  return (
    <BOX>
      <div className="comment-box">
        {commentList &&
          commentList.map((comment) => (
            <div className="parent-box" key={comment.id}>
              <div className="child-box">
                <img
                  className="userImage"
                  alt="프로필 사진"
                  src={
                    comment.userImageUrl
                      ? comment.userImageUrl
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                />
                <span className="comment-writer">{comment.userNickName}</span>
                <span className="comment-date">| {comment.postDate}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
              {getUserId == comment.userId && (
                <>
                  <button
                    className="deleteBt"
                    onClick={() => onClickButton(comment.id)}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          ))}
      </div>
    </BOX>
  );
};
export default CommentList;
