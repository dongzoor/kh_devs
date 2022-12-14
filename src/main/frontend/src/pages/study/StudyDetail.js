import styled from "styled-components";
import StudyApi from "../../lib/api/StudyApi";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChatApi from "../../lib/api/ChatApi";
import UserApi from "../../api/UserApi";
import Button from 'react-bootstrap/Button';
import { async } from "@firebase/util";


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
  // const [userId, SetUserId] = useState("");
  const userId = "로그인한 회원 Id";
  const userNickname = sessionStorage.getItem("userNickname");

  useEffect(() => {
    const StudyData = async () => {
      try {
        const response = await StudyApi.studyUpdateDetail(parseInt(params));
        // const SetUserId = await UserApi.~~~//api로 정보 가져와야함
        setStudyDetail(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    StudyData();
  }, []);

  const chatTest = async () => {
    try {
      const res = await ChatApi.chatRoomOpen(params);
      console.log(res.data);
      window.localStorage.setItem("chatRoomId", res.data);
      window.location.replace("/Socket");
    } catch {
      console.log("error");
    }
  }
  const goToUpdate = () => {
    // <Link to={`/study/${parseInt(params)}`} style={{ "textDecoration": "none" }}></Link>
    window.location.replace(`/study/edit/${parseInt(params)}`)
  }

  return (
    <>
      {studyDetail &&
        <div className="card" style={{ "width": "50vw", "margin": "0 auto", "marginTop": "5vh", "padding": "5px", "boxShadow": "0px 0px 24px #5c5696" }}>
          <img src={`${studyDetail.imgUrl}`} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{`${studyDetail.title}`}</h5>
            <h6 className="card-subtitle mb2 text-muted" style={{ "float": "right" }}>{`${studyDetail.writer}`}</h6>
            <br />
            <p className="card-text">{`${studyDetail.content}`}</p>
          </div>
          <div>
            <Button variant="light" style={{ "width": "10vw", "float": "right" }} onClick={chatTest}>채팅</Button>
            {studyDetail.writer === userNickname &&
              <Button variant="light" style={{ "width": "10vw", "float": "right" }} onClick={goToUpdate}>수정</Button>
            }
          </div>
        </div>
      }
    </>
  )
}

export default StudyDetail;