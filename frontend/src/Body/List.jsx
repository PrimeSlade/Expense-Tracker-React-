//frontend\src\Body\List.jsx
import React, { useState, useEffect } from "react";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"; // import axios for API requests

const List = ({ date, tempData = [], setTempData, currAcc, setCurrAcc }) => {
  const [activeId, setActiveId] = useState();

  // to fetch data on component mount (e.g. expenses and current account details)
  // useEffect(() => {
  //   axios
  //     .get("/profile", {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     })
  //     .then((response) => {
  //       setCurrAcc({
  //         ...response.data,
  //         expenses: response.data.expenses || [],
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching profile data:", error);
  //     });
  // }, [setCurrAcc, currAcc._id]);

  const toggleNote = function (e) {
    const clickedId = e.currentTarget.id;
    // for toggling
    //if id has alr equaled to clickId , then set it into null (default)
    setActiveId((id) => (id === clickedId ? null : clickedId));
  };

  // make api call to delete an expense
  const deleteList = function (index) {
    const deletedItem = currAcc.expenses[index];

    if (!deletedItem?._id) {
      alert("Invalid expense data");
      return;
    }

    axios
      .delete(`/delete-expense/${deletedItem._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // update after deleting an expense
        setCurrAcc((prev) => ({
          ...prev,
          amount: response.data.user.amount,
          expenses: response.data.user.expenses,
        }));
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        alert(
          `Error deleting expense: ${
            error.response?.data?.message || error.message
          }`
        );
      });
  };

  const renderData = () => {
    if (!currAcc.expenses || currAcc.expenses.length === 0) {
      return <h2 className="info-text">No data available</h2>;
    }

    return currAcc.expenses.map((item, index) => (
      <div key={item._id} id={`${item._id}-${index}`} onClick={toggleNote}>
        <div className="item--container">
          <h2>
            <FontAwesomeIcon icon={["fas", item.icon]} />
            <span className="items">{item.category}</span>
          </h2>
          <h2 className="item-cost">{item.cost}</h2>
        </div>
        {activeId === `${item._id}-${index}` && (
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
