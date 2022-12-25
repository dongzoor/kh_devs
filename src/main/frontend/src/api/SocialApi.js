import axios from "axios";

const SocialApi = {
  // ############## 게시글 검색 기능 [검색 기준] ##############
  // [해시태그]
  hashTagSearch: async function (tag) {
    return await axios.get(`/api/social/hashtag/${tag}`);
  },
  // [제목+내용]
  titleContentSearch: async function (titleContent) {
    return await axios.get(`/api/social/titleContent/${titleContent}`);
  },
  // [작성자 닉네임]
  userSearch: async function (nickName) {
    return await axios.get(`/api/social/nickname/${nickName}`);
  },
  // ############## 기본 CRUD ##############
  // 게시글 전체 조회
  socialList: async function () {
    return await axios.get(`/api/socials`);
  },
  // 게시글(with 댓글) 상세 조회
  socialDetail: async function (socialId) {
    return await axios.get(`/api/social/${socialId}`);
  },
  // 게시글 작성
  socialWrite: async function (
    userEmail,
    title,
    content,
    hashtags,
    image,
    imageId
  ) {
    const writeObj = {
      userEmail: userEmail, // 유저 id(PK)
      title: title,
      content: content,
      hashtags: hashtags,
      image: image,
      imageId: imageId,
    };
    return await axios.post(`/api/social/write`, writeObj);
  },
  // 게시글 수정
  socialUpdate: async function (
    socialId,
    title,
    content,
    hashtags,
    image,
    imageId
  ) {
    const updateObj = {
      title: title,
      content: content,
      hashtags: hashtags,
      image: image,
      imageId: imageId,
    };
    return await axios.put(`/api/social/${socialId}/update`, updateObj);
  },
  // 게시글 삭제
  socialDelete: async function (socialId) {
    return await axios.delete(`/api/social/${socialId}`);
  },
  // ############## 댓글 ##############

  // 입력
  commentWrite: async function (socialId, userEmail, content) {
    const regCmtObj = {
      socialId: socialId,
      userEmail: userEmail,
      content: content,
    };
    return await axios.post(`/comment/post`, regCmtObj);
  },
  // 삭제
  commentDelete: async function (commentId) {
    const delCmtObj = {
      commentId: commentId,
    };
    console.log("댓글 번호 : ", commentId, typeof commentId);
    return await axios.post(`/comment/delete`, delCmtObj);
  },
  // ############## 해시태그 ##############
  // 입력
  hashtagWrite: async function (id, tags) {
    return await axios.post(`/hashtag/post/${id}`, JSON.stringify(tags));
  },
  // 삭제
  hashtagDelete: async function (tagId) {
    const delTagObj = {
      tagId: tagId,
    };
    console.log("태그 ID : ", tagId, typeof commentId);
    return await axios.post(`/hashtag/delete`, delTagObj);
  },
};
export default SocialApi;
