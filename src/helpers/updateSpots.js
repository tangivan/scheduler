import getAppointmentsForDay from "./selectors";

const updateSpots = (state, appointments) => {
  //Filters for appointments with null interviews
  const spots = getAppointmentsForDay(
    { ...state, appointments },
    state.day
  ).filter((appoints) => !appoints.interview).length;

  //Update specific day in the days state
  const days = state.days.map((day) =>
    day.name === state.day ? { ...day, spots } : day
  );
  return days;
};

export default updateSpots;
