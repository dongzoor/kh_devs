import React, { useEffect, useState } from 'react';
import MyPageApi from '../../api/MyPageApi';
import { useNavigate } from 'react-router-dom';

const CalendarId = () => {

  const navigate = useNavigate();
  const calendarTitle = sessionStorage.getItem("event_title");
  // 캘린더에 이벤트(일정) 불러오기
  // const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const MyCalendarData = async () => {
        setLoading(true);
        try {
          const response = await MyPageApi.eventId(calendarTitle);
          // console.log("캘린더 이벤트 data : ",response.data[0])

          sessionStorage.setItem("calendar_id",response.data[0].calendarId);
          sessionStorage.setItem("calendar_title",response.data[0].title);
          sessionStorage.setItem("calendar_color",response.data[0].color);
          sessionStorage.setItem("calendar_content",response.data[0].content);
          sessionStorage.setItem("calendar_startDate",response.data[0].startDate);
          sessionStorage.setItem("calendar_endDate",response.data[0].endDate);
        
          navigate(`/myPage/myCalendar/detail/${calendarTitle}`);
          
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

}
export default CalendarId;