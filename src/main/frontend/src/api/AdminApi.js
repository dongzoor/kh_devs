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
    //   "/api/adUserList"
    return await axios.get("/api/adUserList");
  },

// 어드민 멤버 개별 조회
  admemberDetail: async function (userId) {
    return await axios.get("/api/adUserList/" + userId);
  },
// 어드민 유저멤버 수정 
// 
  AdUserUpdate: async function ( userid , userNickname, password, phone, profileImage) {
    const updateObj = {
    
      userNickname: userNickname,
      password: password,
      phone: phone,
      profileImage: profileImage,
      // ImgId:ImgId
    };
    return await axios.put(
    "/api/adUserList/" + userid + "/update",
      updateObj

    );
  },

  //어드민 로그인
  AdminLogin: async function (id, pwd) {
    const loginObj = {
      adminEmail: id,
      password: pwd,
    };
    return await axios.post("/api/adLogin", loginObj);
  },

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 어드민이 스터디게시판 전체 조회
  adstudyboardList: async function () {
    return await axios.get("/api/adStudies");
  },

  // 어드민이 소셜게시판 전체 조회
  adSocialboardList: async function () {
    return await axios.get("/api/adSocialList");
  },

 // 어드민이 스터디 게시판 삭제
 deleteStudyBoard: async function (study_id) {  
  console.log("소셜아이디 : " + study_id)
  return await axios.delete(
   "/api/deleteAdStudy/" + study_id);
},
//
// 어드민이 소셜게시판 별개 조회
  socialDetail: async function (social_Id) {
    return await axios.get("/api/social/" + social_Id);
  },

// 어드민이 소셜게시판 삭제
  socialAdDelete: async function (socialId) {
    console.log("소셜아이디 : " + socialId);
    return await axios.delete("/api/adSocialList/" + socialId);  
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
      "/api/adSocialList/" + socialId + "/update",
      updateObj
      
    );
  },


  // 어드민이 멤버삭제
  admemberdelete: async function (userId) {
    console.log("유저아이디 : " + userId);
    return await axios.delete( "/api/User/" + userId);
  },



};
export default AdminApi;