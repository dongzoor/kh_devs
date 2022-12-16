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

function MyScheduleNav() {

  const navigate = useNavigate();

  function onClickMyCalendar() {
    navigate("/myPage/myCalendar");
  };

  function onClickMyStudy() {
    navigate("/myPage/myStudy");
  }

  return(
    <div>
      <div className="subTitle">
        <h1>나의 일정</h1>
      </div>
      <Navigation>
        <p onClick={onClickMyCalendar}>캘린더</p>
        <p onClick={onClickMyStudy}>가입한 스터디</p>
      </Navigation>
    </div>
  )
}
export default MyScheduleNav;