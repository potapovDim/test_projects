import React from 'react'
import Calendar from 'react-calendar'

const ReporterCalendar = ({title = '', onChange}) => (
  <div className="calendar wrapper">
    {title}
    <Calendar onChange={onChange} />
  </div>
);

export {
  ReporterCalendar
}
