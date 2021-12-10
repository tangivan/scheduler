import React, { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
    }
    setMode(newMode);
    setHistory((prevHistory) => [...prevHistory, newMode]);
  }

  const back = () => {
    if (history.length <= 1) return;
    history.pop();
    setMode(history[history.length - 1]);
  }
  return { mode, transition, back }
}

export default useVisualMode;
