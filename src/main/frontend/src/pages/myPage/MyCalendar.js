import MyPageNav from "./components/MyPageNav"
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './MyPage.css';

const MyCalendar = () => {

  return (
    <div className="myPageContainer">
      <MyPageNav />
      <div className="calendarBox">
        <div className="calCreateButtonBox">
          <button id="calCreateButton">+추가</button>
        </div>
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin ]}
          events={[
            { title: 'event 1', date: '2022-12-23' },
            { title: 'event 2', date: '2022-12-24' }
        ]}
        />
      </div>
    </div>

  )
}
export default MyCalendar;