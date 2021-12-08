import React from 'react';
import DayListItem from './DayListItem';
const DayList = (props) => {
  const { days, day, setDay } = props;

  return (
    <ul>
      {days.map(dayItem =>
        <DayListItem
          key={dayItem.id}
          name={dayItem.name}
          spots={dayItem.spots}
          setDay={setDay}
          selected={dayItem.name === day}
        />
      )}
    </ul>
  );
}

export default DayList;
