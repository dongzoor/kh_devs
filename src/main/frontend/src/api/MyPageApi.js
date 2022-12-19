import axios from "axios";

const MyPageApi = {

  // 작성글 전체 조회
  mySocialList: async function (userId) {
    return await axios.get(`/api/myPage/mySocial/${userId}`);
  },

  // 작성글 선택 삭제
  mySocialDelete: async function (socialId) {
    return await axios.delete(`/api/myPage/mySocial/delete/${socialId}`);  
  },

  // 작성글 전체 삭제
  mySocialAllDelete: async function (userId) {
    console.log("전체 삭제 Api userID : " + userId);
    return await axios.delete(`/api/myPage/mySocial/allDelete/${userId}`);
  },


  // 작성댓글 전체 조회
  myCommentList: async function (userId) {
    return await axios.get(`/api/myPage/myComment/${userId}`);
  },
  
  // 작성댓글 선택 삭제
  myCommnetDelete: async function (socialId) {
    return await axios.delete(`/api/myPage/myCommonet/delete/${socialId}`);  
  },

  // 작성댓글 전체 삭제
  myCommnetAllDelete: async function (userId) {
    console.log("전체 삭제 Api userID : " + userId);
    return await axios.delete(`/api/myPage/myCommonet/allDelete/${userId}`);
  },

  // 가입한 스터디 전체 조회(내가 모집한 스터디 포함)


  // 캘린더 전체 조회

  // 일정 상세 조회

  // 일정 작성

  // 일정 수정

  // 일정 삭제

};
export default MyPageApi;