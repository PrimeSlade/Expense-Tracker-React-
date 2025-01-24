import "./Body.css";
import React, { useState, useEffect, useId } from "react";
import List from "./Body/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";

function Body() {
  //for amount
  const [amount, setAmount] = useState("0");

  //for id
  const id = useId();

  //for date
  const [date, setDate] = useState("");

  //for data
  const [data, setData] = useState([
    {
      catagory: "Food",
      note: "Food from KFC",
      cost: 100,
      time: date,
      font: <FontAwesomeIcon icon={faBowlFood} />,
      id: id,
    },
    {
      catagory: "Food",
      note: "Food from KFC",
      cost: 100,
      time: date,
      font: <FontAwesomeIcon icon={faBowlFood} />,
      id: id,
    },
  ]);

  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //will render when mounts
  useEffect(() => {
    //calc date
    const today = new Date();
    const day = today.getDay().toString().padStart(2, "0");
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const formatDate = `${day} ${month} ${year}`;
    setDate(formatDate);
  }, []);

  return (
    <>
      <div className="main-container-body">
        <div className="btn-container">
          <button className="btn- btn-Today">Today</button>
          <button className="btn- btn-Month">Month</button>
        </div>
        <div className="today-container">
          <div className="lists">
            {/* List */}
            <List date={date} data={data} />
          </div>
          <div className="create-list">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ullam
            dolores, nulla temporibus et corporis debitis sapiente
            necessitatibus commodi consectetur eum voluptas quam, ipsum repellat
            cumque? Incidunt qui suscipit corporis!
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
