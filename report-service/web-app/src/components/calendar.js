import React, {Component} from 'react';
import Calendar from 'react-calendar';

const ReporterCalendar = ({onChange}) => (
  <div>
    <Calendar onChange={onChange} />
  </div>
);

export {
  ReporterCalendar
}
