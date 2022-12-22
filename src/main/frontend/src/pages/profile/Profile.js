import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Quote from "../quote/Quote";
import React from "react";
import styled from "styled-components";

const Box = styled.div`
  margin: 0;
  padding: 0;
  font-family: "Gowun Dodum";
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
  overflow-x: hidden;
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
  const userId = sessionStorage.getItem;
  // useEffect(() => {
  //   const Data = async () => {
  //     try {
  //       requestPermission()
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   Data();
  // }, []);


  // function requestPermission() {
  //   console.log('Requesting permission...');
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.')}})
  //     };
  return (
    <Box>
      <Container>
        <div className="profile_container">
          <div className="profile-bg"></div>
          <img
            className="profile-img"
            src={
              sessionStorage.getItem("profileImagePath") !== "null"
                ? sessionStorage.getItem("profileImagePath")
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="프로필 이미지"
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              boxShadow: "0px 0px 24px #5c5696",
            }}
          />
        </div>
        <div className="user_container" style={{ display: "flex" }}>
          <h2 className="userName">{sessionStorage.getItem("userNickname")}</h2>
          <Link to="/user/check">
            <FaRegEdit size="30" style={{ marginLeft: "5" }} />
          </Link>
        </div>
        <div className="todays_info" style={{ textAlign: "center" }}>
          <Link to={`/myPage/myCalendar/${userId}`}>
            <label style={{ fontSize: "1.3rem", color: "#6a679e" }}>
              오늘의 일정을 확인하세요.
            </label>
          </Link>
          <Quote />
        </div>
      </Container>
    </Box>
  );
}
export default Profile;
