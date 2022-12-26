import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudyApi from "../../api/StudyApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import {
  IoCalendarOutline,
  IoChatboxOutline,
  IoEyeOutline,
  IoLocationOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { RxReset } from "react-icons/rx";

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
    min-width: 380px;
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
      width: 784px; // 필수 지정(하지 않으면 길이가 기본적으로 줄어든다.)
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
    position: absolute; // = 부모 기준 배치
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
    }
  }

  @media only screen and (max-width: 687px) {

    @media (width < 450px) {
      * {
        font-size: 15px;
      }
      .date{
        display: none;
      }
  
    }
    .flex-box1 {
      flex-wrap: wrap;
    }
    .flex-box2{
      flex-wrap: wrap;
    }
  }
`;

const Study = () => {
  const [studyList, setStudyList] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [reset, setReset] = useState(false);
  const [typeSelect, setTypeSelect] = useState("one");


  useEffect(() => {
    const StudyData = async () => {
      setLoading(true);
      try {
        const response = await StudyApi.studyList();
        setStudyList(response.data);
        // console.log(response.data);
        setReset(false);
        setTypeSelect("one");
      } catch (e) {
        // console.log(e);
      }
      setLoading(false);
    };
    StudyData();
  }, [reset]);


  const searchTag = async (e) => {
    if (e.key === "Enter") {
      const {
        target: { value },
      } = e;
      if (value === "") {
        alert("검색어가 없습니다. 다시 입력해주세요.");
      } else {
        if (typeSelect === "one") {
          // [제목+내용] 검색
          // console.log("[제목+내용] 검색");
          // console.log(value);
          const res = await StudyApi.titleContentSearch(value);
          setStudyList(res.data);
          // console.log(res.data);
        } else if (typeSelect === "two") {
          // [해시태그] 검색
          // console.log("[해시태그] 검색");
          // console.log(value);
          const res = await StudyApi.hashTagSearch(value);
          setStudyList(res.data);
          // console.log(res.data);
        }
        //  else {
        //   // [작성자 닉네임] 기준 검색
        //   console.log("[작성자 닉네임] 검색");
        //   const res = await StudyApi.userSearch(value);
        //   setStudyList(res.data);
        // }
      }
    }
  };

  // 검색 초기화 버튼
  const onClickReset = () => {
    setReset(true);
  };

  const goToWrite = () => {
    navigate("/study/write");
  };

  const onSelectType = (e) => {
    setTypeSelect(e.target.value);
    console.log(e.target.value);
  };

  if (loading) {
    return <ListBlock>조금만 기다려주세요...👩‍💻</ListBlock>;
  }

  return (
    <ListBlock>
      <div className="subtitle">Dev' Study</div>
      <div className="inducer"> Recruit Member 👩🏻‍💻✨</div>
      <div className="post-box">
        <button className="postBt" onClick={goToWrite}>
          P O S T
        </button>
      </div>
      <div className="parentBox">
        <div className="search-box">
          <select className="search-type-selector" onChange={onSelectType}>
            <option value="one" defaultChecked>
              제목+내용
            </option>
            <option value="two">해시태그</option>
            {/* <option value="three">닉네임</option> */}
          </select>
          <input
            type="text"
            placeholder="🔎 검색어를 입력해주세요!"
            className="search"
            onKeyPress={searchTag}
          />
          <button className="resetBt" onClick={onClickReset}>
            <RxReset size="25px" color="rgba(3, 0, 209, 0.4)" />
          </button>
        </div>
        {studyList &&
          studyList.map((list) =>
            list.imgUrl ? (
              <Link
                to={`/study/${list.id}`}
                key={list.id}
              >
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
                          alt="프로필 사진"
                          src={
                            list.user.profileImagePath
                          }
                        />
                        <span className="nickName">{list.user.userNickname}</span>
                        <span className="date">
                          {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2] + 1}`}
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
                          {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2] + 1}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
                          alt="프로필 사진"
                          src={
                            list.user.profileImagePath
                          }
                        />
                        <span className="nickName">{list.user.userNickname}</span>
                        <span className="date">
                          {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2] + 1}`}
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
                          {`${list.goalTime[0]}/${list.goalTime[1]}/${list.goalTime[2] + 1}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        {/* 
        <div className="btn-container">
          <div className="frame">
            <button className="custom-btn btn-6" onClick={goToWrite}>
              Write
            </button>
          </div>
        </div> */}
      </div>
    </ListBlock>
  );
};

export default Study;
