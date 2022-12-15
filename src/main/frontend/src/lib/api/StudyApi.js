import axios from "axios";

const StudyApi = {

  studyDetail: async function (studyId) {
    return await axios.get("/api/study/" + studyId);
  },

  studyList: async function () {
    return await axios.get("/api/studies");
  },

  studyWrite: async function (userNickname, title, content, imgUrl, hashtags) {
    const studyObj = {
      title: title,
      content: content,
      imgUrl: imgUrl,
      writer: userNickname,
      hashtag: hashtags
    }
    return await axios.post("/api/study/write", studyObj)
  },

  studyUpdate: async function (studyId, title, content, imgUrl) {
    const studyObj = {
      title: title,
      content: content,
      imgUrl: imgUrl,
    }
    return await axios.put("/api/study/edit/" + studyId, studyObj)
  },

  // studyUpdateDetail: async function (studyId) {
  //   return await axios.get("/api/study/edit/" + studyId);
  // },
}

export default StudyApi;