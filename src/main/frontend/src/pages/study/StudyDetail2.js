import styled from "styled-components";
import StudyApi from "../../api/StudyApi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserApi from "../../api/UserApi";
import Button from 'react-bootstrap/Button';
import { async } from "@firebase/util";
import { Badge } from "react-bootstrap";
import { IoPersonOutline } from "react-icons/io5";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "../../api/fbase";

const DetailBox = styled.div`
  overflow-x: hidden;
  & > * {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  .subtitle {
    margin: 20px 0px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-basis: 100%;
    font-size: 25px;
    color: rgba(0, 0, 0, 0.35);
    font-family: "Alfa Slab One", cursive;
  }
  .subtitle::before,
  .subtitle::after {
    content: "";
    height: 1px;
    margin: 0px 16px;
    line-height: 0px;
    flex-grow: 1;
    font-size: 0px;
    background: rgba(0, 0, 0, 0.35);
  }
  .parentBox {
    max-width: 1024px;
    min-width: 300px;
    margin: 0px auto;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    font-family: "Gowun Dodum", sans-serif;
    background-color: rgba(211, 188, 230, 0.25);
  }
  .content-title {
    margin: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 25px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  hr {
    width: 98%;
    height: 3px;
    border: 0;
    background-color: rgba(209, 209, 209);
  }
  .content-text {
    padding: 10px;
    // text 개행 처리 !
    white-space: pre-wrap;
  }
  .post-info {
    display: flex;
    justify-content: space-between;
    margin: 15px 5px;
  }
  .publisher-info {
    display: flex;
    align-items: center;
  }
  .button-box {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  .userImage {
    margin: 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .date {
    color: grey;
    margin: 0 5px;
    font-size: 0.8em;
  }
  // 첨부 사진 최대 크기 조정
  .attachedImg {
    max-width: 90%;
  }
  // 첨부 사진 가운데 정렬
  .attachedImg-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hashtags-box {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    .hashtags {
      margin: 5px 3px;
      padding: 8px;
      font-size: 0.75em;
      font-style: italic;
      background-color: rgba(3, 0, 209, 0.2);
      border-radius: 10px;
      box-shadow: 0 1px 3px grey;
    }
  }
  .goList {
    float: right;
    margin: 20px;
    padding: 10px;
    border-radius: 50px;
    border-color: #8e44ad;
    border-radius: 0;
    color: #8e44ad;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 150ms ease-in-out;
    &:after {
      content: "";
      position: absolute;
      display: block;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 100%;
      background: #8e44ad;
      z-index: -1;
      transition: width 150ms ease-in-out;
    }
    &:hover {
      color: #fff;
      &:after {
        width: 110%;
      }
    }
  }
  .deleteBt,
  .updateBt {
    border: 0;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);
    transition-duration: 0.5s;
    &:hover {
      color: white;
      background-color: rgba(190, 100, 255, 0.5);
      box-shadow: 5px 5px 10px rgba(190, 100, 255, 0.2);
      box-shadow: none;
    }
  }
  .doneBt {
    border: 0;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);
    background-color: grey;
  }

  .bottom-container {
    
    justify-content: center;
    height: 100px;
    .apply-member {
      
    }
  }
`;

const StudyDetail = () => {
  const params = useParams().studyId;
  const [studyDetail, setStudyDetail] = useState("");
  const [applyPeople, setApplyPeople] = useState([]);
  const [applyGoalCnt, setApplyGoalCnt] = useState("");
  const [applyCnt, setApplyCnt] = useState("");
  // const [userId, SetUserId] = useState("");
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId")
  const userNickname = sessionStorage.getItem("userNickname");
  const userEmail = sessionStorage.getItem("userEmail");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [postDate, setPostDate] = useState("");


  let isApplied = false;


  useEffect(() => {
    const StudyData = async () => {
      try {
        const response = await StudyApi.studyDetail(parseInt(params));

        // const SetUserId = await UserApi.~~~//api로 정보 가져와야함
        setStudyDetail(response.data);
        setApplyGoalCnt(response.data.goalPeople); // 목표 인원 수
        setApplyPeople(response.data.applyPeople); // 지원자 목록
        // console.log(response.data);
        setUserInfo(response.data.user);
        setPostDate(response.data.regTime);
        // console.log("userInfo", response.data.user);
      } catch (e) {
        console.log(e);
      }
    };
    StudyData();
  }, []);

  const chatTest = async () => {
    navigate("/chat");
  }
  const goToUpdate = () => {
    // <Link to={`/study/${parseInt(params)}`} style={{ "textDecoration": "none" }}></Link>
    navigate(`/study/${parseInt(params)}/update`)
  }
  const goToList = () => {
    navigate("/studies");
  };

  const applySubmit = async () => {  // 스터디 지원
    let applyPeoples;
    let applyCnts;

    applyPeople.map((e, index) => {
      (e === userNickname) &&
        (isApplied = true)
    });
    try {
      // 스터디 가입했는지 확인
      if (!isApplied) { // 가입 안했으면,
        applyPeoples = [userNickname, ...applyPeople];
        applyCnts = applyCnt + 1;
        setApplyPeople([userNickname, ...applyPeople]) // 지원자 목록에 추가
        window.alert("스터디에 지원했습니다.")
        setApplyCnt(applyCnt + 1);  // 지원자 수 1 증가 
        const res = await StudyApi.studyApply(parseInt(params), applyPeoples, applyCnts);
      }
      else window.alert("이미 지원했습니다.");
      // console.log(`지원자 목록: ${applyPeoples} // 지원자 수 : ${applyCnts} // studyId: ${parseInt(params)}`);
    } catch {
      console.log("error");
    }
    navigate(`/studies`);
  }

  const onClickDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      if (true) {
        const res = await StudyApi.studyDelete(parseInt(params));
        // const imageId = studyDetail.imgUrl;
        // // 기존 이미지가 존재하면 삭제(이미지 ID로 확인)
        // if (imageId !== "null") {
        //   // 이미지없는 게시글 삭제 에러 수정 완료
        //   // 파이어베이스 상 파일주소 지정
        //   const attachmentRef = ref(storageService, `/STUDY/${imageId}`);
        //   // 참조경로로 firebase 이미지 삭제
        //   await deleteObject(attachmentRef)
        //     .then(() => {
        //       console.log("Firebase File deleted successfully !");
        //     })
        //     .catch((error) => {
        //       console.log("Uh-oh, File Delete error occurred!");
        //     });
        // 
        navigate(`/studies`);
        alert("게시글 삭제 완료 !");
        // } else {
        //   alert("게시글 삭제 실패 ㅜ");
        //   console.log(res.data.result);
      } else {
        alert("게시글 삭제 실패 ㅜ");
        return;
      }
    }
  };

  return (
    <DetailBox>
      <div className="subtitle">Board Detail Page</div>
      <div className="parentBox">
        <div key={studyDetail.id}>
          <div className="content-title">{studyDetail.title}</div>
          <div className="post-info">
            <div className="publisher-info">
              <img
                className="userImage"
                alt="프로필 사진"
                src={
                  userInfo.profileImagePath
                }
              ></img>
              <span className="nickName">
                {userInfo.userNickname}
              </span>
              <span className="date">
                | {postDate[0]}-{postDate[1]}-{postDate[2] + 1} {postDate[3]}:
                {postDate[4]}
              </span>
            </div>
            <div className="button-box">
              {userEmail !== userInfo.userEmail ?
                (
                  applyPeople.length === studyDetail.goalPeople ?

                    <button className="doneBt">모집완료</button>
                    :
                    <button className="deleteBt" onClick={applySubmit}>신청하기</button>
                )
                :
                <>
                  <button className="updateBt" onClick={onClickDelete}>삭제</button>
                  <button className="updateBt" onClick={goToUpdate}>수정</button>
                </>
              }
              <button className="deleteBt" onClick={chatTest}>채팅</button>
            </div>
          </div>
          <div className="attachedImg-box">
            {`${studyDetail.imgUrl}` != null && (
              <img src={studyDetail.imgUrl} className="attachedImg" alt="" />
            )}
          </div>
          <div className="content-text">{studyDetail.content}</div>
          <div className="hashtags-box">
            {studyDetail.hashtag &&
              studyDetail.hashtag.map((e, index) => (
                <Badge bg="info" style={{ marginRight: "0.5vw" }} key={index}>
                  #{e}
                </Badge>
              ))}
          </div>
          <hr className="line" />
          <div className="bottom-container">
            {userEmail !== userInfo.userEmail ?
              <div className="apply-member">
                <IoPersonOutline />
                {`${applyPeople.length}/${applyGoalCnt}`}
              </div>
              :
              <div className="apply-member">
                {applyPeople.map((e, index) =>
                  <span key={index}>
                    <IoPersonOutline />
                    {`${e}  `}
                  </span>
                )}
              </div>
            }
            <button className="goList" onClick={goToList}>
              GO LIST
            </button>
          </div>
        </div>
      </div>
    </DetailBox>
  )
};

export default StudyDetail;