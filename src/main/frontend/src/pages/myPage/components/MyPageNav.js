import { Nav } from 'react-bootstrap'
import '../MyPage.css'

const userId = sessionStorage.getItem("userId")

function MyActivityNav() {

  return(
    <div className="myPageHeader">
      <div className="subTitle">
        <h1>My DevS</h1>
      </div>
      <Nav className="mt-5" variant="tabs" >
        <Nav.Item>
          <Nav.Link className='mp-nv-link' href={`/myPage/mySocial/${userId}`} eventKey="mySocial">작성글</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='mp-nv-link' href={`/myPage/myComment/${userId}`} eventKey="myComment">작성댓글</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link className='mp-nv-link' href={`/myPage/myLike/${userId}`} eventKey="myLike">좋아요</Nav.Link>
        </Nav.Item> */}
      </Nav>
    </div>
  )
}
export default MyActivityNav;