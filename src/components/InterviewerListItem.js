import React, { useState } from 'react';
import classNames from "classnames";
import "./InterviewerListItem.scss";
const InterviewerListItem = (props) => {
  const { name, avatar, selected, setInterviewer } = props;

  const classList = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li
      onClick={setInterviewer}
      className={classList}>
      <img
        src={avatar}
        alt={name}
        className="interviewers__item-image"
      />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;