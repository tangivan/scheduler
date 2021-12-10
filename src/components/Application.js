import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay, { getInterview } from "helpers/selectors";

import "components/Application.scss";
import "components/DayListItem.scss"
import axios from "axios";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    const appointmentsURL = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview)
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
            />
          )
        })}
        <Appointment
          key="last"
          time="5pm"
        />
      </section>
    </main>
  );
}
