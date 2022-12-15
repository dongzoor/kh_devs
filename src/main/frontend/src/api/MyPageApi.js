import axios from "axios";

const MyPageApi = {

  // 작성글 전체 조회
  mySocialList: async function (userId) {
    // const mySocialListObj = {
    //   userId: userId
    // };
    return await axios.get(`/api/myPage/mySocial${userId}`);
  },

  // 작성글 선택 삭제

  // 작성글 전체 삭제


  // 작성댓글 전체 조회
  
  // 작성댓글 선택 삭제

  // 작성댓글 전체 삭제


  // 좋아요한 글 전체 조회

  // 좋아요 취소


  // 가입한 스터디 전체 조회(내가 모집한 스터디 포함)


  // 캘린더 전체 조회

  // 일정 상세 조회

  // 일정 작성

  // 일정 수정

  // 일정 삭제

};
export default MyPageApi;