import React from 'react';
import DayListItem from './DayListItem';
const DayList = ({ days, value, onChange }) => {

  return (
    <ul>
      {days.map(dayItem =>
        <DayListItem
          key={dayItem.id}
          name={dayItem.name}
          spots={dayItem.spots}
          setDay={onChange}
          selected={dayItem.name === value}
        />
      )}
    </ul>
  );
}

export default DayList;
