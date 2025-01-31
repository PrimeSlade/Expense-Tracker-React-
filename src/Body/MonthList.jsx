import React, { useState, useId, useEffect } from "react";
import "./MonthList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MonthList = ({ tempData, months, setTempData, setCurrAcc, currAcc }) => {
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
    const deletedItem = data[index];

    setCurrAcc((acc) => ({ ...acc, amount: acc.amount + deletedItem.cost }));

    const selected = data.filter((_, i) => i !== index);
    setTempData(selected);
  };

  const renderData = () => {
    if (tempData.length === 0) {
      return <h2 className="info-text">No data available</h2>;
    }

    let lastDate = "";

    return data.map((item, index) => {
      const tempDate = `${months[item.month - 1]} ${item.year}`;
      const showDate = tempDate !== lastDate;

      if (showDate) {
        lastDate = tempDate;
      }

      return (
        <div key={index} id={`${item.id}-${index}`} onClick={toggleNote}>
          {showDate && <h2 className="display-date">{tempDate}</h2>}
          <div className="item--container">
            <h2>
              <FontAwesomeIcon icon={item.icon} />
              <span className="items">{item.catagory}</span>
            </h2>
            <h2 className="item-cost">{item.cost}</h2>
          </div>
          {activeId === `${item.id}-${index}` && (
            <>
              <h3 className="display-date-details">
                Date: {item.date} {tempDate}
              </h3>

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
      );
    });
  };

  return (
    <>
      <div className="list--container height">
        <div>{renderData()}</div>
      </div>
    </>
  );
};

export default MonthList;
