import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import MyPageApi from "../../api/MyPageApi";
import { IoCalendarOutline, IoEyeOutline, IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { propTypes } from "react-bootstrap/esm/Image";
import CalendarAddImg from "./images/calendarAdd2.png";


const ListBlock = styled.div`
  overflow-x: hidden;
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-family: "Gowun Dodum", sans-serif;
  }
  a:hover,
  a:visited,
  a:link,
  a:active {
    text-decoration: none;
    color: black;
  }
  .subtitle {
    text-align: center;
    font-size: 25px;
    padding: 10px;
    margin: 20px;
    font-family: "Alfa Slab One", cursive;
  }
  .inducer {
    margin-bottom: 10px;
    text-align: center;
    font-family: "Alfa Slab One", cursive;
  }
  .post-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .postBt {
    width: 10rem;
    height: 40px;
    border: none;
    border-radius: 20px;
    margin: 20px 0;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);
    transition-duration: 0.3s;
    font-family: "Alfa Slab One", cursive;
    &:hover {
      color: white;
      background-color: rgba(190, 100, 255, 0.5);
      box-shadow: 5px 5px 10px rgba(190, 100, 255, 0.2);
      margin-top: 5px;
    }
  }
  .search-type-selector {
    margin: 10px 10px;
    margin-right: 0;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 1px 3px grey;
    background-color: rgba(3, 0, 209, 0.2);
  }
  .search {
    width: 250px;
    margin: 10px 10px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 1px 3px grey;
    background-color: rgba(3, 0, 209, 0.2);
  }
  .resetBt {
    height: 40px;
    width: 40px;
    border-radius: 5px;
    border: 1px solid rgba(3, 0, 209, 0.4);
    background-color: none;
  }
  .parentBox {
    max-width: 1024px;
    min-width: 390px;
    margin: 0px auto;
    padding: 5px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.35);
  }
  .childBox-pic {
    max-width: 990px;
    display: flex;
    justify-content: space-between;
    height: 100%;
    margin: 20px 10px;
    border: 2px solid grey;
    border-radius: 5px;
    background-color: white;
    box-shadow: 2px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition-duration: 0.3s;
    & > * {
      font-size: 20px;
    }
    & > .flex-box2 {
      width: 784px; // ?????? ??????(?????? ????????? ????????? ??????????????? ????????????.)
      max-width: 784px;
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    &:hover {
      color: white;
      background-color: rgba(190, 100, 255, 0.2);
      box-shadow: 5px 5px 10px rgba(190, 100, 255, 0.2);
      cursor: pointer;
      box-shadow: none;
      & > .flex-box1 > img {
        -webkit-transition: 0.4s ease;
        transform: scale(1.3);
        transition: 0.7s ease;
      }
    }
  }
  .childBox-noPic {
    max-width: 990px;
    height: 100%;
    margin: 20px 10px;
    border: 2px solid grey;
    border-radius: 5px;
    background-color: white;
    box-shadow: 2px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition-duration: 0.3s;
    font-size: 20px;
    & > .flex-box2 {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }
    &:hover {
      color: white;
      background-color: rgba(190, 100, 255, 0.2);
      box-shadow: 5px 5px 10px rgba(190, 100, 255, 0.2);
      cursor: pointer;
      box-shadow: none;
      & > .flex-box1 > img {
        -webkit-transition: 0.4s ease;
        transform: scale(1.15);
        transition: 0.6s ease;
      }
    }
  }
  .flex-box1 {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    width: 206px;
    min-width: 100px;
  }
  .insertImg {
    height: 90%;
    width: 90%;
    height: 170px;
    border-radius: 5px;
    position: absolute; // = ?????? ?????? ??????
  }
  .flex-box3 {
    display: flex;
    justify-content: space-between;
    margin: 5px;
  }
  .icon-box {
    display: flex;
    align-items: center;
  }
  .content-title {
    font-weight: 550;
    max-width: 750px;
    min-width: 10px;
    margin: 5px;
  }
  .content-title-noPic {
    margin: 5px;
  }
  .publisher-info {
    display: flex;
    align-items: center;
  }
  .userImage {
    margin: 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .nickName {
    margin: 0 5px;
  }
  .date {
    color: grey;
    margin: 0 5px;
    font-size: 0.8em;
  }
  .count {
    padding: 5px;
  }
  .hashtag-box {
    margin: 5px 0px;
    display: flex;
    flex-wrap: wrap;
    .hashtag {
      font-size: 0.7em;
      margin: 5px 3px;
      padding: 10px;
      font-style: italic;
      background-color: rgba(219, 219, 219, 0.5);
      border-radius: 10px;
      align-items: center;
    }
  }
  .myStudyButton {
    width:40px;
    height:40px;
    margin: 5px;
    text-aline:center;
    border: 1px, solied, grey;
    border-radius: 5px
  }
  .myStudyButton:hover {
    background-color: rgba(129, 14, 237, 0.5);
  }
  
  @media only screen and (max-width: 687px) {
    .flex-box1 {
      flex-wrap: wrap;
    }
    .flex-box2{
      flex-wrap: wrap;
    }
  }
`;


const MyStudy = () => {

  const navigate = useNavigate();
  

  // ?????????(????????? ?????????) ??????
  const [studyList, setStudyList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ?????? ????????? ????????? ?????? ??????
  const userId = sessionStorage.getItem("userId");; // ????????? ??? ?????? ??????????????? userId ?????????
  const nickName = sessionStorage.getItem("userNickname")
  const color = "#ff9494"; // ??????????????? ????????? ?????? ??????(??????)
  
  useEffect(() => {
    const MyStudyData = async () => {
      setLoading(true);
      try {
        // console.log("User Id : " + nickName);
        // ?????? ????????? ??????(?????? ??? ????????? ?????????)
        const response = await MyPageApi.myStudyList(nickName);
        setStudyList(response.data);  
        // console.log("?????? ????????? ?????????", response.data);
      } catch (e) {
        // console.log(e);
      }
      setLoading(false);
  };
  MyStudyData();
  }, []);

  if (loading) {
    return <h2>???????????? ????????????????????????... ????????????</h2>
  }

  // ?????? ????????? ????????? ?????? ??????(???????????? ???????????? ?????????!)
  const onClickCalendarAdd = async (title) => {
    // console.log(title)

    const setStartDate = `${title.startDate[0]}-${title.startDate[1]}-${title.startDate[2]}`;
    // console.log(setStartDate);
    
    // console.log("======= data ?????? =======")
    // console.log("user_id : ", userId);
    // console.log("title : ", title);
    // console.log("color : ", color);
    // console.log("start_date : " + setStartDate);

    const res = await MyPageApi.myStudyAddCalendar(userId, title.title, color, setStartDate);
    // console.log(res.data);
    if(res.data === true) {
      window.alert("???????????? ????????? ?????????????????????!");
      navigate(`/myPage/myCalendar/${userId}`);
    } else {
        if (setStartDate === "") {
          window.alert("????????? ????????? ???????????? ?????? ????????? ??????????????????.");
        } else {
          window.alert("?????? ?????? ??????");
        }
      }
  };

  const onClickLink = (studyId) => {
    // console.log(studyId);
    navigate(`/study/${studyId.studyId}`);
  }

  return (
      <div className="myPageContainer">
       <div className="subTitle">
         <h1>My Study ??????</h1>
       </div>
       <hr className="myPageHr"/>
       <ListBlock>
        <div style={{textAlign: "right", paddingRight: "25px"}}>
          <button tton className="myStudyButton">+</button><span>???????????? ?????? ??????   </span><button className="myStudyButton">???</button><span>????????? ???????????? ??????</span>
        </div>
       {studyList &&
          studyList.map((list, index) =>
            list.imgUrl ? (
              // <Link
              //   to={`/study/${list.id}`}
              //   key={list.id}
              // >
                <div className="childBox-pic">
                  <div className="flex-box1">
                    <img src={list.imgUrl} className="insertImg" alt="" />
                  </div>
                  <div className="flex-box2">
                    <div className="content-title">{list.title}</div>
                    <div className="hashtag-box">
                      {list.hashtag &&
                        list.hashtag.map((e, index) => (
                          <Badge
                            bg="info"
                            style={{ marginRight: "0.5vw" }}
                            key={index}
                          >
                            #{e}{" "}
                          </Badge>
                        ))}
                    </div>
                    <div className="flex-box3">
                      <div className="publisher-info">
                        <img
                          className="userImage"
                          alt="????????? ??????"
                          src={
                            list.user.profileImagePath
                          }
                        />
                        <span className="nickName">{list.user.userNickname}</span>
                        <span className="date">
                          {/* {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2]}`} */}
                        </span>
                      </div>
                      <div className="icon-box">
                        <IoEyeOutline />
                        <span
                          className="count"
                          style={{ margin: "0 0.5vw 0 0.1vw" }}
                        >
                          {list.cnt}
                        </span>
                        <IoPersonOutline />
                        <span
                          className="goalPeople"
                          style={{ margin: "0 0.5vw 0 0.1vw" }}
                        >
                          {list.goalPeople}
                        </span>
                        <IoLocationOutline />
                        <span
                          className="addr"
                          style={{ margin: "0 0.5vw 0 0.1vw" }}
                        >
                          {list.addr}
                        </span>
                        <IoCalendarOutline />
                        <span
                          className="goalDate"
                          style={{ margin: "0 0.5vw 0 0.1vw" }}
                        >
                          {/* {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2]}`} */}
                        </span>
                        <button className="myStudyButton" key={index} title={list.title} startDate={list.goalTime}  onClick={() => onClickCalendarAdd({"title": list.title, "startDate": list.goalTime})}>+</button>
                        <button className="myStudyButton" key={index} studyId={list.id}  onClick={() => onClickLink({"studyId": list.id})}>???</button>
                      </div>
                    </div>
                  </div>
                </div>
              // </Link>
            ) : (
              <Link
                to={`/study/${list.id}`}
                key={list.id}
              >
                <div className="childBox-noPic">
                  <div className="flex-box2">
                    <div className="content-title-noPic">{list.title}</div>
                    <div className="hashtag-box">
                      {list.hashtag &&
                        list.hashtag.map((e, index) => (
                          <Badge
                            bg="info"
                            style={{ marginRight: "0.5vw" }}
                            key={index}
                          >
                            #{e}{" "}
                          </Badge>
                        ))}
                    </div>
                    <div className="flex-box3">
                      <div className="publisher-info">
                        <img
                          className="userImage"
                          alt="????????? ??????"
                          src={
                            list.user.profileImagePath
                          }
                        />
                        <span className="nickName">{list.userNickName}</span>
                        <span className="date">
                          {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2]}`}
                        </span>
                      </div>
                      <div className="icon-box">
                        <IoEyeOutline />
                        <span
                          className="count"
                          style={{ margin: "0 0.5vw 0 0.1vw" }}
                        >
                          {list.cnt}
                        </span>
                        <IoPersonOutline />
                        <span
                          className="goalPeople"
                          style={{ margin: "0 0.5vw 0 0.1vw" }}
                        >
                          {list.goalPeople}
                        </span>
                        <IoLocationOutline />
                        <span
                          className="addr"
                          style={{ margin: "0 0.5vw 0 0.1vw" }}
                        >
                          {list.addr}
                        </span>
                        <IoCalendarOutline />
                        <span
                          className="goalDate"
                          style={{ margin: "0 0.5vw 0 0.1vw" }}
                        >
                          {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2]}`}
                        </span>
                        <button className="myStudyButton" key={index} title={list.title} startDate={list.goalTime} onClick={() => onClickCalendarAdd({"title": list.title, "startDate": list.goalTime})}>+</button>
                        <button className="myStudyButton" key={index} studyId={list.id} onClick={() => onClickLink({"studyId": list.id})}>???</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
          </ListBlock>
      </div>
  )
}
export default MyStudy;