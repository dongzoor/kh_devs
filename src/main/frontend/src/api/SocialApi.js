import axios from "axios";

const DOMAIN = "http://localhost:8211/";
const HEADER = "application/json";

const SocialApi = {
  // 게시글 전체 조회
  socialList: async function () {
    return await axios.get(DOMAIN + "social", HEADER);
  },
  // 게시글 상세 조회
  socialDetail: async function (socialId) {
    return await axios.get(DOMAIN + "social/" + socialId, HEADER);
  },
  // 게시글 작성
  socialWrite: async function (user, title, content, tag, image, imageId) {
    const writeObj = {
      userid: user, // 유저 id(PK)
      title: title,
      content: content,
      tag: tag,
      image: image,
      imageId: imageId,
    };
    return await axios.post(DOMAIN + "social/write", writeObj, HEADER);
  },
  // 게시글 수정
  socialUpdate: async function (socialId, title, content, tag, image, imageId) {
    const updateObj = {
      title: title,
      content: content,
      tag: tag,
      image: image,
      imageId: imageId
    };
    return await axios.put(
      DOMAIN + "social/" + socialId + "/update",
      updateObj,
      HEADER
    );
  },

  // 게시글 삭제
  socialDelete: async function (socialId) {
    return await axios.delete(DOMAIN + "social/" + socialId, HEADER);
  },

  // 댓글 조회 api
  commentList: async function (socialId) {
    return await axios.get(DOMAIN + "social/" + socialId, HEADER);
  },
  // 댓글 입력 api
  insertComment: async function (id, content, boardId) {
    console.log(
      "아이디 : " + id + "댓글 내용 : " + content + "게시판 번호 : " + boardId
    );
    const regObj = {
      id: id,
      content: content,
      boardId: boardId,
    };
    return await axios.post(DOMAIN + "regcomment", regObj, HEADER);
  },
  // 댓글 삭제 api
  deleteComment: async function (postId) {
    console.log("댓글 번호 : " + postId);
    const deleteObj = {
      postId: String(postId),
    };
    return await axios.post(DOMAIN + "deleteComment", deleteObj, HEADER);
  },
};

export default SocialApi;
