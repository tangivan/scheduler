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
      const { appointments, days } = action.data;
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
