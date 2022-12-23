import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudyApi from "../../lib/api/StudyApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { IoCalendarOutline, IoEyeOutline, IoLocationOutline, IoPersonOutline } from "react-icons/io5";



const Box = styled.div`

  margin: 0;
  padding: 0;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);

  .icon-box {
    display: flex;
    align-items: center;
    float: right;
    align-self: flex-end;
  }

  .col-md-5 {

  }
`;

const WriteBtn = styled.div`
  width: 55px;
  height: 55px;
  box-sizing: border-box;
  border: 1px solid white;
  border-radius: 50%;
  margin-left: 10vw;
  background: white;
  position: absolute;
  top: 10vh;
  left: 20vw;
`

const Frame = styled.div`

  background-color: none;
  width: 90%;
  margin: 40px auto;
  text-align: center;
  position: fixed;
  top: 10vh;
  left: 40vw;

  .custom-btn {
    width: 7vw;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
    7px 7px 20px 0px rgba(0,0,0,.1),
    4px 4px 5px 0px rgba(0,0,0,.1);
    outline: none;
  }
  .btn-6 {
    background: rgb(247,150,192);
  background: radial-gradient(circle, rgba(247,150,192,1) 0%, rgba(118,174,241,1) 100%);
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-6 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .btn-6:before,
  .btn-6:after {
    position: absolute;
    content: "";
    height: 0%;
    width: 1px;
  box-shadow:
    -1px -1px 20px 0px rgba(255,255,255,1),
    -4px -4px 5px 0px rgba(255,255,255,1),
    7px 7px 20px 0px rgba(0,0,0,.4),
    4px 4px 5px 0px rgba(0,0,0,.3);
  }
  .btn-6:before {
    right: 0;
    top: 0;
    transition: all 500ms ease;
  }
  .btn-6:after {
    left: 0;
    bottom: 0;
    transition: all 500ms ease;
  }
  .btn-6:hover{
    background: transparent;
    color: #76aef1;
    box-shadow: none;
  }
  .btn-6:hover:before {
    transition: all 500ms ease;
    height: 100%;
  }
  .btn-6:hover:after {
    transition: all 500ms ease;
    height: 100%;
  }
  .btn-6 span:before,
  .btn-6 span:after {
    position: absolute;
    content: "";
    box-shadow:
    -1px -1px 20px 0px rgba(255,255,255,1),
    -4px -4px 5px 0px rgba(255,255,255,1),
    7px 7px 20px 0px rgba(0,0,0,.4),
    4px 4px 5px 0px rgba(0,0,0,.3);
  }
  .btn-6 span:before {
    left: 0;
    top: 0;
    width: 0%;
    height: .5px;
    transition: all 500ms ease;
  }
  .btn-6 span:after {
    right: 0;
    bottom: 0;
    width: 0%;
    height: .5px;
    transition: all 500ms ease;
  }
  .btn-6 span:hover:before {
    width: 100%;
  }
  .btn-6 span:hover:after {
    width: 100%;
  }
`
const CardContainer = styled.div`
  width: 50vw;
  margin: 0 auto;

  & + & {
    margin: 50px auto;
  }
`

const Study = () => {
  const [studyList, setStudyList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const StudyData = async () => {
      const response = await StudyApi.studyList();
      setStudyList(response.data);
      console.log(response.data);
    }
    StudyData();
  }, []);

  const goToWrite = () => {
    navigate("/study/write")
  }

  return (
    <>
      <Box>
        <div className="input-group rounded" style={{ "width": "30vw", "margin": "50px auto" }}>
          <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <span className="input-group-text border-0" id="search-addon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
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
                              list.hashtag.map((e, index) => <Badge bg="info" key={index} style={{ "marginRight": "0.5vw" }} > {e} </Badge>)}
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
              </ul>
          )}
      </Box>
      {/* <WriteBtn>
        <BsPencil style={{ "fontSize": "3vh", "margin": "10px 0 0 12px" }} />
      </WriteBtn> */}
      <Frame>
        <button className="custom-btn btn-6" onClick={goToWrite}>Write</button>
      </Frame>
    </>
  );
}

export default Study;