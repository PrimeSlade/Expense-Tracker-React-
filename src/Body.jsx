import "./Body.css";
import React, { useState } from "react";

function Body() {
  //for amount
  const [amount, setAmount] = useState("0");

  //for data
  const [data, setDate] = useState({ catagory: "Food", note: "", cost: 100 });

  return (
    <>
      <div className="main-container-body">
        <div className="btn-container">
          <button className="btn- btn-Today">Today</button>
          <button className="btn- btn-Month">Month</button>
        </div>
      </div>
    </>
  );
}

export default Body;
