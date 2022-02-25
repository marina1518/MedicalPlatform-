import React from "react";
import "./options.css";
import { Link } from "react-router-dom";

const Options = (props) => {
  const options = [
    {
      text: "hospitals",
      handler: props.actionProvider.handlehospitaloption,
      id: 1,
      link: "/hospitals",
    },
    {
      text: "specializations",
      handler: () => {},
      id: 2,
      link: "/",
    },
    {
      text: "home",
      handler: () => {},
      id: 1,
      link: "/",
    },
  ];

  const ButtonMarkUp = options.map((option) => (
    <Link to={option.link}>
      <button className="option-item" onClick={option.handler} key={option.id}>
        {option.text}
      </button>
    </Link>
  ));
  return (
    <div className="options">
      <div className="options-container">
        {/* {options.map((option) => {
          return (
            <div
              className="option-item"
              onClick={option.handler}
              key={option.id}
            >
              {option.name}
            </div>
          );
        })} */}
        {ButtonMarkUp}
      </div>
    </div>
  );
};

export default Options;
