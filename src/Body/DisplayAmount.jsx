import React, { useState, useRef, useEffect } from "react";
import "./DisplayAmount.css";

const DisplayAmount = ({ currAcc, setCurrAcc }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const inputRef = useRef(null);

  const changeAmount = function (e) {
    setInputAmount(e.target.value);
  };

  const click = function () {
    setIsClicked((c) => !c);
    if (Object.keys(currAcc).length !== 0) {
      setCurrAcc((acc) => ({
        ...acc,
        amount: acc.amount + Number(inputAmount),
      }));
    } else {
      alert("You must log in to your account");
    }
    setInputAmount("");
  };

  const displayUpdate = function () {
    setIsClicked((c) => !c);

    if (isClicked) inputRef.current.focus();
  };

  useEffect(() => {
    if (isClicked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isClicked]);

  return (
    <div className="budget-container">
      <h1 onClick={displayUpdate}>My budget</h1>
      {!isClicked ? (
        <h1>{currAcc.amount || 0}฿</h1>
      ) : (
        <h2 className="amount-text-container">
          <input
            type="number"
            className="display-amount-text"
            value={inputAmount}
            onChange={changeAmount}
            ref={inputRef}
          />
          <button className="amount-add-btn" onClick={click}>
            Add
          </button>
        </h2>
      )}
    </div>
  );
};

export default DisplayAmount;
