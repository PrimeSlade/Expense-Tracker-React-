import "./Body.css";
import React, { useState, useEffect, useContext } from "react";
import { CurrAccContext } from "./App";
import List from "./Body/List";
import CreateList from "./Body/CreateList";
import {
  faBowlFood,
  faCar,
  faFilm,
  faLightbulb,
  faHome,
  faHeartbeat,
  faGraduationCap,
  faShoppingCart,
  faPlane,
  faShieldAlt,
  faPiggyBank,
  faChartLine,
  faGift,
  faSmile,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import MonthList from "./Body/MonthList";
import DisplayStatistic from "./Body/DisplayStatistic";

function Body({ isLogin, setCurrAcc }) {
  const { currAcc } = useContext(CurrAccContext);

  //for month and today btn
  const [isMonth, setIsMonth] = useState(false);

  //for date
  const [date, setDate] = useState("");

  //for data
  const [tempData, setTempData] = useState(currAcc.tempData || []);

  //set main data
  useEffect(() => {
    if (isLogin) {
      setCurrAcc((acc) => ({ ...acc, tempData }));
    }
  }, [tempData]);

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
    const day = today.getDate().toString().padStart(2, "0");
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const formatDate = `${day} ${month} ${year}`;
    setDate(formatDate);
  }, []);

  const change = function (e) {
    if (e.target.classList.contains("btn-Today")) {
      setIsMonth(false);
    } else {
      setIsMonth(true);
    }
  };

  return (
    <>
      <div className="main-container-body">
        <div className="btn-container">
          <button
            className={`btn- btn-Today ${!isMonth ? "active" : "in-active"}`}
            onClick={change}
          >
            Today
          </button>
          <button
            className={`btn- btn-Month ${isMonth ? "active" : "in-active"}`}
            onClick={change}
          >
            Month
          </button>
        </div>
        {!isMonth ? (
          <>
            <div className="today-container">
              <div className="lists">
                <List
                  date={date}
                  tempData={currAcc.tempData || tempData}
                  setTempData={setTempData}
                  currAcc={currAcc}
                  setCurrAcc={setCurrAcc}
                />
              </div>
              <div className="create-list">
                <CreateList
                  months={months}
                  setTempData={setTempData}
                  currAcc={currAcc}
                  setCurrAcc={setCurrAcc}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="today-container">
              <div className="lists">
                <MonthList
                  tempData={currAcc.tempData || tempData}
                  setTempData={setTempData}
                  months={months}
                  setCurrAcc={setCurrAcc}
                  currAcc={currAcc}
                />
              </div>
              <div className="create-list">
                <DisplayStatistic currAcc={currAcc} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Body;
