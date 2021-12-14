import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    const appointmentsURL = "http://localhost:8001/api/appointments";
    const interviewersURL = "http://localhost:8001/api/interviewers";

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const endpoint = `/api/appointments/${id}`;
    const days = updateSpots();
    return axios
      .put(endpoint, appointment)
      .then(() =>
        setState((prevState) => ({ ...prevState, appointments, days }))
      );
  };

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const endpoint = `/api/appointments/${id}`;
    const days = updateSpots("delete");
    return axios
      .delete(endpoint, appointment)
      .then(() =>
        setState((prevState) => ({ ...prevState, appointments, days }))
      );
  };

  const updateSpots = (type = "save") => {
    //Get the day object
    const day = { ...state.days.find((day) => day.name === state.day) };
    //Map all appointments for that day, filter only null appointments
    const nullAppointments = day.appointments
      .map((element) => state.appointments[element])
      .filter((appoints) => !appoints.interview);
    //manipulate spots based on type of update (save/delete)
    const offset = type === "save" ? -1 : 1;
    //create new day
    const newDay = {
      ...day,
      spots: nullAppointments.length + offset,
    };
    //map out new days state
    const newDays = state.days.map((day) =>
      day.id === newDay.id ? newDay : day
    );
    return newDays;
  };

  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;
