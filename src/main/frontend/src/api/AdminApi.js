import axios from "axios";
import { useParams } from "react-router-dom";


const HEADER = "application/json";
const WN_DOMAIN = "http://localhost:8211/";
const params = useParams.userId

const AdminApi = {


  // 어드민이 멤버 조회 api
  admemberList: async function () {
    //   const admemCmd = {
    //     cmd: "admemlist"

    //   };
    return await axios.get(WN_DOMAIN + "adUserList", HEADER);
  },

// 어드민 멤버 개별 조회
  admemberDetail: async function (userId) {
    return await axios.get(WN_DOMAIN  + "adUserList/" + userId, HEADER);
  },

  AdUserUpdate: async function ( userid , userNickname, password, phone, profileImage) {
    const updateObj = {
    
      userNickname: userNickname,
      password: password,
      phone: phone,
      profileImage: profileImage,
    };
    return await axios.put(
      WN_DOMAIN + "adUserList/" + userid + "/update",
      updateObj,
      HEADER
    );
  },

  //어드민 로그인
  AdminLogin: async function (id, pwd) {
    const loginObj = {
      adminEmail: id,
      password: pwd,
    };
    return await axios.post(WN_DOMAIN +"adLogin", loginObj, HEADER);
  },

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 어드민이 스터디게시판 전체 조회
  adstudyboardList: async function () {
    return await axios.get(WN_DOMAIN + "adStudies", HEADER);
  },

  // 어드민이 소셜게시판 전체 조회
  adSocialboardList: async function () {
    return await axios.get(WN_DOMAIN + "adSocialList", HEADER);
  },

 // 어드민이 스터디 게시판 삭제
 deleteStudyBoard: async function (study_id) {  
  console.log("소셜아이디 : " + study_id)
  return await axios.delete(
    WN_DOMAIN + "deleteAdStudy/" + study_id , HEADER);
},
//
// 어드민이 소셜게시판 별개 조회
  socialDetail: async function (social_Id) {
    return await axios.get(WN_DOMAIN + "social/" + social_Id, HEADER);
  },

// 어드민이 소셜게시판 삭제
  socialAdDelete: async function (socialId) {
    console.log("소셜아이디 : " + socialId);
    return await axios.delete(WN_DOMAIN + "adSocialList/" + socialId, HEADER);  
  },
  // socialAdDelete: async function (socialId) {
  //   console.log("소셜아이디 : " + socialId);
  //   return await axios.delete(WN_DOMAIN + "SocialList/" + socialId, HEADER);  
  // },


  socialUpdate: async function (socialId, title, content, tag, image) {
    const updateObj = {
      title: title,
      content: content,
      tag: tag,
      // image: image, // firebase 성공하면
    };
    return await axios.put(
      WN_DOMAIN + "adSocialList/" + socialId + "/update",
      updateObj,
      HEADER
    );
  },


  // 어드민이 멤버삭제
  deleteAdmem: async function () {
    return await axios.delete(
      WN_DOMAIN + "Delete", HEADER);
  },



};
export default AdminApi;