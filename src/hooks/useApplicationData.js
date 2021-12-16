import { useEffect, useReducer } from "react";
import axios from "axios";
import applicationReducer, {
  SET_DAY,
  SET_INTERVIEW,
  SET_APPLICATION_DATA,
} from "reducers/application";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(applicationReducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    const endpoint = `/api/appointments/${id}`;
    return axios
      .put(endpoint, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }));
  };

  const deleteInterview = (id) => {
    const endpoint = `/api/appointments/${id}`;
    return axios
      .delete(endpoint)
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }));
  };

  // Web socket connection to receive SET_INTERVIEW requests
  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === SET_INTERVIEW) dispatch(message);
    };
    return () => webSocket.close();
  }, []);

  // Fetch Data on initial render
  useEffect(() => {
    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        data: { days, appointments, interviewers },
      });
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
};

export default useApplicationData;
