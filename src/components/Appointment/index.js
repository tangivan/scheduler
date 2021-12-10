import React, { useState } from 'react';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import "./styles.scss";

const Appointment = ({ time, interview }) => {
  return (
    <article className="appointment">
      {/* {time ? `Appointment at ${time}` : 'No Appointments'} */}
      {<Header time={time} />}
      {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />}
    </article>
  );
}

export default Appointment;
