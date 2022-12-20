import axios from "axios";

const MyPageApi = {

  // 작성글 조회
  mySocialList: async function (userId) {
    return await axios.get(`/api/myPage/mySocial/${userId}`);
  },

  // 작성글 삭제
  mySocialDelete: async function (socialId) {
    return await axios.delete(`/api/myPage/mySocial/delete/${socialId}`);  
  },

  // 작성댓글 조회
  myCommentList: async function (userId) {
    return await axios.get(`/api/myPage/myComment/${userId}`);
  },
  
  // 작성댓글 삭제
  myCommnetDelete: async function (commentId) {
    console.log("Delete Comment Id : " + commentId);
    return await axios.delete(`/api/myPage/myComment/delete/${commentId}`);  
  },

  // 가입한 스터디 조회
  myStudyList: async function (userId) {
    return await axios.get(`/api/myPage/myStudy/${userId}`);
  },

  // 캘린더 조회

  // 일정 상세 조회

  // 일정 작성

  // 일정 수정

  // 일정 삭제

};
export default MyPageApi;