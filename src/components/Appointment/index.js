import React, { useState } from 'react';
import "./styles.scss";

const Appointment = (props) => {
  const { time } = props;
  return (
    <article className="appointment">
      {time ? `Appointment at ${time}` : 'No Appointments'}
    </article>
  );
}

export default Appointment;
