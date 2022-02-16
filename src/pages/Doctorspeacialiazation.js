import React,{useState} from 'react'
import HighlyRated from '../components/Highly_Rated_DR/HighlyRated'
import { useParams } from "react-router-dom";
import {DoctorsSpecialization} from '../data'
import Onedoctor from '../components/Highly_Rated_DR/Onedoctor';

function Doctorscards() {
    const [doctors,setdoctors] =  useState(DoctorsSpecialization);
    const params = useParams();
    const specializationid = params.specializationid; ///TO GET DOCTORS IN THIS DEPARTMENT 
  return (
    <>
           <div>
      <section className="section-container">
        <div className="doctors-container">
          {doctors.map((doctor) => (
            <Onedoctor doctor={doctor} key={doctor.id}/>
          ))}
        </div>
      </section>
    </div>
    </>
  )
}

export default Doctorscards