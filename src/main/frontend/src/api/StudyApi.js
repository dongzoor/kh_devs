import axios from "axios";

const StudyApi = {

  studyDetail: async function (studyId) {
    return await axios.get("/api/study/" + studyId);
  },

  studyList: async function () {
    return await axios.get("/api/studies");
  },

  studyWrite: async function (userId, title, content,
    imgUrl, hashtags, people, addr, valueDate, applyPeople) {
    const studyObj = {
      userId: userId,
      title: title,
      content: content,
      imgUrl: imgUrl,
      hashtag: hashtags,
      goalPeople: people,
      addr: addr,
      goalTime: valueDate,
      applyPeople: applyPeople,
    }
    return await axios.post("/api/study/write", studyObj)
  },

  studyUpdate: async function (studyId, title, content, imgUrl,
    hashtags, people, addr, valueDate, applyPeople) {
    const studyObj = {
      title: title,
      content: content,
      imgUrl: imgUrl,
      hashtag: hashtags,
      goalPeople: people,
      addr: addr,
      goalTime: valueDate,
      applyPeople: applyPeople,
    }
    return await axios.put("/api/study/edit/" + studyId, studyObj)
  },

  studyDelete: async function (studyId) {
    return await axios.delete("/api/study/" + studyId);
  },

  studyApply: async function (studyId, applyPeoples, applyCnts) {
    const applyObj = {
      applyPeople: applyPeoples,
      applyCnt: applyCnts
    }
    return await axios.put("/api/study/" + studyId, applyObj)
  },

  // [해시태그]
  hashTagSearch: async function (tag) {
    return await axios.get(`/api/studies/hashtag/${tag}`);
  },
  // [제목+내용]
  titleContentSearch: async function (titleContent) {
    return await axios.get(`/api/studies/titleContent/${titleContent}`);
  },
  // [작성자 닉네임]
  userSearch: async function (nickName) {
    return await axios.get(`/api/studies/nickname/${nickName}`);
  },

  // studyUpdateDetail: async function (studyId) {
  //   return await axios.get("/api/study/edit/" + studyId);
  // },
}

export default StudyApi;