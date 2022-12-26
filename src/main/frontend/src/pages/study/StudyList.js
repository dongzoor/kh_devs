import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudyApi from "../../api/StudyApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import {
  IoCalendarOutline,
  IoEyeOutline,
  IoLocationOutline,
  IoPersonOutline,
} from "react-icons/io5";

const Box = styled.div`

  * {
    font-family: "Gowun Dodum", sans-serif;
    a:link,
    a:active {
      text-decoration: none;
      color: black;
    }
  }

  margin: 0;
  padding: 0;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);

  .subtitle {
    text-align: center;
    font-size: 25px;
    padding: 10px;
    margin: 20px;
  }
  .inducer {
    margin-bottom: 10px;
    text-align: center;
    font-family: "Alfa Slab One", cursive;
  }

  .input-group{
    width: 30vw;
    margin: 50px auto
  }

  .icon-box {
    a:active,
    a:hover,
    a:visited {
      text-decoration: none;
      color: black;
    }
    display: flex;
    align-items: center;
    float: right;
    align-self: flex-end;
  }

  .card-container {
    width: 80vw;
    margin: 0 auto;
    box-shadow: 0px 0px 24px #5c5696;
  & + & {
    margin: 50px auto;
  }

}

  .btn-container {

    .frame {
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
        font-family: "Lato", sans-serif;
        font-weight: 500;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
          7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
        outline: none;
      }
      .btn-6 {
        background: rgb(247, 150, 192);
        background: radial-gradient(
          circle,
          rgba(247, 150, 192, 1) 0%,
          rgba(118, 174, 241, 1) 100%
        );
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
        box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
          -4px -4px 5px 0px rgba(255, 255, 255, 1),
          7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
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
      .btn-6:hover {
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
        box-shadow: -1px -1px 20px 0px rgba(255, 255, 255, 1),
          -4px -4px 5px 0px rgba(255, 255, 255, 1),
          7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
      }
      .btn-6 span:before {
        left: 0;
        top: 0;
        width: 0%;
        height: 0.5px;
        transition: all 500ms ease;
      }
      .btn-6 span:after {
        right: 0;
        bottom: 0;
        width: 0%;
        height: 0.5px;
        transition: all 500ms ease;
      }
      .btn-6 span:hover:before {
        width: 100%;
      }
      .btn-6 span:hover:after {
        width: 100%;
      }
    }
  }

  @media (width < 768px) {

    .input-group {
      width: 80vw;
    }
    
    .custom-btn btn-6 {
      width:100px;  
    }

    .btn-container {
    
      .frame {
        top: 30vh;
        
        .custom-btn {
          width: 20vw;
        }
      }
    }


  }

`;

const ListBlock = styled.div`
  overflow-x: hidden;
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
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
    margin: 10px 10px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 1px 3px grey;
    background-color: rgba(3, 0, 209, 0.2);
    font-family: "Gowun Dodum", sans-serif;
    width: 250px;
  }
  .resetBt {
    border-radius: 5px;
    border: 1px solid rgba(3, 0, 209, 0.4);
    height: 40px;
    width: 40px;
    background-color: none;
  }
  .parentBox {
    font-family: "Gowun Dodum", sans-serif;
    max-width: 1024px;
    min-width: 480px;
    padding: 5px;
    border-radius: 10px;
    margin: 0px auto;
    background-color: rgba(255, 255, 255, 0.35);
    min-width: 486px;
  }
  .childBox {
    max-width: 990px;
    min-width: 480px;
    display: flex;
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
      max-width: 760px;
      min-width: 220px;
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
  .childBox-noPic {
    max-width: 990px;
    min-width: 480px;
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
    min-width: 206px;
  }
  .flex-box2 {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  .insertImg {
    height: 90%;
    width: 200px;
    height: 170px;
    border-radius: 5px;
    position: absolute; // = 부모 기준 배치
    /* left: 5px;
    top: 5px; */
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
    width: 750px;
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
    word-break: keep-all;
    margin: 15px 0px;
  }
  .hashtag {
    word-break: keep-all;
    font-size: 0.7em;
    margin: 15px 3px;
    padding: 10px;
    font-style: italic;
    background-color: rgba(219, 219, 219, 0.5);
    border-radius: 10px;
  }

  @media (width < 768px) {
    & {
      display: flex;
      flex-direction: column;
    }
    .parentBox {
      width: 95vw;
      flex-direction: column;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .childBox {
        align-items: center;
        justify-content: center;
        width: 80vw;
        .flex-box2 {
          width: 50vw;
        }
        .insertImg {
          min-height: 170px;
        }
      }
      .childBox-noPic {
        align-items: center;
        justify-content: center;
        width: 80vw;
      }
    }
  }
`;

const Study = () => {
  const [studyList, setStudyList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const StudyData = async () => {
      const response = await StudyApi.studyList();
      setStudyList(response.data);
      console.log(response.data);
    };
    StudyData();
  }, []);

  const goToWrite = () => {
    navigate("/study/write");
  };

  return (
    <>
      <ListBlock>
        <div className="subtitle">Dev' Study</div>
        <div className="inducer"> Share anything you want 👩🏻‍💻✨</div>
        <div className="post-box">
          <button className="postBt" onClick={goToWrite}>
            P O S T
          </button>
        </div>
        <div className="input-group">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        {studyList &&
          studyList.map((list) =>
            list.imgUrl ? (
              <ul key={list.id}>
                <Link
                  to={`/study/${list.id}`}
                >
                  <div className="card-container">
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-5">
                          <img
                            src={`${list.imgUrl}`}
                            className="img-fluid rounded-start"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <h5 className="card-title">{`${list.title}`}</h5>
                            <h6
                              className="card-subtitle mb-2 text-muted"
                              style={{ float: "right" }}
                            >{`${list.user.userNickname}`}</h6>
                            <br />
                            <p className="card-text">{`${list.content}`}</p>
                            {list.hashtag &&
                              list.hashtag.map((e) => (
                                <Badge
                                  bg="info"
                                  style={{ marginRight: "0.5vw" }}
                                >
                                  {" "}
                                  {e}{" "}
                                </Badge>
                              ))}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ul>
            ) : (
              <ul key={list.id}>
                <Link
                  to={`/study/${list.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card-container">
                    <div
                      className="card"
                      style={{
                        width: "40vw",
                        margin: "0 auto",
                        boxShadow: "0px 0px 24px #5c5696",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          {`${list.title}`}
                          <Link to={`/study/${list.studyId}`} />
                        </h5>
                        <h6
                          className="card-subtitle mb-2 text-muted"
                          style={{ float: "right" }}
                        >{`${list.user.userNickname}`}</h6>
                        <br />
                        <p className="card-text"> {`${list.content}`}</p>
                        {`${list.hashtag}` &&
                          list.hashtag.map((e) => (
                            <Badge bg="info" style={{ marginRight: "0.5vw" }}>
                              {" "}
                              {e}{" "}
                            </Badge>
                          ))}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </ul>
            )
          )}

        <div className="btn-container">
          <div className="frame">
            <button className="custom-btn btn-6" onClick={goToWrite}>
              Write
            </button>
          </div>
        </div>
      </ListBlock>
    </>
  );
};

export default Study;
