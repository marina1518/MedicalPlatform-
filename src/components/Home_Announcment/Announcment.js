import React from "react";
import "./announcment.css";
import { Link } from "react-router-dom";

const Announcment = () => {
  return (
    // <section className="announce-container">
    <div className="info">
      <div className="alert-icon">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <div className="announce-p">
        <p>
          <span>Announcment: </span>The Ministry of Health announces the
          presence of twenty cases of the new mutant of Covid "Omicron".
        </p>
      </div>
    </div>
    // </section>
  );
};

export default Announcment;
