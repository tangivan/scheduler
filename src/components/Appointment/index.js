import React, { useState } from 'react';
import "./styles.scss";

const Appointment = ({ time }) => {
  return (
    <article className="appointment">
      {time ? `Appointment at ${time}` : 'No Appointments'}
    </article>
  );
}

export default Appointment;
