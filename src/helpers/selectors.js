export default function getAppointmentsForDay(state, day) {
  const findDay = state.days.find((theDay) => theDay.name === day);
  if (!findDay) return [];
  const appointmentsForDay = findDay.appointments.map(
    (item) => state.appointments[item]
  );
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
}

export function getInterviewersForDay(state, day) {
  const findDay = state.days.find((dayThing) => dayThing.name === day);
  if (!findDay || !findDay.interviewers || findDay.interviewers.length === 0)
    return [];
  const interviewsForDay = findDay.interviewers.map(
    (item) => state.interviewers[item]
  );
  return interviewsForDay;
}

export const updateSpots = (state, appointments) => {
  const spots = getAppointmentsForDay(
    { ...state, appointments },
    state.day
  ).filter((appoints) => !appoints.interview).length;
  const days = state.days.map((day) =>
    day.name === state.day ? { ...day, spots } : day
  );
  return days;
};
