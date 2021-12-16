import updateSpots from "helpers/updateSpots";

//Dispatch Constants
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const applicationReducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };
    case SET_APPLICATION_DATA:
      const { days, appointments, interviewers } = action.data;
      return {
        ...state,
        days,
        appointments,
        interviewers,
      };
    case SET_INTERVIEW: {
      // create new appointments state
      const { id, interview } = action;
      const appointment = { ...state.appointments[id], interview };
      const appointments = { ...state.appointments, [id]: appointment };

      // create new days state
      const days = updateSpots(state, appointments);
      return {
        ...state,
        appointments,
        days,
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default applicationReducer;
