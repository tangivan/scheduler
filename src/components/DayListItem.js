import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem({ name, spots, selected, setDay }) {
  const classList = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  const formatSpots = (spots) => {
    if (!spots) return "no spots remaining";
    return spots === 1 ? `${spots} spot remaining` : `${spots} spots remaining`;
  };

  return (
    <li data-testid="day" className={classList} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
