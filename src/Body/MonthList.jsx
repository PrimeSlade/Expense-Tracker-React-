import React, { useState, useId, useEffect } from "react";
import "./MonthList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MonthList = ({ tempData, months }) => {
  const [activeId, setActiveId] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const sorted = tempData
      .map((data) => {
        const time = data.time.split("-"); // Assuming format: "DD-MM-YYYY"
        return {
          ...data, // Keep other properties intact
          date: Number(time[0]),
          month: Number(time[1]),
          year: Number(time[2]),
        };
      })
      .sort((a, b) => {
        const yearDiff = b.year - a.year;
        if (yearDiff !== 0) return yearDiff;
        const monthDiff = b.month - a.month;
        if (monthDiff !== 0) return monthDiff;
        return b.date - a.date;
      });

    setData(sorted);
  }, [tempData]);

  const toggleNote = function (e) {
    const clickedId = e.currentTarget.id;
    // for toggling
    //if id has alr equaled to clickId , then set it into null (default)
    setActiveId((id) => (id === clickedId ? null : clickedId));
  };

  const deleteList = function (index) {
    const deletedItem = currAcc.tempData[index];

    setCurrAcc((acc) => ({ ...acc, amount: acc.amount + deletedItem.cost }));

    const selected = tempData.filter((_, i) => i !== index);
    setTempData(selected); //will be back VERY IMPORTANT
  };

  const renderData = () => {
    if (tempData.length === 0) {
      return <h2 className="info-text">No data available</h2>;
    }

    return data.map((item, index) => (
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

  const set = function (e) {
    setInputYear(e.currentTarget.value);
  };

  console.log(data);

  return (
    <>
      <div className="list--container height">
        <div>{renderData()}</div>
      </div>
    </>
  );
};

export default MonthList;
