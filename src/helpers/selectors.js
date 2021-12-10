export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find(dayThing => dayThing.name === day);
  if (!findDay) return [];
  const appointmentsForDay = findDay.appointments.map(item => state.appointments[item]);
  return appointmentsForDay;
}
