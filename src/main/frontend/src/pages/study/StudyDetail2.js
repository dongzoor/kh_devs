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
  & > * {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  margin: 0px auto;
  /* background-color: rgba(211, 188, 230, 0.25); */
  .subtitle {
    font-family: "Alfa Slab One", cursive;
    text-align: center;
    font-size: 25px;
    padding: 10px;
    margin: 20px;
  }
  .subtitle {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 25px;
    margin: 8px 0px;
  }
  .subtitle::before,
  .subtitle::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
  .parentBox {
    font-family: "Gowun Dodum", sans-serif;
    width: 1024px;
    margin: 0px auto;
    padding: 5px;
    /* border: 1px solid black; */
    background-color: rgba(211, 188, 230, 0.25);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }
  .content-title {
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 25px;
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
  .count {
    padding: 5px;
  }
  .hashtags-box {
    margin: 10px;
  }
  .hashtags {
    margin: 0px 3px;
    padding: 8px;
    font-size: 0.75em;
    font-style: italic;
    background-color: rgba(219, 219, 219);
    background-color: rgba(219, 219, 219, 0.5);
    background-color: rgba(3, 0, 209, 0.2);
    border-radius: 10px;
    box-shadow: 0 1px 3px grey;
  }
  // 첨부 사진 최대 크기 조정
  .preview {
    max-width: 95%;
  }
  // 첨부 사진 가운데 정렬
  .attachedImg {
    display: flex;
    align-items: center;
    justify-content: center;
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
  const userEmail = sessionStorage.getItem("userEmail");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  let isApplied = false;


  useEffect(() => {
    const StudyData = async () => {
      try {
        const response = await StudyApi.studyDetail(parseInt(params));

        // const SetUserId = await UserApi.~~~//api로 정보 가져와야함
        setStudyDetail(response.data);
        setApplyGoalCnt(response.data.goalPeople); // 목표 인원 수
        setApplyPeople(response.data.applyPeople); // 지원자 목록
        console.log(response.data);
        setUserInfo(response.data.user);
        console.log("userInfo", response.data.user);
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
      (e === userId) &&
        (isApplied = true)
    });
    try {
      // 스터디 가입했는지 확인
      if (!isApplied) { // 가입 안했으면,
        applyPeoples = [userId, ...applyPeople];
        applyCnts = applyCnt + 1;
        setApplyPeople([userId, ...applyPeople]) // 지원자 목록에 추가
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
                {/* | {studyDetail.goalTime[0]}-{studyDetail.goalTime[1]}-{studyDetail.goalTime[2]} {studyDetail.goalTime[3]}:
                {studyDetail.goalTime[4]} */}
              </span>
            </div>
            <div className="button-box">
              {/* 게시글 작성자 email = 로그인한 유저 email 이면 출력 */}
              {userEmail !== userInfo.userEmail ?
                (
                  applyPeople.length === studyDetail.goalPeople ?

                    <button className="deleteBt">모집완료</button>
                    :
                    <button className="deleteBt" onClick={applySubmit}>스터디 신청하기</button>
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
          <div className="attachedImg">
            {`${studyDetail.imgUrl}` != null && (
              <img src={studyDetail.imgUrl} className="preview" alt="" />
            )}
          </div>
          <div className="content-text">{studyDetail.content}</div>
          <div className="hashtags-box">
            {studyDetail.hashtag &&
              studyDetail.hashtag.map((e, index) => (
                <Badge bg="info" style={{ marginRight: "0.5vw" }}>
                  #{e}
                </Badge>
              ))}
          </div>
          <hr className="line" />
          <button className="goList" onClick={goToList}>
            GO LIST
          </button>
        </div>
      </div>
    </DetailBox>
  )
};

export default StudyDetail;