import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SocialApi from "../../api/SocialApi";
import {
  IoEyeOutline,
  IoHeartOutline,
  IoChatboxOutline,
} from "react-icons/io5";

const ListBlock = styled.div`
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
  .parentBox {
    font-family: "Yeon Sung", cursive;
    font-family: "Song Myung", serif;
    width: 1024px;
    padding: 5px;
    border-radius: 10px;
    margin: 0px auto;
    background-color: rgba(255, 255, 255, 0.35);
  }
  .childBox {
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
  .flex-box2 {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  .flex-box1 {
    flex-grow: 1.5;
    overflow: hidden;
    position: relative;
  }
  .insertImg {
    height: 90%;
    width: 100%;
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
    margin: 5px;
    /* border: 1px solid grey; */
    width: 750px;
  }
  .hashtag {
    padding: 10px;
    font-style: italic;
  }
  .publisher-info {
    display: flex;
    align-items: center;
  }
  .photos {
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
  }
  .count {
    padding: 5px;
  }
  .hashtag-box {
    margin: 10px;
  }
  .hashtag {
    margin: 0px 3px;
    padding: 8px;
    font-style: italic;
    background-color: rgba(219, 219, 219, 0.5);
    border-radius: 10px;
  }
  .postBt {
    width: 10rem;
    height: 40px;
    margin: 0px auto;
    border: none;
    border-radius: 20px;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);
    transition-duration: 0.3s;
    font-family: "Alfa Slab One", cursive;
    &:hover {
      color: white;
      background-color: rgba(190, 100, 255, 0.5);
      box-shadow: 5px 5px 10px rgba(190, 100, 255, 0.2);
      left: 5px;
      margin-top: 5px;
      box-shadow: none;
    }
  }
`;

const Social = () => {
  const [socialList, setSocialList] = useState("");
  const [loading, setLoading] = useState(false);
  // const [userImageUrl, setUserImageUrl] = useState("");

  useEffect(() => {
    const socialData = async () => {
      setLoading(true);
      try {
        const response = await SocialApi.socialList();
        setSocialList(response.data);
        console.log("★ Social List ", response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    socialData();
  }, []);

  if (loading) {
    return <ListBlock>조금만 기다려주세요...👩‍💻</ListBlock>;
  }
  return (
    <ListBlock>
      <div className="subtitle">Dev' Social</div>
      <div className="inducer"> Share anything you want 👩🏻‍💻✨</div>
      <div className="parentBox">
        <Link to="/social/write">
          <button className="postBt">P O S T</button>
        </Link>
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
                      <span className="hashtag">{social.tag}</span>
                    </div>
                    <div className="flex-box3">
                      <div className="publisher-info">
                        <img
                          className="photos"
                          alt="프로필 사진"
                          src={
                            social.userImageUrl
                              ? social.userImageUrl
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                        <span className="nickName">{social.user}</span>
                        <span className="date">| {social.postDate}</span>
                      </div>
                      <div className="icon-box">
                        <IoEyeOutline />
                        <span className="count">{social.view}</span>
                        <IoHeartOutline />
                        <span className="count">{social.like}</span>
                        <IoChatboxOutline />
                        <span className="count">{social.comment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <Link to={`/social/${social.socialId}`} key={social.socialId}>
                <div className="childBox-noPic">
                  <div className="flex-box2">
                    <div className="content-title">{social.title}</div>
                    <div className="hashtag-box">
                      <span className="hashtag">{social.tag}</span>
                    </div>
                    <div className="flex-box3">
                      <div className="publisher-info">
                        <img
                          className="photos"
                          alt="프로필 사진"
                          src={
                            social.userImageUrl
                              ? social.userImageUrl
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                        <span className="nickName">{social.user}</span>
                        <span className="date">| {social.postDate}</span>
                      </div>
                      <div className="icon-box">
                        <IoEyeOutline />
                        <span className="count">{social.view}</span>
                        <IoHeartOutline />
                        <span className="count">{social.like}</span>
                        <IoChatboxOutline />
                        <span className="count">{social.comment}</span>
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
