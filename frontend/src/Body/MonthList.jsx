import React, { useState, useEffect } from "react";
import "./MonthList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const MonthList = ({ months, setCurrAcc, currAcc }) => {
  // Removed tempData props
  const [activeId, setActiveId] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Use currAcc.expenses instead of tempData
    if (currAcc?.expenses) {
      const sorted = currAcc.expenses
        .map((data) => {
          // Changed date parsing to match YYYY-MM-DD format
          const [year, month, date] = data.date.split("-");
          return {
            ...data,
            date: Number(date),
            month: Number(month),
            year: Number(year),
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
    }
  }, [currAcc.expenses]); // Changed dependency to currAcc.expenses

  const toggleNote = function (e) {
    const clickedId = e.currentTarget.id;
    // for toggling
    //if id has alr equaled to clickId , then set it into null (default)
    setActiveId((id) => (id === clickedId ? null : clickedId));
  };

  const deleteList = function (index) {
    const deletedItem = data[index];

    // Send DELETE request with correct _id
    axios
      .delete(`/delete-expense/${deletedItem._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        // Update current account state directly from response
        setCurrAcc((prev) => ({
          ...prev,
          amount: prev.amount + deletedItem.cost, // add back the cost to the amount
          expenses: prev.expenses.filter((e) => e._id !== deletedItem._id),
        }));
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        alert("Error deleting expense. Please try again.");
      });
  };

  const renderData = () => {
    // Changed to use currAcc.expenses instead of tempData
    if (!currAcc.expenses || currAcc.expenses.length === 0) {
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
        <div key={item._id} id={`${item._id}-${index}`} onClick={toggleNote}>
          {showDate && <h2 className="display-date">{tempDate}</h2>}
          <div className="item--container">
            <h2>
              <FontAwesomeIcon icon={["fas", item.icon]} />
              <span className="items">{item.category}</span>
            </h2>
            <h2 className="item-cost">{item.cost}</h2>
          </div>
          {activeId === `${item._id}-${index}` && (
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
