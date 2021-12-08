import React, { useState } from 'react';
import InterviewerListItem from './InterviewerListItem';
import "./InterviewerList.scss";

const InterviewerList = ({ interviewers, onChange, value }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(interviewerItem =>
          <InterviewerListItem
            key={interviewerItem.id}
            name={interviewerItem.name}
            avatar={interviewerItem.avatar}
            selected={interviewerItem.id === value}
            setInterviewer={() => onChange(interviewerItem.id)}
          />)}
      </ul>
    </section>
  );
}

export default InterviewerList;
