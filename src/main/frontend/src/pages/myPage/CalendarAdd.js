import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import MyPageApi from '../../api/MyPageApi';
import './MyPage.css';

const CalendarAdd = () => {
  
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId")
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");

  const onChangeTitle = (e) => setTitleInput(e.target.value);
  const onChangeContent = (e) => setContentInput(e.target.value);
  const onChangeColor = (e) => setColorInput(e.target.value);
  const onChangeStartDate = (e) => setStartDateInput(e.target.value);
  const onChangeEndDate = (e) => setEndDateInput(e.target.value);
  
  // 일정 등록
  const onClickEventAdd = async (e) => {
    
    console.log("======= data 확인 =======")
    console.log("user_id : " + userId);
    console.log("title : " + titleInput);
    console.log("content : " + contentInput);
    console.log("color : " + colorInput);
    console.log("start_date : " + startDateInput);
    console.log("end_date : " + endDateInput);

    const res = await MyPageApi.calendarEventAdd(userId, titleInput, contentInput, colorInput, startDateInput, endDateInput);
    console.log(res.data);
    if(res.data === true) {
      window.alert("일정이 등록되었습니다!");
      navigate(`/myPage/myCalendar/${userId}`);
    } else {
        if (titleInput === "") {
          window.alert("제목을 입력하세요");
        } else if (startDateInput === "") {
          window.alert("시작 날짜를 입력하세요");
        } else {
          window.alert("일정 입력 실패");
        }  
      }
  };

  // 취소 버튼
  const onClickCancel = () => {
    if(window.confirm("등록을 취소하시겠습니까?") === true ) {
      navigate(`/myPage/myCalendar/${userId}`);
    } else {
      return false;
    }
  }

  return (

    <div className='calendarAddTest'>
      <h1>🗓️ 일정 등록</h1>
      <div className='calendarInputBox'>
        <h3 style={{"display" : "inline"}}>색상 선택 </h3>
        <input type={"color"} name={"event_color"} onChange={onChangeColor}/>
        <hr/>
        <h3>제목</h3>
        <input type={"text"} name={"event_title"} placeholder=
        {"제목을 입력해주세요. (필수)"} onChange={onChangeTitle} />
        <h3>시작 날짜(필수)</h3>
        <input type={"datetime-local"} name={"event_start_date"} onChange={onChangeStartDate} />
        <h3>종료 날짜</h3>
        <input type={"datetime-local"} name={"event_end_date"} onChange={onChangeEndDate} />
        <h3>내용</h3>
        <input type={"textarea"} name={"event_content"} placeholder=
        {"내용을 입력해주세요."} onChange={onChangeContent} />
        <hr/>
      </div>
      <div className='calendarAddButtonBox'>
        <button className='calAddButton' onClick={onClickEventAdd}>등록</button>
        <button className='calCancelButton' onClick={onClickCancel}>취소</button>
      </div>
    </div>
  );
};
export default CalendarAdd;