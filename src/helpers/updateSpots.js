import getAppointmentsForDay from "./selectors";

const updateSpots = (state, appointments) => {
  const spots = getAppointmentsForDay(
    { ...state, appointments },
    state.day
  ).filter((appoints) => !appoints.interview).length;
  const days = state.days.map((day) =>
    day.name === state.day ? { ...day, spots } : day
  );
  return days;
};

export default updateSpots;
