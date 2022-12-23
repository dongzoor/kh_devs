import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import MyPageApi from "../../api/MyPageApi";
import { IoCalendarOutline, IoEyeOutline, IoLocationOutline, IoPersonOutline } from "react-icons/io5";

const CardContainer = styled.div`
  width: 50vw;
  margin: 0 auto;

  & + & {
    margin: 50px auto;
  }
`
const MyStudy = () => {

  const navigate = useNavigate();
  

  // 작성글(스터디 게시판) 조회
  const [studyList, setStudyList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 나의 스터디 캘린더 입력 요소
  const userId = sessionStorage.getItem("userId"); // 로그인 시 세션 스토리지에 userId 넣어둠
  const color = "#ff9494"; // 마이스터디 캘린더 색상 고정(레드)
  
  useEffect(() => {
    const MyStudyData = async () => {
      setLoading(true);
      try {
        console.log("User Id : " + userId);
        // 나의 스터디 조회(작성 및 가입한 스터디)
        const response = await MyPageApi.myStudyList(userId);
        setStudyList(response.data);  
        console.log("나의 스터디 리스트" + response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
  };
  MyStudyData();
  }, []);

  if (loading) {
    return <h2>∘✧₊⁺ 𝑳𝒐𝒅𝒊𝒏𝒈... ⁺₊✧∘</h2>
  }

  // 마이 스터디 캘린더 일정 추가(중복으로 추가되지 않도록!)
  const onClickCalendarAdd = async (title, startDate) => {

    const setStartDate = startDate[0]+"-"+startDate[1]+"-"+startDate[2]

    console.log("======= data 확인 =======")
    console.log("user_id : " + userId);
    console.log("title : " + title);
    console.log("color : " + color);
    console.log("start_date : " + setStartDate);

    const res = await MyPageApi.myStudyAddCalendar(userId, title, color, startDate);
    console.log(res.data);
    if(res.data === true) {
      window.alert("캘린더에 일정이 추가되었습니다!");
      navigate(`/myPage/myCalendar/${userId}`);
    } else {
        if (startDate === "") {
          window.alert("스터디 날짜가 지정되지 않아 등록이 불가능합니다.");
          navigate(`/myPage/myCalendar/${userId}`);
        } else {
          window.alert("일정 등록 실패");
        }
      }
  };

  return (
      <div className="myPageContainer">
       <div className="subTitle">
         <h1>My Study</h1>
       </div>
       <hr className="myPageHr"/>
        {studyList &&
          studyList.map((list) =>
            list.imgUrl ?
              <ul key={list.id}>
                <Link to={`/study/${list.id}`} style={{ "textDecoration": "none" }}>
                  <CardContainer>
                    <div className="card mb-3" style={{ "width": "50vw", "margin": "0 auto", "boxShadow": "0px 0px 24px #5c5696" }}>
                      <div className="row g-0">
                        <div className="col-md-5">
                          <img src={`${list.imgUrl}`} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <h5 className="card-title">{`${list.title}`}</h5>
                            <h6 className="card-subtitle mb-2 text-muted" style={{ "float": "right" }}>{`${list.user.userNickname}`}</h6>
                            <br />
                            <p className="card-text">{`${list.content}`}</p>
                            {list.hashtag &&
                              list.hashtag.map((e) => <Badge bg="info" style={{ "marginRight": "0.5vw" }} > {e} </Badge>)}
                          </div>

                          <div className="icon-box">
                            <IoEyeOutline />
                            <span className="count" style={{ "margin": "0 0.5vw 0 0.1vw" }}>{list.cnt}</span>
                            <IoPersonOutline />
                            <span className="goalPeople" style={{ "margin": "0 0.5vw 0 0.1vw" }}>{list.goalPeople}</span>
                            <IoLocationOutline />
                            <span className="addr" style={{ "margin": "0 0.5vw 0 0.1vw" }}>{list.addr}</span>
                            <IoCalendarOutline />
                            <span className="goalDate" style={{ "margin": "0 0.5vw 0 0.1vw" }}>
                              {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2]}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContainer>
                </Link>
                {/* 캘린더에 일정 추가 버튼 */}
                <div className="calendarAddButton" onClick={onClickCalendarAdd(list.title, list.goalTime)}>
                  <button>일정 등록</button>
                </div>
              </ul>
              :
              <ul key={list.id}>
                <Link to={`/study/${list.id}`} style={{ "textDecoration": "none" }}>
                  <CardContainer>
                    <div className="card" style={{ "width": "40vw", "margin": "0 auto", "boxShadow": "0px 0px 24px #5c5696" }}>
                      <div className="card-body">
                        <h5 className="card-title">{`${list.title}`}
                          <Link to={`/study/${list.studyId}`} />
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted" style={{ "float": "right" }}>{`${list.user.userNickname}`}</h6>
                        <br />
                        <p className="card-text"> {`${list.content}`}</p>
                        {`${list.hashtag}` &&
                          list.hashtag.map((e) => <Badge bg="info" style={{ "marginRight": "0.5vw" }} > {e} </Badge>)}
                        <div className="icon-box">
                          <IoEyeOutline />
                          <span className="count" style={{ "margin": "0 0.5vw 0 0.1vw" }}>{list.cnt}</span>
                          <IoPersonOutline />
                          <span className="goalPeople" style={{ "margin": "0 0.5vw 0 0.1vw" }}>{list.goalPeople}</span>
                          <IoLocationOutline />
                          <span className="addr" style={{ "margin": "0 0.5vw 0 0.1vw" }}>{list.addr}</span>
                          <IoCalendarOutline />
                          <span className="goalDate" style={{ "margin": "0 0.5vw 0 0.1vw" }}>
                            {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2]}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContainer>
                </Link>
                {/* 캘린더에 일정 추가 버튼 */}
                <div className="calendarAddButton" onClick={onClickCalendarAdd(list.title, list.goalTime)}>
                  <button>일정 등록</button>
                </div>
              </ul>
          )}
      </div>
  )
}
export default MyStudy;