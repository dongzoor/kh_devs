import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function OffcanvasExample() {
  const userId = sessionStorage.getItem("userId");
  const [userEmail, setUserEmail] = useState("");
  // 초기값 설정
  useEffect(() => {
    const sessioninfo = sessionStorage.getItem("userEmail");
    if (sessioninfo !== null) {
      setUserEmail(sessioninfo);
    }
  }, []);

  const onClickLogout = (e) => {
    window.alert("로그아웃 되었습니다.");
    sessionStorage.clear();
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          className="mb-3"
          style={{ fontFamily: "JEJU" }}
        >
          <Container fluid>
            <Navbar.Brand href="#">DevS</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  DevS
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {userEmail !== "" && (
                    <Nav.Link href="/" onClick={onClickLogout}>
                      로그아웃
                    </Nav.Link>
                  )}
                  <NavDropdown
                    title="마이페이지"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/CheckPwd">
                      내 정보 수정
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href={`/myPage/myCalendar/${userId}`}>
                      캘린더
                    </NavDropdown.Item>
                    <NavDropdown.Item href={`/myPage/myStudy/${userId}`}>
                      나의 스터디
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href={`/myPage/mySocial/${userId}`}>
                      내가 쓴 글
                    </NavDropdown.Item>
                    <NavDropdown.Item href={`/myPage/myComment/${userId}`}>
                      내가 쓴 댓글
                    </NavDropdown.Item>
                    <NavDropdown.Item href={`/myPage/myLike/${userId}`}>
                      내가 좋아요한 글
                    </NavDropdown.Item>
                    <NavDropdown.Item href={`/myPage/myHashtag/${userId}`}>
                      나의 관심 #글
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/studies">스터디</Nav.Link>
                  <Nav.Link href="/social">Social</Nav.Link>
                  <Nav.Link href="/AdminLogin">관리자모드</Nav.Link>
                </Nav>
                <Form className="d-flex" style={{ marginTop: "20px" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
