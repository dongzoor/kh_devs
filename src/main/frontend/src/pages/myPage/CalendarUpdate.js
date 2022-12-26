import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import MyPageApi from '../../api/MyPageApi';
import './MyPage.css';

const CalendarUpdate = () => {

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 초기값 설정
  useEffect(() => {
    
    const originTitle = sessionStorage.getItem("event_title");
    const originContent = sessionStorage.getItem("calendar_content");
    const originColor = sessionStorage.getItem("calendar_color");
    const originStartDate = sessionStorage.getItem("calendar_startDate");
    const originEndDate = sessionStorage.getItem("calendar_endDate");

    if (originTitle || originContent || originColor || originStartDate || originEndDate) {
      setTitle(originTitle);
      setContent(originContent);
      setColor(originColor);
      setStartDate(originStartDate);
      setEndDate(originEndDate);
    }
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeColor = (e) => {
    setColor(e.target.value);
  };

  const onChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const onChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  // 수정 사항 등록
  const onClickEventAdd = async () => {

    if (title === "") {
      window.alert("제목을 입력해주세요.");
      return;
    }

    if(startDate === "") {
      window.alert("시작일자를 입력해주세요.");
      return;
    }

    if (window.confirm("수정사항을 등록하시겠습니까?")) {
      if(true) {
        const calendarId = sessionStorage.getItem("calendar_id")

        console.log("★DATA", calendarId, title, color, content, startDate, endDate)

        const res = await MyPageApi.calendarUpdate(
          calendarId, 
          title, 
          color, 
          content, 
          startDate, 
          endDate
        )

        if(res.data === true) {
          window.alert("일정 수정이 완료되었습니다.");
          // sessionStorage.clear();

          // sessionStorage.setItem("event_title", eventUpdate.data.title);
          // sessionStorage.setItem("calendar_color", eventUpdate.data.color);
          // sessionStorage.setItem("calendar_content", eventUpdate.data.content);
          // sessionStorage.setItem("calendar_startDate", eventUpdate.data.startDate);
          // sessionStorage.setItem("calendar_endDate", eventUpdate.data.endDate);
          
          navigate(`/myPage/myCalendar/${userId}`);
        } else {
          alert("일정 수정 실패 ");
          window.location.reload();
        }
      }
    } else {
      return;
    }
  }
  

  // 등록 취소
  const onClickCancel = () => {
    if(window.confirm("등록을 취소하시겠습니까?") === true ) {
      navigate(`/myPage/myCalendar/${userId}`);
    } else {
      window.location.reload();
    }
  }
  return(
    <div className="eventAddPageContainer">
      <div className='calendarAdd'>
      <h1>🗓️ 일정 수정</h1>
      <div className='calendarInputBox'>
        <hr/>
        <h3 style={{"display" : "inline"}}>제목</h3>
        <div className="eventColorBox">
          <input type={"color"} name={"event_color"} value={color}  style={{"display" : "inline"}} onChange={onChangeColor}/>
        </div>

        <input type={"text"} name={"event_title"} value={title} placeholder=
        {"제목을 입력해주세요. (필수)"} onChange={onChangeTitle} />
        <h3>시작 날짜(필수)</h3>
        <input type={"datetime-local"} name={"event_start_date"} value={startDate} onChange={onChangeStartDate} />
        <h3>종료 날짜</h3>
        <input type={"datetime-local"} name={"event_end_date"} value={endDate} onChange={onChangeEndDate} />
        <h3>내용</h3>
        <input type={"textarea"} name={"event_content"} placeholder=
        {"내용을 입력해주세요."} value={content} onChange={onChangeContent} />
        <hr/>
      </div>
      <div className='calendarAddButtonBox'>
        <button className='calAddButton' onClick={onClickEventAdd}>등록</button>
        <button className='calCancelButton' onClick={onClickCancel}>취소</button>
      </div>
      </div>
    </div>
  )
}
export default CalendarUpdate;