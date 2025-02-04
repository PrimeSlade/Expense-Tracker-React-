//frontend\src\Body\DisplayStatistic.jsx
import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const DisplayStatistic = ({ currAcc }) => {
  const [sum, setSum] = useState(0);
  const [list, setList] = useState(new Set()); //set

  useEffect(() => {
    // we be fetching the current account data if it does not exist
    if (!currAcc.expenses) {
      axios
        .get("/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const { expenses } = response.data;
          //set category base on fetched data
          setList(new Set(expenses.map((d) => d.category)));
          setSum(expenses.reduce((acc, data) => acc + data.cost, 0));
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    } else {
      const tempSum = currAcc.expenses.reduce(
        (acc, data) => acc + data.cost,
        0
      );
      setSum(tempSum);

      setList(new Set(currAcc.expenses.map((d) => d.category)));
    }
  }, [currAcc]); // run when currAcc data change

  const renderProgressBar = function () {
    return Array.from(list).map((data, index) => {
      // Calculate total cost for each category
      const total = currAcc.expenses
        .filter((d) => d.category === data)
        .reduce((sum, d) => sum + d.cost, 0);
      const progressValue = sum > 0 ? (total / sum) * 100 : 0;
      return (
        <div key={index}>
          <h3>
            {data} : <span className="item-cost">{total}</span> ฿
          </h3>

          <LinearProgress
            variant="determinate"
            value={progressValue}
            className="progress-bar"
            sx={{
              // Ensures it fills the container
              width: "600px", // Optional: Limits width
              height: "10px",
              borderRadius: "5px",
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Light background
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#00C48C", // Progress color
              },
            }}
          />
        </div>
      );
    });
  };

  return (
    <>
      {Object.values(currAcc).length === 0 ? (
        <h2 className="info-text">No data available</h2>
      ) : currAcc.expenses?.length === 0 ? (
        <h2 className="info-text">No data available</h2>
      ) : (
        <>
          <div className=" height display-statistic">
            <h2>
              Total: <span className="item-cost">{sum}</span> ฿
            </h2>
            {renderProgressBar()}
          </div>
        </>
      )}
    </>
  );
};

export default DisplayStatistic;
