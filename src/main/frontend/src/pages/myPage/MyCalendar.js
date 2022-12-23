
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import './MyPage.css';

const MyCalendar = () => {

  return (
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin, interactionPlugin ]}
          events={[
            { title: '파이널 마무리', date: "2022-12-23", end: '2022-12-23', color: '#95e4fe'},
            { title: '파이널 마무리2', date: '2022-12-24', end: '2022-12-24', color: '#95e4fe'},
            // {eventList}
          ]}
        />
  )
}
export default MyCalendar;