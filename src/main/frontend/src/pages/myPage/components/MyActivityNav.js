import styled from "styled-components";
import '../MyPage.css'
import { useNavigate  } from "react-router-dom";

const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 40px;
    padding: 0 200px;
     & p {
        display: inline-block;
        position: relative;
        font-size: 1.4em;
        margin:0;
        color: #958888;
            &::after {
                position: absolute; 
                content:""; 
                display: block; 
                border-bottom: 3px solid #6f42c1; 
                transition: all 250ms ease-out; 
                left: 50%;
                width: 0;
            }
            &:hover::after {
                transition: all 250ms ease-out; 
                left: 0%; width: 100%;
            }

     }
`

function MyActivityNav() {

  const navigate = useNavigate();

  function onClickMySocial() {
    navigate("/myPage/mySocial");
  };

  function onClickMyComment() {
    navigate("/myPage/myComment");
  }

  function onClickMyLike() {
    navigate("/myPage/myLike");
  }

  function onClickMyHashtag() {
    navigate("/myPage/myHashtag");
  }

  return(
    <div>
      <div className="subTitle">
        <h1>나의 활동</h1>
      </div>
      <Navigation>
        <p onClick={onClickMySocial}>작성글</p>
        <p onClick={onClickMyComment}>작성댓글</p>
        <p onClick={onClickMyLike}>좋아요한 글</p>
        <p onClick={onClickMyHashtag}>관심#글</p>
      </Navigation>
    </div>
  )
}
export default MyActivityNav;