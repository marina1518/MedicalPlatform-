import React from 'react'
import "./custom.css";
import { Link } from "react-router-dom";
function Onedoctor(props) {
    const doctor = props.doctor;
    console.log(doctor)
  return (
    <div>
    <div className="doctor-item" >
              <div className="img-container">
                <Link to={`/profile/${doctor.id}`}>
                  <img src={doctor.image} alt={doctor.name} />
                </Link>
              </div>
              <div className="bottom-data">
                <Link to={`/profile/${doctor.id}`}>
                  <p className="doctor-name">Dr. {doctor.name}</p>
                </Link>
                <p className="doctor-spec">{doctor.specialization}</p>
                {/* <span className="rate-star"> */}
                {[...Array(doctor.rate)].map((star) => {
                  return (
                    <span className="rate-star">
                      <i class="bi bi-star-fill"></i>
                    </span>
                  );
                })}
                {[...Array(5 - doctor.rate)].map((star) => {
                  return (
                    <span className="rate-star">
                      <i class="bi bi-star"></i>
                    </span>
                  );
                })}
                {/* </span> */}
              </div>
            </div>
    </div>
  )
}

export default Onedoctor