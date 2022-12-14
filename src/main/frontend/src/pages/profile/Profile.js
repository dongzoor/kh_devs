import "../profile/Profile.css";

import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Quote from "../quote/Quote";
import React from "react";
import styled from "styled-components";

const Box = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Nanum Gothic", GmarketSansMedium;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  gap: 2rem;
`;

function Profile() {
  return (
    <Box>
      <Container>
        <div className="profile_container">
          <div className="profile-bg"></div>
          <img
            className="profile-img"
            src={
              sessionStorage.getItem("profileImagePath")
                ? sessionStorage.getItem("profileImagePath")
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="프로필 이미지"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="user_container">
          <h2 className="userName">{sessionStorage.getItem("userNickname")}</h2>
          <Link to="/CheckPwd">
            <FaRegEdit size="30" style={{ marginLeft: "5" }} />
          </Link>
        </div>
        <div className="todays_info">
          <h1 className="todays_schedule">오늘은 n개의 일정이 있습니다.</h1>
          <Quote />
        </div>
      </Container>
    </Box>
  );
}
export default Profile;
