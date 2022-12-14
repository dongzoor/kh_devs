import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './admin.css'

function Adminheader() {
  return (
    <Navbar id='adminNav' expand="lg" >
      <Container>
        <Navbar.Brand href="#home">DEVS 관리페이지</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">메인화면</Nav.Link>
            <Nav.Link href="#link">게시판보기</Nav.Link>
            <NavDropdown title="관리도구" id="basic-nav-dropdown">
              <NavDropdown.Item href="/AdminMemberList">회원 관리&nbsp;<i class="fi fi-rr-user"></i> </NavDropdown.Item>
              <NavDropdown.Item href="/AdminBoarList">
                스터디게시판 관리&nbsp;<i class="fi fi-rr-document"></i>
              </NavDropdown.Item>
              <NavDropdown.Item href="/AdminScBoarList">자유게시판 관리&nbsp;<i class="fi fi-rr-document"></i> </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Adminheader;