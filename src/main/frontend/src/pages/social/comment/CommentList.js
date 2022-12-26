import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SocialApi from "../../../api/SocialApi";
import { useParams } from "react-router-dom";
import CommentWriter from "./CommentWriter";

const BOX = styled.div`
  margin: 5px 20px;
  .comment-box {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .parent-box {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-top: 10px;
    padding: 5px;
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
    /* padding: 0px 5px 20px; */
    white-space: pre-wrap;
  }
  .userImage {
    margin: 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .deleteBt {
    float: right;
  }
`;

const CommentList = () => {
  const getUserId = parseInt(window.sessionStorage.getItem("userId"));
  const [commentList, setCommentList] = useState([]);
  const [inputContent, setInputContent] = useState(""); // 댓글 내용 입력 받을 객체
  const [isSubmit, setIsSubmit] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);
  const params = useParams().socialId; // router에서 지정한 :social 을 붙여줘야함!!
  // 자식->부모로 isSubmit 값을 받아오기 위한 콜백 함수
  const changeState = () => {
    setIsSubmit(true);
  };
  // 댓글 조회
  useEffect(() => {
    const CommentData = async () => {
      try {
        const response = await SocialApi.socialDetail(params);
        setCommentList(response.data.comments);
        // rendering 을 위한 의존성배열 값 초기화
        setDeleteComplete(false);
        setIsSubmit(false);
      } catch (e) {
        // console.log(e);
      }
    };
    CommentData();
  }, [deleteComplete, isSubmit]);

  // 삭제 버튼 클릭 시
  const onClickButton = async (commentId) => {
    // console.log(commentId + "번 댓글 삭제 버튼 클릭");
    const res = await SocialApi.commentDelete(commentId);
    if (res.data === true) {
      // console.log(res.data);
      setDeleteComplete(true); // 삭제되면 render 되도록
      alert("댓글이 삭제되었습니다.");
    } else setDeleteComplete(false);
  };

  return (
    <BOX>
      <CommentWriter
        inputContent={inputContent}
        setInputContent={setInputContent}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        changeState={changeState}
      />
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
                <span className="comment-date">
                  | {comment.postDate[0]}-{comment.postDate[1]}-
                  {comment.postDate[2]} {comment.postDate[3]}:
                  {comment.postDate[4]}
                </span>
              </div>
              <p className="comment-text">{comment.content}</p>
              {getUserId === comment.userId && (
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
