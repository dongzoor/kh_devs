import axios from "axios";

const SocialApi = {
  // 게시글 전체 조회
  socialList: async function () {
    return await axios.get(`/api/social`);
  },
  // 게시글(with 댓글) 상세 조회
  socialDetail: async function (socialId) {
    return await axios.get(`/api/social/${socialId}`);
  },
  // 게시글 작성
  socialWrite: async function (userEmail, title, content, tag, image, imageId) {
    const writeObj = {
      userEmail: userEmail, // 유저 id(PK)
      title: title,
      content: content,
      tag: tag,
      image: image,
      imageId: imageId,
    };
    return await axios.post(`/api/social/write`, writeObj);
  },
  // 게시글 수정
  socialUpdate: async function (socialId, title, content, tag, image, imageId) {
    const updateObj = {
      title: title,
      content: content,
      tag: tag,
      image: image,
      imageId: imageId,
    };
    return await axios.put(`/api/social/${socialId}/update`, updateObj);
  },
  // 게시글 삭제
  socialDelete: async function (socialId) {
    return await axios.delete(`/api/social/${socialId}`);
  },
  // ########################## 댓글 ##########################
  // 댓글 입력
  commentWrite: async function (socialId, userEmail, content) {
    const regCmtObj = {
      socialId: socialId,
      userEmail: userEmail,
      content: content,
    };
    return await axios.post(`/comment/post`, regCmtObj);
  },
  // 댓글 삭제
  commentDelete: async function (commentId) {
    const delCmtObj = {
      commentId: commentId,
    };
    console.log("댓글 번호 : ", commentId, typeof commentId);
    return await axios.post(`/comment/delete`, delCmtObj);
  },
};
export default SocialApi;
