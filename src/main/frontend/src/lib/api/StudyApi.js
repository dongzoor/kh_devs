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

  studyApply: async function (studyId, applyPeoples, applyCnts) {
    const applyObj = {
      applyPeople: applyPeoples,
      applyCnt: applyCnts
    }
    return await axios.put("/api/study/" + studyId, applyObj)
  },

  // studyUpdateDetail: async function (studyId) {
  //   return await axios.get("/api/study/edit/" + studyId);
  // },
}

export default StudyApi;