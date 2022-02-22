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
                <Link to={`/clinicdoctor/${doctor._id}`}>
                  <img src={doctor.image} alt={doctor.username} />
                </Link>
              </div>
              <div className="bottom-data">
                <Link to={`/clinicdoctor/${doctor._id}`}>
                  <p className="doctor-name">Dr. {doctor.username}</p>
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