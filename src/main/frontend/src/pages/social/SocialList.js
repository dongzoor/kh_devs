import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SocialApi from "../../api/SocialApi";
import { RxReset } from "react-icons/rx";
import { GrPowerReset } from "react-icons/gr";
import {
  IoChatboxOutline,
  IoEyeOutline,
  IoHeartOutline,
} from "react-icons/io5";

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
    /* width: 100%; */
    width: 200px;
    border-radius: 10px;
    position: absolute; // = 부모 기준 배치
    left: 5px;
    top: 5px;
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
    margin: 0px 3px;
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
      }
      .childBox-noPic {
        align-items: center;
        justify-content: center;
        width: 80vw;
      }
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

  // const [userImageUrl, setUserImageUrl] = useState("");
  const searchTag = async (e) => {
    if (e.key === "Enter") {
      const {
        target: { value },
      } = e;
      if (value === "") {
        alert("검색어가 없습니다. 다시 입력해주세요.");
      } else {
        setSearchData(value);
        // console.log(value);
        const res = await SocialApi.hashTagSearch(value);
        setSocialList(res.data);
        setInputTags(res.data.hashtag);
      }
    }
  };
  const goPost = () => {
    navigate("/social/write");
  };
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
          <input
            type="text"
            placeholder="🔎 검색어를 입력해주세요!"
            className="search"
            onKeyPress={searchTag}
          />
          <button className="resetBt" onClick={onClickReset}>
            <RxReset size="25px" color="rgba(3, 0, 209, 0.4)"/>
          </button>
        </div>
        {socialList &&
          socialList.map((social) =>
            social.image ? (
              <Link to={`/social/${social.socialId}`} key={social.socialId}>
                <div className="childBox">
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
                        <IoHeartOutline />
                        <span className="count">{social.like}</span>
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
                        <IoHeartOutline />
                        <span className="count">{social.like}</span>
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
