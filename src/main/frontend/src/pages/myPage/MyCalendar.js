import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './MyPage.css';

const MyCalendar = () => {

  return (
    <div className="myPageContainer">
      <div className="subTitle">
        <h1>My Calendar</h1>
      </div>
      <hr />
      <div className="calContainer">
        <div className="calCreateButtonBox">
          <button id="calCreateButton">+ 일정 추가</button>
        </div>
        <div className="calendarBox">
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin ]}
          events={[
            { title: '파이널 마무리', date: '2022-12-23' },
            { title: '학원 수료일', date: '2022-12-26' }
        ]}
        />
        </div>
      </div>
    </div>

  )
}
export default MyCalendar;