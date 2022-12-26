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

  // 좋아요한 글 조회

  // 좋아요 취소

  // 가입한 스터디 조회
  myStudyList: async function (userId) {
    return await axios.get(`/api/myPage/myStudy/${userId}`);
  },

  // 캘린더 조회
  calendarList: async function (userId) {
    return await axios.get(`/api/myPage/myCalendar/${userId}`);
  },

  // 일정 상세 조회(title)
  eventId:async function (calendarTitle) {
    return await axios.get(`/api/myPage/myCalendar/detail/${calendarTitle}`);
  },

  // 일정 상세 조회
  // calendarDetail: async function (calendarId) {
  //   return await axios.get(`/api/myPage/myCalendar/detail/${calendarId}`);
  // },

  // 일정 등록
  calendarEventAdd: async function (userId, titleInput, contentInput, colorInput, startDateInput, endDateInput) {
    const eventObj = {
      userId: userId,
      title: titleInput,
      content: contentInput,
      color: colorInput,
      startDate: startDateInput,
      endDate: endDateInput,
    };
    return await axios.post(`/api/myPage/myCalendar/add`, eventObj);
  },

  // 나의 스터디 일정 등록
  myStudyAddCalendar: async function (userId, title, color, startDate) {
    const eventObj = {
      userId: userId,
      title: title,
      color: color,
      startDate: startDate
    };
    return await axios.post(`/api/myPage/myStudy/add`, eventObj);
  },

  // 일정 수정
  calendarUpdate: async function (calendarId, title, color, content, startDate, endDate) {
    const updateObj = {
      title: title,
      content: content,
      color: color,
      startDate: startDate,
      endDate: endDate,
    };
    return await axios.put(`/api/myPage/myCalendar/update/${calendarId}`, updateObj);
  },

  // 일정 삭제
  calendarDelete: async function (calendarId) {
    return await axios.delete(`/api/myPage/myCalendar/delete/${calendarId}`);
  },
};
export default MyPageApi;