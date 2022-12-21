import styled from "styled-components";
import StudyApi from "../../lib/api/StudyApi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserApi from "../../api/UserApi";
import Button from 'react-bootstrap/Button';
import { async } from "@firebase/util";
import { Badge } from "react-bootstrap";
import { IoPersonOutline } from "react-icons/io5";


const DetailContainer = styled.div`
  width: 40vw;
  height: 80vh;
  margin: 0 auto;
  padding: 15px;
  background-color: #FFF;
  border-radius: 25px;
`
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

  let isApplied = false;

  useEffect(() => {
    const StudyData = async () => {
      try {
        const response = await StudyApi.studyDetail(parseInt(params));

        // const SetUserId = await UserApi.~~~//api로 정보 가져와야함
        setStudyDetail(response.data);
        setApplyGoalCnt(response.data.goalPeople); // 목표 인원 수
        setApplyCnt(response.data.applyPeople.length); // 지원자 수 
        setApplyPeople(response.data.applyPeople); // 지원자 목록
        console.log(response.data);

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
    navigate(`/study/edit/${parseInt(params)}`)
  }

  const applySubmit = async () => {  // 스터디 지원
    let applyPeoples;
    let applyCnts;

    applyPeople.map((e) => { (e === userId) && (isApplied = true) });
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

  return (
    <>
      {studyDetail &&
        <div className="card" style={{ "width": "50vw", "margin": "0 auto", "marginTop": "5vh", "padding": "5px", "boxShadow": "0px 0px 24px #5c5696" }}>
          <img src={`${studyDetail.imgUrl}`} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{`${studyDetail.title}`}</h5>
            <h6 className="card-subtitle mb2 text-muted" style={{ "float": "right" }}>{`${studyDetail.user.userNickname}`}</h6>
            <br />
            <p className="card-text">{`${studyDetail.content}`}</p>
            {`${studyDetail.hashtag}` &&
              studyDetail.hashtag.map((e) => <Badge bg="info" style={{ "marginRight": "0.5vw" }} > {e} </Badge>)}
          </div>
          <div>
            <div style={{ "display": "flex", "alignItems": "center", "float": "right" }}>
              {userNickname !== studyDetail.user.userNickname ?
                (
                  studyDetail.applyPeople.length === studyDetail.goalPeople ?
                    <Button variant="light" style={{ "width": "10vw" }}>모집 완료</Button>
                    :
                    <Button variant="light" style={{ "width": "10vw" }} onClick={applySubmit}>스터디 신청하기</Button>
                )
                :
                <Button variant="light" style={{ "width": "10vw" }} onClick={goToUpdate}>수정</Button>
              }
              <Button variant="light" style={{ "width": "10vw" }} onClick={chatTest}>채팅</Button>
            </div>
            <div style={{ "display": "flex", "alignItems": "center", "float": "right", "margin": "0.5vh 1vw 0 0" }}>
              <IoPersonOutline />
              <span className="goalPeople">{`${studyDetail.applyPeople.length}/${studyDetail.goalPeople}`}</span>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default StudyDetail;