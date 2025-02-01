import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const DisplayStatistic = ({ currAcc }) => {
  const [sum, setSum] = useState(0);
  const [list, setList] = useState(new Set()); //set

  useEffect(() => {
    if (currAcc.tempData) {
      const tempSum = currAcc.tempData.reduce(
        (acc, data) => acc + data.cost,
        0
      );
      setSum(tempSum);

      setList(new Set(currAcc.tempData.map((d) => d.catagory)));
    }
  }, [currAcc.tempData]);

  const renderProgressBar = function () {
    return Array.from(list).map((data, index) => {
      // Calculate total cost for each category
      const total = currAcc.tempData
        .filter((d) => d.catagory === data) // Filter matching categories
        .reduce((sum, d) => sum + d.cost, 0); // Sum up the cost

      return (
        <div key={index}>
          <h3>
            {data} : <span className="item-cost">{total}</span> ฿
          </h3>

          <LinearProgress
            variant="determinate"
            value={(total / sum) * 100}
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
      ) : currAcc.tempData.length === 0 ? (
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
