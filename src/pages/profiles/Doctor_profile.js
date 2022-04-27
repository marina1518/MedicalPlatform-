import React , {useState, useEffect} from "react";
import './profile.css';
import {ListGroup,  Form, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';
import {BsInfoCircleFill} from 'react-icons/bs';
import {AiOutlineComment} from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from "react-redux";
import {GiNotebook} from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Calender from './../../components/Calendar/Calendar';


const Doctor =()=>{
  
  
  const location = useLocation();
  const [Docid, setdoctorid] = useState(location.state ? location.state : "");
  console.log(Docid);
  
  const token = useSelector(state => state.auth);
  console.log(token.token)
  let [doctor_data,setdoctor_data]=useState({});
  let Doctor_Api = {};
  let rr=[];
  let [show_rev, setshoe_rev] = useState([]);
  let [dr_timetable, setdr_timetable] = useState([]);
 console.log(doctor_data);
const Get_info_api = async ()=>{
 try {
        const res = await axios.get(`https://future-medical.herokuapp.com/user/doctor/${Docid.Doctor_id}`)
        const data = await res.data;
        console.log(data)
        Doctor_Api.username = data.username ; 
        Doctor_Api.email = data.email ;
        Doctor_Api.profilePic = data.profilePic ;
        Doctor_Api.specialization = data.specialization;
        Doctor_Api.telephone = data.telephone[0];
        Doctor_Api.entityflag = data.entity_id.flag;
        Doctor_Api.entityname = data.entity_id.name; 
       // Doctor_Api.reviews = data.reviews;
       
       for(var i =0; i<data.reviews.length;i++)
       {
          rr.push(data.reviews[i]);
       }
       setshoe_rev(rr);
       rr=[];
       for(var i =0; i<data.timetable.length;i++)
       {
          rr.push(data.timetable[i]);
       }
       setdr_timetable(rr);
        setdoctor_data(Doctor_Api);
        //setdoctor_data(data);  
    } 
    catch (err) {
        console.error(err);
    }
}

const [rev,setreview] = useState("");
const [revf,setreviewf] = useState({review:""});
const r={review:""};
const Write=(e)=>{
  e.preventDefault();
 r.review=rev;
  setreviewf(r);
  sets(false);
  write_review();
}


const write_review = async ()=>{
  try {
         const res = await axios.patch(`https://future-medical.herokuapp.com/user/review/doctor/${Docid.Doctor_id}`,
         revf
         )
        console.log(res.data);
     } 
     catch (err) {
         console.error(err);
     }
 }
    
  
  useEffect(()=>{
    Get_info_api();   
   },[]) 

   
 const [s,sets] = useState(false);
    return(

        <div className="student-profile py-4">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow-sm">
             
          <div className="card-header bg-transparent text-center">

           <Avatar style={{ cursor: "pointer"}} className="profile_img" src={doctor_data.profilePic}//doctor_data.profilePic} 
          />
         
          <h3>Dr {doctor_data.username}</h3> 
          </div>
          <div className="card-body">
          <p className="mb-0"><strong className="pr-1">Email: </strong>{doctor_data.email}</p>     
          </div>
          </div>
          <br/>
          <div styled="height: 26px"></div>
          <div className="card shadow-sm">
             
             <div className="card-header bg-transparent">
               <Row>
               <Col>
               <p className="mb-0"><strong className="pr-1"> <AiOutlineComment /> Reviews: </strong> </p> 
                 </Col>
                 <Col>
                 <button style={{cursor:"pointer", borderRadius:"50%", background:"white", border:"None"}} onClick={()=>sets(true)}><AddCircleIcon/></button>
                 </Col>
               </Row>
            
             <br/>
           
             {s ? <div>
               <Row>
                 <Col>
                 <Form.Control
                      as="textarea"
                      placeholder="Write your Review here ..."
                      onChange={(e) => setreview(e.target.value)}
                      style={{ height: "40px" }}
                    />
                 </Col>
                 <Col>
                 <button style={{cursor:"pointer",  borderRadius:"50%",background:"white", border:"None"}} type="button" onClick={Write}><SendIcon/></button> 
                 </Col>
               </Row>
                      <br/></div>
                   : ""}
       
             {
                 show_rev.map((r=>
                    <ListGroup variant="flush">
                        <div>
                        <ListGroup.Item> {r}</ListGroup.Item>
                        </div>
                        <br/>
                  </ListGroup>
                    ))
             }
</div>
        </div>
      </div>
     

      <br/>
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            <h3 className="mb-0"><BsInfoCircleFill /> Personal Information </h3>
           
          </div>
          <div className="card-body pt-0">
            <table className="table table-bordered">
              <tr>
                <th width="30%">Specialization   </th>
                <td width="2%">:</td>
                <td>{doctor_data.specialization}</td>
              </tr>
              <tr>
                <th width="30%">University	</th>
                <td width="2%">:</td>
                <td>{doctor_data.university}</td>
              </tr>
              <tr>
                {doctor_data.entityflag === 'H' && <th width="30%">Hospital	Name</th>}
                {doctor_data.entityflag === 'C' && <th width="30%">Clinic	Name</th>}
                {/*<th width="30%">Hospital	Name</th>*/}
                <td width="2%">:</td>
                <td> {doctor_data.entityname }</td>
              </tr>
             
                <tr>
                <th width="30%">Personal Phone Number	</th>
                <td width="2%">:</td>
                <td>{doctor_data.telephone}</td>
              </tr>
              <tr>
                <th width="30%">Date of Birth	</th>
                <td width="2%">:</td>
                <td>{doctor_data.date}</td>
              </tr>
            
              <br/>
              
            </table>
           
          </div>
        </div>
      

   { //LOGINED 
     token.token ? 
     
<div>

<br/>
  
 
  <div styled="height: 26px"></div>
  
<div className="card shadow-sm">
  <div className="card-header bg-transparent border-0">
    
    <h3 className="mb-0"><GiNotebook/> Reserve your meeting </h3>
  </div>
  <div className="card-body pt-0">
  <div>
<Calender data={{email:doctor_data.email,timetable: dr_timetable, id:Docid.Doctor_id, token:token.token} }/>

</div>

  </div>
</div>
</div> :""
   }

      </div>
    </div>
  </div>
</div>

    )
}
export default Doctor;