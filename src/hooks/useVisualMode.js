import { useState } from "react";

// Custom hook to handle mode transitions
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    //If replace, remove last element and setmode. else just setmode
    setHistory((prevHistory) =>
      replace
        ? [...prevHistory.slice(0, -1), newMode]
        : [...prevHistory, newMode]
    );
    setMode(newMode);
  };

  const back = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length <= 1) return;
      const newHistory = [...prevHistory.slice(0, -1)];
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  };
  return { mode, transition, back };
};

export default useVisualMode;
