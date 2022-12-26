import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import LogoImg from "./image/devs.png";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NAVI = styled.div`
  * {
    font-family: "Gowun Dodum", sans-serif;

    .devs_nav {
      font-size: "bold";
    }
  }
`;
function OffcanvasExample() {
  const userId = sessionStorage.getItem("userId");
  const adminId = localStorage.getItem("adminId");
  const [isLogin, setIslogin] = useState("");
  const [isAdLogin, setIsAdlogin] = useState("");

  // 초기값 설정(세션에 이메일 정보가 있을때)
  useEffect(() => {
    const localinfo = localStorage.getItem("adminEmail");
    const sessioninfo = sessionStorage.getItem("userEmail");
    if (sessioninfo !== null) {
      setIslogin(sessioninfo);
      setIsAdlogin(localinfo);
    }
  }, []);

  const navigate = useNavigate();
  const onClickLogout = (e) => {
    const auth = getAuth();
    signOut(auth);
    sessionStorage.clear();
    // 카카오 로그아웃
    KakaoLogout();
    window.alert("로그아웃 되었습니다.");
  };

  const KakaoLogout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.API.request({
        url: "/v1/user/unlink",
        success: function (response) { },
        fail: function (error) { },
      });
      window.Kakao.Auth.setAccessToken(undefined);
    }
  };

  return (
    <NAVI>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/" className="devs_nav">
            &nbsp;&nbsp;&nbsp;DEVS&nbsp;
              <img
                src={LogoImg}
                alt=""
                style={{ margin: "5px", width: "30px", height: "40px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  &nbsp;DEVS&nbsp;
                  <img
                    src={LogoImg}
                    alt=""
                    style={{ margin: "5px", width: "30px", height: "40px" }}
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {isLogin !== "" && (
                    <Nav.Link href="/" onClick={onClickLogout}>
                      로그아웃
                    </Nav.Link>
                  )}
                  <NavDropdown
                    title="마이페이지"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {isLogin !== "" && (
                      <NavDropdown.Item href="/user/profile">
                        내 프로필
                      </NavDropdown.Item>
                    )}
                    {isLogin !== "" && (
                      <NavDropdown.Item href="/user/check">
                        내 정보 수정
                      </NavDropdown.Item>
                    )}
                    {isLogin !== "" && <NavDropdown.Divider />}
                    {isLogin !== "" ? (
                      <NavDropdown.Item href={`/myPage/myCalendar/${userId}`}>
                        캘린더
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item href={"/"}>캘린더</NavDropdown.Item>
                    )}
                    {isLogin !== "" ? (
                      <NavDropdown.Item href={`/myPage/myStudy/${userId}`}>
                        나의 스터디
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item href={"/"}>
                        나의 스터디
                      </NavDropdown.Item>
                    )}

                    {isLogin !== "" && <NavDropdown.Divider />}
                    {isLogin !== "" && (
                      <NavDropdown.Item href={`/myPage/mySocial/${userId}`}>
                        My DevS
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                  <Nav.Link href="/studies">Study</Nav.Link>
                  <Nav.Link href="/social">Social</Nav.Link>
                  {localStorage.getItem("adminEmail") !== null ? (
                    <Nav.Link href="/AdminMemberList">관리자모드</Nav.Link>
                  ) : (
                    <Nav.Link href="/AdminLogin">관리자모드</Nav.Link>
                  )}
                  <Nav.Link href="/chat">Chat</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </NAVI>
  );
}

export default OffcanvasExample;
