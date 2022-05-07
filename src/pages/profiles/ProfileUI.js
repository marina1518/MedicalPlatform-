import React, { useState, useEffect } from "react";
import SideBarUI from "../../components/SideBarUI/SideBarUI";
import "./profileui.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {  Button, ButtonGroup, Form, Table,Card, Accordion,  useAccordionButton, Row, Col,Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import Avatar from "@material-ui/core/Avatar";
import { BsInfoCircleFill } from "react-icons/bs";
import { blueGrey } from "@material-ui/core/colors";
import { BiMessageDetail } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import {GiMedicines} from 'react-icons/gi';
import {MdOutlineDone,MdCancel} from 'react-icons/md';
import { signin } from "../../actions";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import { info, history , appointments ,myorders , prescription} from "../../actions";
//import VideoChat from '../../components/Meeting_room/Video_chat/VideoChat'

const ProfileUI = () => {
  const dispatch = useDispatch();  
  const sidebar_profile = (useSelector((state) => state.profile_reducer)); //state of token
  
  const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token.token);
  var token_copy = token;
  const [orders,setorders] = useState([]);

  const config = {headers: {
    'Authorization': `Bearer ${token.token}`}};
   
  const get_ph_order = async ()=>{
    try {
           const res = await axios.get('https://future-medical.herokuapp.com/user/orders' ,
            config
           )

           console.log(res.data);
           if (res.data==="you have no orders yet") return
           setorders(res.data);
         
       } 
       catch (err) {
           console.error(err);
       }
   }

   const cancel_order = async (id)=>{
    try {
           const res = await axios.patch('https://future-medical.herokuapp.com/user/order/cancel' ,
           {id:id }, config
           )
           console.log(res.data);
           alert('Order cancelled successfully')
           get_ph_order();
           //setorders(res.data);
       } 
       catch (err) {
           console.error(err);
       }
   }

   const approve_order = async (id)=>{
    try {
           const res = await axios.patch('https://future-medical.herokuapp.com/user/order/approve' ,
              {id:id }, config
           )
           console.log(res.data);
           alert('Order approved')
           get_ph_order();
           //setorders(res.data);
       } 
       catch (err) {
           console.error(err);
       }
   }

   const[pres, setpres]=useState([]);

   const get_pres = async ()=>{
    try {
           const res = await axios.get('https://future-medical.herokuapp.com/user/prescriptions' ,
            config
           )

           console.log(res.data);
           if (res.data==="you have no prescriptions yet") return
           setpres(res.data);
         
       } 
       catch (err) {
           console.error(err);
       }
   }

   useEffect(()=>{
   get_ph_order(); 
   get_pres();  
   get_meetings();
   },[]) 

   const Edit_personal_info = async (info)=>{
    try {
           const res = await axios.patch('https://future-medical.herokuapp.com/user/edit/info' ,info,config)
            alert(res.data);
           console.log(res.data);
         
       } 
       catch (err) {
           console.error(err);
       }
   }

   const Edit_history = async (history)=>{
    try {
           const res = await axios.patch('https://future-medical.herokuapp.com/user/edit/history' ,{history:history},config)
            alert(res.data);
           console.log(res.data);
         
       } 
       catch (err) {
           console.error(err);
       }
   }

 

//edit personal info
  const [add, setadd] = useState(null);
  const [blood, setblood] = useState(null);
  const [gender, setGender] = useState(null);
  const [date, setDob] = useState(null);
  const [user_name, setuser_name] = useState(null);
  const [email, setemail] = useState(null);
  
  //edit photo
  const [edit, setEdit] = useState(false);
  const [edit_photo, setEdit_photo] = useState(false);

  const Edit_profile_pic = async (url)=>{
    try {
           const res = await axios.patch('https://future-medical.herokuapp.com/user/edit/photo' ,{profilePic:url},config)
            alert(res.data);
           console.log(res.data);
       } 
       catch (err) {
           console.error(err);
       }
   }

   const [temp,edit_pic_temp]=useState("");
   const edit_pic =  (file) =>{
    if (!file) return
    console.log(file)
    console.log(file.name)
    const storageRef = ref(storage,`/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,file);
     uploadTask.on("state_changed",()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
          Edit_profile_pic(url);
           token_copy.profilePic=url;
           dispatch(signin(token_copy));
        }).catch((err)=>{console.log(err)})
    })
    }

//edit history
  const [edit_h, setEdit_h] = useState(false);
  const [newh, setnewh] = useState(token.history);
  const setedit_history = () => {
    Edit_history(newh);
    token_copy.history=newh;
    dispatch(signin(token_copy));
    setEdit_h(false);
  };
  
  var Edit_data={};
  const editted = {};

  const setdata = () => {
    editted.address = add;
    editted.gender = gender;
    editted.date = date;
    editted.blood = blood;
    editted.user_name = user_name;
    editted.email = email;

    if (editted.address !== null) 
    {
      Edit_data.address=editted.address; //user_data.address = editted.address;
      //token
    }
    if (editted.user_name !== null) {
      Edit_data.username=editted.user_name; //user_data.blood = editted.blood;
      token_copy.username = editted.user_name;
      //dispatch(signin(token_copy));
    }
    if (editted.email !== null) {
      Edit_data.email=editted.email; //user_data.blood = editted.blood;
      token_copy.email = editted.email;
      //dispatch(signin(token_copy));
    }
    if (editted.blood !== null) {
      Edit_data.blood=editted.blood; //user_data.blood = editted.blood;
      token_copy.blood = editted.blood;
      //dispatch(signin(token_copy));
    }
    if (editted.date !== null)  
    {Edit_data.dateOfBirth=editted.date; //user_data.date = editted.date;
    token_copy.dateOfBirth=editted.date;
    //dispatch(signin(token_copy));
  }
    if (editted.gender !== null)
    { Edit_data.gender=editted.gender; //user_data.gender = editted.gender;
    token_copy.gender=editted.gender;
    
    }
    console.log(Edit_data);
    dispatch(signin(token_copy));
    Edit_personal_info(Edit_data);
    Edit_data={};
    setEdit(false);
  };


  const[meetings_api,setmeetings]=useState([]);
    const get_meetings = async ()=>{
      try {
             const res = await axios.get('https://future-medical.herokuapp.com/user/meetings' ,
              config
             )
  
             console.log(res.data);
             //if (res.data==="you have no orders yet") return
             setmeetings(res.data);
           
         } 
         catch (err) {
             console.error(err);
         }
     }
  
  var meetings=[];
  const current = new Date();
  let state;
  for(var i=0;i<meetings_api.length;i++)
  {
    const day = (meetings_api[i].Date).split('-');
    if(parseInt(day[2])<current.getFullYear()) state = 'Done'; //year check
    else if (parseInt(day[2])>current.getFullYear()) state = 'Pending'; //next year
    else if ((parseInt(day[1])===current.getMonth()+1) && (parseInt(day[0])===current.getDate()) && (parseInt(day[2])===current.getFullYear())) state= 'Today'; 
    else if ((parseInt(day[1])<current.getMonth()+1) ) state = 'Done'; //month check
    else if ((parseInt(day[1])===current.getMonth()+1) && (parseInt(day[0])<current.getDate()) ) state = 'Done'; //month check
    else state = 'Pending';
    meetings.push({id:i, dr_name:meetings_api[i].doctor.username, slot:meetings_api[i].slot, date:meetings_api[i].Date, state:state, email:meetings_api[i].doctor.email})
 
  }
  meetings.sort((a,b) =>
  {const c=new Date(a.date.split('-').reverse().join('-'));
  const d=new Date(b.date.split('-').reverse().join('-'));
   return c-d;}
  );
 

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log(' '), );
    return (<Button type="button" onClick={decoratedOnClick}  variant="primary">{children}</Button>);}


  const [compact, setCompact] = useState(false);

  const compacthandler = () => {
    setCompact(!compact);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setCompact(true);
      } else if (window.innerWidth > 1065) {
        setCompact(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

const [open, setOpen]=useState(false);

  return (
    <div className="main-container">
      <SideBarUI compact={compact} oncompact={compacthandler}>
        <div>
          <div className="image-container">
            <Avatar
              className="profile_img"
              src={token.profilePic}
              sx={{ width: 50, height: 50, bgcolor: blueGrey[400] }}
            />
            
              <h3>{token.username}</h3>
        
          </div>
          </div>
        <div className="sidebar-links">
          {/* <ul className="sidebar-links"> */}
          <li onClick={() => dispatch(info())}>
            <i class="bi bi-info-circle-fill"></i>
            {compact ? "" : <span> Personnal Info</span>}
          </li>
          <li onClick={() => dispatch(history())}>
            <i class="bi bi-chat-left-text-fill"></i>
            {compact ? "" : <span> History</span>}
          </li>
          <li onClick={() => dispatch(appointments())}>
            <i class="bi bi-clock-fill"></i>
            {compact ? "" : <span> Appointments</span>}
          </li>
          <li onClick={() => dispatch(myorders())}>
          <i class="bi bi-bandaid-fill"></i>
            {compact ? "" :  <span> Orders</span>}
          </li>
          <li onClick={() => dispatch(prescription())}>
          <i class="bi bi-file-medical-fill"></i> 
            {compact ? "" :  <span> Prescriptions</span>}
           </li>
      
        </div>
      </SideBarUI>
      <main>
        <div className="profile-container">
          {(sidebar_profile === "info")  ? (
            <div className="card">
              <div className="card-header bg-transparent">
                <h3 className="mb-0">
                  <BsInfoCircleFill /> Personal Information
                   
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setEdit(true)}
                    ></EditIcon>
                  
                </h3>
               
              </div>
              <div className="card-body pt-0">
                <div className="row personnal-image">
                  <Avatar
                    className="profile_img"
                    src={token.profilePic}
                    onClick={(e) => setEdit_photo(!edit_photo)}
                    sx={{ width: 56, height: 56, bgcolor: blueGrey[400] }}
                  />
                  {edit_photo ? (
                    <>
                    <input className="edit-photo" type="file" onChange={(e)=>edit_pic_temp(e.target.files[0])}></input>
                    {temp ==="" ? "" :<ButtonGroup>
                        <Button
                          variant="outline-success"
                          className="col-md-12 text-right"
                          onClick={(e)=>{edit_pic(temp);setEdit_photo(false);}}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="col-md-12 text-right"
                          onClick={(e) => setEdit_photo(false)}
                        >
                          Cancel
                        </Button>
                      </ButtonGroup>}</>
                  ) : (
                    ""
                  )}
                  {edit ? 
                  <input
                  style={{ cursor: "pointer" }}
                  placeholder={token.username}
                  type="text"
                  onChange={(e) => setuser_name(e.target.value)}
                ></input>
               : 
                <h3 style={{textAlign:'center'}}>{token.username}</h3>
                }
                   
                </div>
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">                     
                  {edit ? 
                  <input
                  style={{ cursor: "pointer" }}
                  placeholder={token.email}
                  type="text"
                  onChange={(e) => setemail(e.target.value)}
                ></input>
               : 
                token.email
                }
                  </div>
                </div>
                {/* <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        placeholder={token.address}
                        onChange={(e) => setadd(e.target.value)}
                      ></input>
                    ) : (
                      token.address
                    )}
                  </div>
                </div> */}
                {/* <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Data of Birth</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        style={{ cursor: "pointer" }}
                        placeholder={token.date}
                        type="date"
                        onChange={(e) => setDob(e.target.value)}
                      ></input>
                    ) : (
                      edit_data.date
                    )}
                  </div>
                </div> */}
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Gender</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <div>
                        <input
                          style={{ cursor: "pointer" }}
                          type="radio"
                          id="gender1"
                          name="gender"
                          value="Male"
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label for="gender1"> Male</label>
                        <br />
                        <input
                          style={{ cursor: "pointer" }}
                          type="radio"
                          id="gender2"
                          name="gender"
                          value="Female"
                          onChange={(e) => setGender(e.target.value)}
                        ></input>
                        <label for="gender2"> Female</label>
                      </div>
                    ) : (
                      token.gender
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Blood</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <div>
                        <select
                          style={{ cursor: "pointer" }}
                          onChange={(e) => setblood(e.target.value)}
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    ) : (
                      token.blood
                    )}
                  
                  </div>
                </div>
                {edit ? (
                  <ButtonGroup>
                    <Button
                      variant="outline-success"
                      className="col-md-12 text-right"
                      onClick={setdata}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="col-md-12 text-right"
                      onClick={(e) => setEdit(false)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                ) : (
                  ""
                )}
                {/* {edit ? <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>:""} */}
              </div>
            </div>
          ) : (
            ""
          )}
          {(sidebar_profile === "history")  ? (
            <div className="card">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <BiMessageDetail /> History
                  {  
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setEdit_h(true)}
                    />
                   }
                </h3>
              </div>
              <div className="card-body pt-0">
                <p>
                  {edit_h ? (
                    <Form.Control
                      as="textarea"
                      placeholder="Update History"
                      value={newh}
                      onChange={(e) => setnewh(e.target.value)}
                      style={{ height: "100px" }}
                    />
                  ) : (
                    //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                    token.history
                  )}
                </p>

                {edit_h ? (
                  //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
                  <ButtonGroup>
                    <Button
                      variant="outline-success"
                      className="col-md-12 text-right"
                      onClick={setedit_history}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="col-md-12 text-right"
                      onClick={(e) => setEdit_h(false)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {(sidebar_profile === "appointments") ? (
          <div className="card">
            <div className="card-header bg-transparent border-0">
              <h3 className="mb-0">
                <AiFillClockCircle /> Appointments
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th width="20%">Date</th>
                      <th width="20%">Time</th>
                      <th width="20%">Dr Name</th>
                      <th width="20%">Meeting</th>

                      <th width="20%">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      meetings.lenght === 0 ? "":
                      <>
                      {meetings.reverse().map((item) => (
                        <tr key={item.id} style={item.state ==="Pending" ? {opacity:"1"}:(item.state==="Today" ? {background:"#B9D9EB"}:{opacity:"0.5"}) }>
                          <td width="20%">{item.date}</td>
                          <td width="20%">{item.slot}</td>
                          
                          <td style={{cursor:"pointer"}} width="20%">{item.dr_name}</td>
                          {/* <td width="20%">{item.state ==="Today" ? <VideoChat dr_email={item.email}/>:""}</td> */}
                          <td width="20%">{item.state}</td>
                          </tr>
                      ))}
                      </>
                    }
                    
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}



{(sidebar_profile === "myorders") ? 
          <div className="card shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h3 className="mb-0">
                <GiMedicines /> Orders
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <Table responsive="sm">
                  <thead>
                    <tr>
                    <th >Pharmacy Name</th>
                      <th >Date</th>
                      <th >Time</th>
                      <th >Price</th>
                      <th >Order</th>
                      <th >State</th>  
                      <th ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.length ===0 ? "": 
                      <>
                       {orders.map((item) => (
                      <tr key={item._id}>
                        <td >{item.pharmacy.name}</td>
                        <td >{item.order_data.Date.split('T')[0]}</td>
                        <td >{item.order_data.Date.split('T')[1]}</td>
                        <td >{item.price}</td>
                        <td >
                        <Accordion defaultActiveKey="0">
     
                      
                  <CustomToggle eventKey={item._id}>Show order</CustomToggle>
                
                <Accordion.Collapse eventKey={item._id}>
                  <Card.Body>
                  <img id="myImg" src={item.order_data.form} width="300px" height="300px" onClick={(e)=>setOpen(true)}/>

              {
                open ? 
                <div id="myModal" class="modal_image">
                <span class="close" onClick={(e)=>setOpen(false)}>&times;</span>
                <img class="modal-content"  src={item.order_data.form}/>
              
              </div>

              :""
              }
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
      
                        </td>
                        <td >
                        {(item.status !== "pending" && item.status !== "approved") && <td>{item.status}</td>  }
                          {
                            item.status === "pending" &&  <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>cancel_order(item._id)} ><MdCancel/></Button>
                          }
                          </td>
                       {
                       item.status === "approved" && 
                        <td> <ButtonGroup>
                       <Button variant="outline-success" className="col-md-12 text-right" onClick={(e)=>approve_order(item._id)} ><MdOutlineDone/></Button>
                       <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>cancel_order(item._id)} ><MdCancel/></Button>
                       </ButtonGroup>
                                 </td> }
                        
                        </tr>
                    ))}
                      </>
                    }
                   
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
         : 
          ""
        }




{(sidebar_profile === "prescription") ? 

  pres.length ===0 ? 
  <>
    <Alert key="primary" variant="primary">
      There are no prescriptions yet.
    </Alert>
</>
:

          // <CardGroup>
            <Row xs={1} md={2} className="g-4">
            <Col>
         {
           
           pres.map((p) => 
            <Card>
            <Card.Body>
              <Card.Title>Prescriptions</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{p.Date.split('T')[0].split('-').reverse().join('-')}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Dr {p.doctor.username}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{p.doctor.email}</Card.Subtitle>
              <Card.Text>
                {p.medicines.map(m=>
                  <li>{m}</li>
                  )}
              </Card.Text>
            </Card.Body>
          </Card>
            )
         } 
         </Col>
         </Row>
        // </CardGroup>
         : 
          ""
        }


      </main>
    </div>
  );
};

export default ProfileUI;
