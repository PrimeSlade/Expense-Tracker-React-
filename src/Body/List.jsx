import React, { useState } from "react";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = ({ date, tempData, setTempData }) => {
  const [activeId, setActiveId] = useState();

  const toggleNote = function (e) {
    const clickedId = e.currentTarget.id;
    // for toggling
    //if id has alr equaled to clickId , then set it into null (default)
    setActiveId((id) => (id === clickedId ? null : clickedId));
  };

  const deleteList = function (index) {
    const selected = tempData.filter((_, i) => i !== index);
    setTempData(selected);
  };

  const renderData = () => {
    if (tempData.length === 0) {
      return <h2 className="info-text">No data available</h2>;
    }

    return tempData.map((item, index) => (
      <div key={index} id={`${item.id}-${index}`} onClick={toggleNote}>
        <div className="item--container">
          <h2>
            <FontAwesomeIcon icon={item.icon} />
            <span className="items">{item.catagory}</span>
          </h2>

          <h2 className="item-cost">{item.cost}</h2>
        </div>
        {activeId === `${item.id}-${index}` && (
          // Only show note for the active item
          <>
            <div className="item-note">Note : {item.note}</div>
            <button
              className="delete-btn-list"
              onClick={() => {
                deleteList(index);
              }}
            >
              Delete List
            </button>
          </>
        )}
        <hr className="hr-line" />
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
