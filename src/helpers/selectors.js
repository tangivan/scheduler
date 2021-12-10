export default function getAppointmentsForDay(state, day) {
  const findDay = state.days.find(dayThing => dayThing.name === day);
  if (!findDay) return [];
  const appointmentsForDay = findDay.appointments.map(item => state.appointments[item]);
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  };
}
