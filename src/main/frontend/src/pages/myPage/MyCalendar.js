import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import MyPageApi from '../../api/MyPageApi';
import { Link, useNavigate } from 'react-router-dom';
import './MyPage.css';


const MyCalendar = () => {

  // const navigate = useNavigate();
  // 로그인 시 세션 스토리지에 설정한 userId 가져오기
  const userId = sessionStorage.getItem("userId");
  // 캘린더에 이벤트(일정) 불러오기
  const [calendarList, setCalendarList] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const MyCalendarData = async () => {
        setLoading(true);
        try {
          // console.log("User Id : " + userId);
          // 로그인된 userId로 작성된 일정 조회
          const response = await MyPageApi.calendarList(userId);
          setCalendarList(response.data);
          // console.log("캘린더 이벤트 리스트", response.data);
          // setEvents([...response.data]);  
          
        } catch (e) {
          // console.log(e);
        }
        setLoading(false);
    };
    MyCalendarData();
  }, []);

  if (loading) {
    return <h2>∘✧₊⁺ 𝑳𝒐𝒅𝒊𝒏𝒈... ⁺₊✧∘</h2>
  }

  // Events 입력을 위한 형태로 만들기(Array.from : 유사 배열 객체를 새로운 객체로 변환)
  const eventList = Array.from(calendarList).map((e) => {
    let returnObj = {
      "title":e.title,
      "date": e.startDate,
      "end": e.endDate,
      "color": e.color
    }
    return returnObj;
  });
  // console.log("eventList", eventList);

 
  return (
    <div className="myPageContainer">
      <div className="subTitle">
        <h1>My Calendar 🗓️ </h1>
      </div>
      <hr className="myPageHr"/>
      <div className="calContainer">
        <div className="calCreateButtonBox">
          <Link to="/myPage/myCalendar/add">
            <button id="calCreateButton">+ 일정 추가</button>
          </Link>
        </div>
        <div className="calendarBox">
        
        
        <FullCalendar 
          defaultView="dayGridWeek"
          plugins={[ dayGridPlugin, interactionPlugin ]}
          events={
            // 일정 입력 샘플
            // { title: '일정 입력 샘플', date: "2022-12-30T17:01", end: "2022-12-31", color: '#95e4fe'}
            eventList
          }
          eventClick={
            function(arg){
              console.log("event data : ", arg.event);
              sessionStorage.setItem("event_title", arg.event.title);
              sessionStorage.setItem("event_start_date", arg.event.start);
              window.location.replace("/myPage/myCalendar/detail");
            }
          }
          // eventClick={handleEventClick()} 
          // dateClick={handleDateClick}
        />
        </div>
      </div>
    </div>
  )
}
export default MyCalendar;