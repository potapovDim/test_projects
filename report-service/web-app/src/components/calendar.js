import React from 'react'
import Calendar from 'react-calendar'

const ReporterCalendar = ({title = '', onChange, activeStartDate}) => (
  <div className="calendar wrapper">
    {title}
    <Calendar onChange={onChange} activeStartDate={activeStartDate}/>
  </div>
);

export {
  ReporterCalendar
}
