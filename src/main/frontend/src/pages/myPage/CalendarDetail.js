import './MyPage.css'
import { Link } from 'react-router-dom';

const CalendarDetail = () => {

  const userId = sessionStorage.getItem("userId")

  // 일정 수정
  const onClickUpdate = () => {

  };

  // 일정 삭제
  const onClickDelete = () => {

  };


  return (
    <div className="myPageContainer">
      <div className='calDetailPagecenter'>
        <div className='calendarDetailBox'>
          <div className='calendarDetailPageTitle'>🗓️ 일정 상세페이지</div>
          <div className='backButtonBox'>
          < Link to={`/myPage/myCalendar/${userId}`}  style={{ textDecoration: 'none', color: 'black'}} >
            <div className='backButton'>←</div>
          </Link>
          </div>
          <div>　</div>
          <hr />
          <div className='eventTitle'>제목 출력</div>
          <div className='colorPrint' style={{"backgroundColor":"red"}}></div>
          <hr />
          <div className='eventStartDate'>2022-12-12</div>
          <div className='eventEndDate'>2022-12-12</div>
          <hr />
          <div className='eventContent'>내용 출력</div>
          <hr />
          <div className='calendarDetailPagebuttonBox'>
            {/* 수정, 삭제 버튼 아이콘으로 변경 예정 */}
            <button onClick={onClickUpdate}>수정</button>
            <button onClick={onClickDelete}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CalendarDetail;