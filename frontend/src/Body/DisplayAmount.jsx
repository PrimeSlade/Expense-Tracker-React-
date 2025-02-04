//frontend\src\Body\DisplayAmount.jsx
import "./DisplayAmount.css";
import axios from "axios"; // Import axios for API calls
import React, { useState, useRef, useEffect } from "react";

const DisplayAmount = ({ currAcc, setCurrAcc }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [inputAmount, setInputAmount] = useState("");

  const inputRef = useRef(null);

  const changeAmount = (e) => {
    setInputAmount(e.target.value);
  };

  const click = async () => {
    setIsClicked((prev) => !prev); // toggle

    // check if current account exist
    if (Object.keys(currAcc).length !== 0) {
      // Calculate the new amount after adding the input amount
      const newAmount = currAcc.amount + Number(inputAmount);

      try {
        // Send PUT request to backend to update the amount
        const response = await axios.put(
          `/update-amount/${currAcc._id}`,
          { amount: newAmount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // upd if successful
        setCurrAcc((prev) => ({
          ...prev,
          amount: response.data.user.amount,
        }));

        alert("Balance updated successfully.");
      } catch (error) {
        console.error("Error updating balance:", error);
        alert("Error updating balance.");
      }
    } else {
      alert("You must log in to your account");
    }

    setInputAmount("");
  };

  const displayUpdate = () => {
    setIsClicked((prev) => !prev);
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
