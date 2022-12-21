import { useEffect, useState } from 'react';
import './admin.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Adminheader() {

  const userId = sessionStorage.getItem("userId");
  const [isLogin, setIslogin] = useState("");

  useEffect(() => {
    const sessioninfo = sessionStorage.getItem("userEmail");
    if (sessioninfo !== null) {
      setIslogin(sessioninfo);
    }
  }, []);




  const onClickLogout = (e) => {
    sessionStorage.clear();
    window.alert("로그아웃 되었습니다.");
  };


  return (
    <Navbar id='adminNav' expand="lg">
      <Container>
        <Navbar.Brand href="#home">DEVS 관리페이지&nbsp;<i class="fi fi-rr-home"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/studies">스터디 게시판 보기&nbsp;<i class="fi fi-rr-document"></i></Nav.Link>
            <Nav.Link href="/social">자유 게시판 보기&nbsp;<i class="fi fi-rr-document"></i></Nav.Link>
            <NavDropdown   title="관리도구" id="basic-nav-dropdown" logo>
              <NavDropdown.Item href="/AdminMemberList">회원 관리&nbsp;<i class="fi fi-rr-user"></i> </NavDropdown.Item>
              <NavDropdown.Item href="/AdminBoardList">
                스터디게시판 관리&nbsp;<i class="fi fi-rr-document"></i>
              </NavDropdown.Item>
              <NavDropdown.Item href="/AdminScBoardList">자유게시판 관리&nbsp;<i class="fi fi-rr-document"></i> </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}             
            </NavDropdown>
            {isLogin !== "" && (
                    <Nav.Link href="/" onClick={onClickLogout} style={{float:'left'}}>
                            로그아웃&nbsp;<i class="fi fi-rr-sign-out-alt"></i>
                    </Nav.Link> 
                  )}
          </Nav>
     
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Adminheader;