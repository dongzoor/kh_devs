import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyPageApi from '../../api/MyPageApi';
import { useNavigate } from 'react-router-dom';
import './MyPage.css'

const CalendarDetail = () => {

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const calendarId = sessionStorage.getItem("calendar_id");
  const calendarTitle = sessionStorage.getItem("event_title");
  const calendarContent = sessionStorage.getItem("calendar_content");
  const calendarColor = sessionStorage.getItem("calendar_color");
  const calendarStartDate = sessionStorage.getItem("calendar_startDate");
  const calendarEndDate = sessionStorage.getItem("calendar_endDate");

  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const eventData = async () => {
        setLoading(true);
        try {
          const response = await MyPageApi.eventId(calendarTitle);
          console.log("캘린더 이벤트 data : ",response.data[0])
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
    };
    eventData();
  }, []);

  if (loading) {
    return <h2>∘✧₊⁺ 𝑳𝒐𝒅𝒊𝒏𝒈... ⁺₊✧∘</h2>
  }

  // 일정 수정(수정 페이지로 이동)
  const onClickUpdate = async () => {
    console.log("수정 버튼 클릭" + calendarId);
    navigate(`/myPage/myCalendar/update/${calendarId}`);

  };

  // 일정 삭제
  const onClickDelete = async () => {
    console.log("삭제 버튼 클릭" + calendarId);

    if(window.confirm("삭제하시겠습니까?") === true ) {
      const response = await MyPageApi.calendarDelete(calendarId);
      console.log(response.data.result);

      if (response.data.result === "OK") {
        console.log("삭제 완료");
        alert("삭제가 완료되었습니다.")
        setLoading(true);
        navigate(`/myPage/myCalendar/${userId}`);
      } else {
        console.log("삭제 실패");
        alert("삭제가 실패하였습니다.")
        console.log(response.data.result);
        setLoading(false);
      }
    } else {
      return false;
    }
  };

  return (
    <div className="eventAddPageContainer">
      <div className='calendarAdd'>
          <div className='calendarDetailPageTitle'>🗓️ 상세 일정</div>
          <div className='backButtonBox'>
          < Link to={`/myPage/myCalendar/${userId}`}  style={{ textDecoration: 'none', color: 'black'}} >
            <button className="backButton">←</button>
          </Link>
          </div>
          <div>　</div>
          <hr />
            <div className='eventTitle'>{calendarTitle}</div>
            <div className='colorPrint' style={{"backgroundColor":{calendarColor}}}></div>
            <hr />
            <div className='eventStartDate'>{calendarStartDate.substring(0,10)} {calendarStartDate.substring(11)}</div>
            <div className='eventEndDate'>{calendarEndDate.substring(0,10)} {calendarEndDate.substring(11)}</div>
            <hr />
            <div className='eventContent'>{calendarContent}</div>
          <hr />
          <div className='calendarDetailPagebuttonBox'>
            <button onClick={onClickUpdate}>수정</button>
            <button onClick={onClickDelete}>삭제</button>
          </div>
      </div>
    </div>
  )
}
export default CalendarDetail;