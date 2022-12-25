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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  @media screen and (max-width: 768px) {
    min-height: 70vh;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    min-height: 70vh;
  }
  gap: 2rem;
  .goToSchedule {
    text-shadow: 1px 1px 1px #5c5696;
    &:hover {
      text-shadow: none;
      transform: translateY(5%);
    }
  }
  .linkToMypage_btn {
    background: #fff;
    font-size: 1rem;
    margin-bottom: 30px;
    padding: 16px 20px;
    border-radius: 26px;
    border: 1px solid #d4d3e8;
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    align-items: center;
    width: 100%;
    color: #4c489d;
    box-shadow: 0px 5px 5px #5c5696;
    cursor: pointer;
    transition: 0.2s;
  }
  .linkToMypage_btn:hover {
    opacity: 1;
    border-color: #6a679e;
    background-color: #eceafe;
    box-shadow: 0px 1px 1px #5c5696;
    outline: none;
    cursor: pointer;
    transform: translateY(5%);
  }
`;

function Profile() {
  const userId = sessionStorage.getItem("userId");
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
        <Content>
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
            <h2 className="userName" style={{ fontWeight: "600" }}>
              {sessionStorage.getItem("userNickname")}
            </h2>
            <Link to="/user/check">
              <FaRegEdit size="30" style={{ marginLeft: "5" }} />
            </Link>
          </div>
          <Quote />
          <div className="todays_info" style={{ textAlign: "center" }}>
            <Link
              to={`/myPage/myCalendar/${userId}`}
              style={{ textDecoration: "none" }}
            >
              <button type="button" className="linkToMypage_btn">
                오늘의 일정을 확인하세요!
              </button>
            </Link>
          </div>
        </Content>
      </Container>
    </Box>
  );
}
export default Profile;
