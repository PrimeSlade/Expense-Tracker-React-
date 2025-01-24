import React, { useState, useEffect } from "react";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";

const List = ({ date, data }) => {
  const [showNote, setShowNote] = useState(false);
  const [activeId, setActiveId] = useState();

  const toggleNote = function (e) {
    setShowNote((s) => !s);
    const clickedId = e.currentTarget.id;
    // for toggling
    //if id has alr equaled to clickId , then set it into null (default)
    setActiveId((id) => (id === clickedId ? null : clickedId));
  };

  const renderData = () => {
    if (!data || data.length === 0) {
      return <div>No data available</div>;
    }

    return data.map((item, index) => (
      <div key={index} id={`${item.id}-${index}`} onClick={toggleNote}>
        <div className="item--container">
          <h2>
            {item.font}
            <span className="items">{item.catagory}</span>
          </h2>
          <h2 className="item-cost">{item.cost}</h2>
        </div>
        {activeId === `${item.id}-${index}` && ( // Only show note for the active item
          <div className="item-note">Note : {item.note}</div>
        )}
      </div>
    ));
  };

  return (
    <>
      <h2 className="date">{date}</h2>
      <div className="list--container">
        <div>{renderData()}</div>
      </div>
    </>
  );
};

export default List;
