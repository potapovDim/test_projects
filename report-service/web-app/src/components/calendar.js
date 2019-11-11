import './styles/calendar.css'

import React from 'react'
import Calendar from 'react-calendar'

const ReporterCalendar = ({title = '', onChange, activeStartDate}) => (
  <div className="calendar wrapper">
    {title && <div className="calendar_title" >{title}</div>}
    <Calendar onChange={onChange} activeStartDate={activeStartDate} />
  </div>
);

export {
  ReporterCalendar
}
