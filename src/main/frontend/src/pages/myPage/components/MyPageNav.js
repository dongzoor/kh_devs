// import styled from "styled-components";
// import { Link  } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import '../MyPage.css'

// const Navigation = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-evenly;
//     margin-bottom: 40px;
//     padding: 0 200px;
//      & p {
//         display: inline-block;
//         position: relative;
//         font-size: 1.4em;
//         margin:0;
//         color: #958888;
//             &::after {
//                 position: absolute; 
//                 content:""; 
//                 display: block; 
//                 border-bottom: 3px solid #6f42c1; 
//                 transition: all 250ms ease-out; 
//                 left: 50%;
//                 width: 0;
//             }
//             &:hover::after {
//                 transition: all 250ms ease-out; 
//                 left: 0%; width: 100%;
//             }

//      }
// `

const userId = sessionStorage.getItem("userId")

function MyActivityNav() {

  return(
    <div className="myPageHeader">
      <div className="subTitle">
        <h1>My Dev's</h1>
      </div>
      {/* <Navigation>
        <Link to={`/myPage/myCalender/${userId}`}><p>캘린더</p></Link>
        <Link to={`/myPage/myStudy/${userId}`}><p>가입스터디</p></Link>
        <Link to={`/myPage/mySocial/${userId}`}><p>작성글</p></Link>
        <Link to={`/myPage/myComment/${userId}`}><p>작성댓글</p></Link>
      </Navigation> */}
      <Nav className="mt-5" variant="tabs" >
        <Nav.Item className='mp-tap-1'>
          <Nav.Link className='mp-nv-link' href={`/myPage/myCalendar/${userId}`} eventKey="calendar">캘린더</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='mp-nv-link' href={`/myPage/myStudy/${userId}`} eventKey="myStudy">나의스터디</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='mp-nv-link' href={`/myPage/mySocial/${userId}`} eventKey="mySocial">작성글</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='mp-nv-link' href={`/myPage/myComment/${userId}`} eventKey="myComment">작성댓글</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='mp-nv-link' href={`/myPage/myLike/${userId}`} eventKey="myLike">좋아요</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}
export default MyActivityNav;