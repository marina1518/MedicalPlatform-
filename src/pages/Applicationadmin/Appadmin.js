import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './Appadmin.css'
import Slidebar from '../../components/Slidebar/slidebar';
import Chart from '../../components/Chart/Chart';
import { data } from '../../Dummyvalues';
import { Clinic } from '../../Dummyvalues';
import { pharmacy } from '../../Dummyvalues';
import Piechart from '../../components/Chartpie/Piechart';
import Hospitals from '../../components/Hospitals/Hospitals';
import Clinics from '../../components/Clinics/Clinics';
import Pharmacies from '../../components/Pharmacies/Pharmacies';
import Announcemts from '../../components/Announcements/Announcemts';
import {useSelector,useDispatch} from 'react-redux'
export default function Appadmin() {
   const chosencomp = useSelector(state => state.sidebarcomp) //state of sidebar component
   console.log(chosencomp);
    const [response,setresponse] = useState({})
    const [prod,setprod]=useState([])
    //const [Comp,setComp]=useState('Chart')

//const changecomp =(value)=>{
  // setComp(value);
//}    
const url = "https://randomuser.me/api"

const get = async () => {
    try {
        const resp = await axios.get(url)
        const res = await resp.data;
        setresponse(res); 
        //  setcartitems(res);
        console.log(res);
    } catch (err) {
        
        console.error(err);
    }
};
const sendpostRequest = async () => {
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/getbyId',
         {
                              id:"61aa3c63ae8cc43f92f742e5",
                              region:"South America"
                         

         });

          const res = await resp.data;
         setprod(res);
          
        console.log(res);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
            
useEffect(()=>{
    //get();
    sendpostRequest();
},[])
    return (
        <div style={{display:'flex' , margin:'0'}}>
            
         <Slidebar >
         </Slidebar >   
         <div className='otherpages'>
           { (chosencomp==='chart') && <Piechart/>}
          { (chosencomp==='chart') && <Chart data={data} dataKey={"Active Hospital"} title={"Hospital Analytics"}/>}
        { (chosencomp==='chart') &&  <Chart data={Clinic} dataKey={"Active Clinic"} title={"Clinic Analytics"}/>}
        { (chosencomp==='chart') && <Chart data={pharmacy} dataKey={"Active Pharmacy"} title={"Pharmacy Analytics"}/>}
        { (chosencomp==='hospitals') && <Hospitals/>} 
        { (chosencomp==='clinics') && <Clinics/>}
        { (chosencomp==='pharmacies') && <Pharmacies/>}
        { (chosencomp==='announcments') && <Announcemts/>}
        
         </div>
         </div>
    )
}
