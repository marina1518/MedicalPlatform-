import React,{useState,useEffect} from 'react'
import HighlyRated from '../components/Highly_Rated_DR/HighlyRated'
import { useParams } from "react-router-dom";
import {DoctorsSpecialization} from '../data'
import Onedoctor from '../components/Highly_Rated_DR/Onedoctor';
import axios from 'axios';
function DoctorsHospitals() {
    const [doctors,setdoctors] =  useState([]);
    const params = useParams();
    const entityname = params.entityname; ///TO GET DOCTORS IN THIS Entity 
    console.log(entityname)

const Get_Doctors_Entity =()=>{
axios.get(`https://future-medical.herokuapp.com/entity/${entityname}/doctors`).then((res)=>{
console.log(res.data);
if(res.data !== "this entity has no doctors right now"){
setdoctors(res.data)}
}).catch((err)=>{console.log(err)})
}
useEffect(()=>{
Get_Doctors_Entity();
},[])
  return (
    <>
           <div>
      <section className="section-container">
        <div className="doctors-container">
           {(doctors.length !==0 )&&doctors.map((doctor) => (
            <Onedoctor doctor={doctor} key={doctor.id}/>
          ))}
        </div>
      </section>
    </div>
    </>
  )
}

export default DoctorsHospitals