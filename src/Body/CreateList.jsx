import React, { useState, useId, useRef, useEffect } from "react";
import "./CreateList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faCar,
  faFilm,
  faLightbulb,
  faHome,
  faHeartbeat,
  faGraduationCap,
  faShoppingCart,
  faBook,
  faShieldAlt,
  faPiggyBank,
  faChartLine,
  faGift,
  faSmile,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

const CreateList = ({ setTempData, months }) => {
  //will render when mounts

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputDate, setInputDate] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef(null);

  // List of 15 essential categories
  const categories = [
    "Food & Dining",
    "Transportation",
    "Housing",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Health & Fitness",
    "Travel",
    "Education",
    "Personal Care",
    "Debt & Loans",
    "Savings & Investments",
    "Gifts & Donations",
    "Insurance",
    "Miscellaneous",
  ];

  const fonts = [
    faBowlFood,
    faCar,
    faFilm,
    faLightbulb,
    faHome,
    faHeartbeat,
    faGraduationCap,
    faShoppingCart,
    faBook,
    faShieldAlt,
    faPiggyBank,
    faChartLine,
    faGift,
    faSmile,
    faEllipsisH,
  ];

  const getTime = () => {
    const sp = inputDate.split("-");
    const tempMont = parseInt(sp[1], 10);
    return `${sp[2]} ${months[tempMont]} ${sp[0]}`;
  };

  const tempData = {
    catagory: selectedCategory,
    note: note,
    cost: amount,
    time: getTime(),
    icon: fonts[selectedIndex],
    id: useId(),
  };

  const click = function () {
    const isValid = (...e) => e.every((e) => e !== "");

    if (isValid(selectedCategory, amount)) {
      setTempData((d) => [...d, tempData]);

      setSelectedCategory("");
      setAmount("");
      setNote("");

      setIsClicked((s) => !s);
    } else {
      alert("You need to select category and amount");
      inputRef.current.focus();
    }
  };

  // Handle category selection

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    //React state updates are asynchronous.
    //When you call setSelectedCategory(selectedValue),
    // the selectedCategory state is not immediately updated.
    //This means that categories.indexOf(selectedCategory) might still
    // be using the old value of selectedCategory.
    setSelectedIndex(categories.indexOf(selectedValue));
  };

  const changeInputDate = function (e) {
    setInputDate(e.target.value);
  };

  const changeAmount = function (e) {
    setAmount(e.target.value);
  };

  const changeNote = function (e) {
    setNote(e.target.value);
  };

  useEffect(() => {
    //calc date
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();

    const formatDate = `${year}-${month}-${day}`;

    setInputDate(formatDate);
  }, [isClicked]);

  return (
    <div className="main-c-container">
      <div className="opt-container">
        {/* Category dropdown */}
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Categories</option>
          {categories.map((cate, index) => (
            <option value={cate} key={index} id={useId()}>
              {cate}
            </option>
          ))}
        </select>
        <form>
          <h3>
            Date :{"  "}
            <input type="date" onChange={changeInputDate} value={inputDate} />
          </h3>
        </form>
      </div>

      <div className="note-container">
        <h2 className="amount-text-container">
          <span className="amount">Amount </span>
          <input
            type="number"
            className="amount-text"
            ref={inputRef}
            value={amount}
            onChange={changeAmount}
          />
        </h2>
        <h3>Write note</h3>
        <textarea
          className="note-text"
          placeholder="Enter your note..."
          rows={5} // Number of visible rows
          cols={50} // Number of visible columns (can be adjusted or removed for responsive design)
          value={note}
          onChange={changeNote}
        />
        <button className="createlist-add-btn" onClick={click}>
          Add
        </button>
      </div>
    </div>
  );
};

export default CreateList;
