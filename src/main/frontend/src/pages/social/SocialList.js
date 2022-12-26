import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SocialApi from "../../api/SocialApi";
import { RxReset } from "react-icons/rx";
import { IoChatboxOutline, IoEyeOutline } from "react-icons/io5";

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
    min-width: 450px;
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
`;

const Social = () => {
  const navigate = useNavigate();
  const [socialList, setSocialList] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputTags, setInputTags] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [reset, setReset] = useState(false);
  const [typeSelect, setTypeSelect] = useState("one");

  const onSelectType = (e) => {
    setTypeSelect(e.target.value);
    console.log(e.target.value);
  };
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
          console.log("[제목+내용] 검색");
          setSearchData(value);
          console.log(value);
          const res = await SocialApi.titleContentSearch(value);
          setSocialList(res.data);
        } else if (typeSelect === "two") {
          // [해시태그] 검색
          console.log("[해시태그] 검색");
          setSearchData(value);
          console.log(value);
          const res = await SocialApi.hashTagSearch(value);
          setSocialList(res.data);
          setInputTags(res.data.hashtag);
        } else {
          // [작성자 닉네임] 기준 검색
          console.log("[작성자 닉네임] 검색");
          setSearchData(value);
          const res = await SocialApi.userSearch(value);
          setSocialList(res.data);
        }
      }
    }
  };
  const goPost = () => {
    navigate("/social/write");
  };
  // 검색 초기화 버튼
  const onClickReset = () => {
    setReset(true);
  };
  useEffect(() => {
    const socialData = async () => {
      setLoading(true);
      try {
        const response = await SocialApi.socialList();
        setSocialList(response.data);
        setInputTags(response.data.hashtag);
        setReset(false);
        setTypeSelect("one");
        console.log("★ Social List ", response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    socialData();
  }, [reset]);

  if (loading) {
    return <ListBlock>조금만 기다려주세요...👩‍💻</ListBlock>;
  }
  return (
    <ListBlock>
      <div className="subtitle">Dev' Social Community</div>
      <div className="inducer"> Share anything you want 👩🏻‍💻✨</div>
      <div className="post-box">
        <button className="postBt" onClick={goPost}>
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
            <option value="three">닉네임</option>
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
        {socialList &&
          socialList.map((social) =>
            social.image ? (
              <Link to={`/social/${social.socialId}`} key={social.socialId}>
                <div className="childBox-pic">
                  <div className="flex-box1">
                    <img src={social.image} className="insertImg" alt="" />
                  </div>
                  <div className="flex-box2">
                    <div className="content-title">{social.title}</div>
                    <div className="hashtag-box">
                      {social.hashtag &&
                        social.hashtag.map((e, index) => (
                          <span className="hashtag" key={index}>
                            #{e}
                          </span>
                        ))}
                    </div>
                    <div className="flex-box3">
                      <div className="publisher-info">
                        <img
                          className="userImage"
                          alt="프로필 사진"
                          src={
                            social.userImageUrl
                              ? social.userImageUrl
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                        <span className="nickName">{social.userNickName}</span>
                        <span className="date">
                          | {social.postDate[0]}-{social.postDate[1]}-
                          {social.postDate[2]}
                        </span>
                      </div>
                      <div className="icon-box">
                        <IoEyeOutline />
                        <span className="count">{social.view}</span>
                        <IoChatboxOutline />
                        <span className="count">{social.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <Link to={`/social/${social.socialId}`} key={social.socialId}>
                <div className="childBox-noPic">
                  <div className="flex-box2">
                    <div className="content-title-noPic">{social.title}</div>
                    <div className="hashtag-box">
                      {social.hashtag &&
                        social.hashtag.map((e, index) => (
                          <span className="hashtag" key={index}>
                            #{e}
                          </span>
                        ))}
                    </div>
                    <div className="flex-box3">
                      <div className="publisher-info">
                        <img
                          className="userImage"
                          alt="프로필 사진"
                          src={
                            social.userImageUrl
                              ? social.userImageUrl
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                        <span className="nickName">{social.userNickName}</span>
                        <span className="date">
                          | {social.postDate[0]}-{social.postDate[1]}-
                          {social.postDate[2]}
                        </span>
                      </div>
                      <div className="icon-box">
                        <IoEyeOutline />
                        <span className="count">{social.view}</span>
                        <IoChatboxOutline />
                        <span className="count">{social.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
      </div>
    </ListBlock>
  );
};

export default Social;
