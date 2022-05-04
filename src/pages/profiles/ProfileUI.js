import React, { useState, useEffect } from "react";
import SideBarUI from "../../components/SideBarUI/SideBarUI";
import "./profileui.css";
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import {  Button, ButtonGroup, Form, Table,Card, Accordion,  useAccordionButton } from "react-bootstrap";
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
import { info, history , appointments ,myorders } from "../../actions";

const ProfileUI = () => {
  const dispatch = useDispatch();
  const sidebar_profile = (useSelector((state) => state.profile_reducer)); //state of token
  const [showinfo, setShowinfo] = useState(false);
  const [showhistory, setShowHistory] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showorders, setshoworders] = useState(false);

  const [user_data, setuser_data] = useState({
    email: "",
    username: "",
    history: [],
    gender: "",
    blood: "",
    date: "",
    app: "",
    pic: "https://source.unsplash.com/600x300/?student",
    address: "",
  });

  let user_data2 = {};
  const token = JSON.parse(useSelector((state) => state.auth));
  //const token = useSelector((state) => state.auth);

  console.log(token.token);

  const [orders,setorders] = useState([]);
  const config = {headers: {
    'Authorization': `Bearer ${token.token}`}};
   
  const get_ph_order = async ()=>{
    try {
           const res = await axios.get('https://future-medical.herokuapp.com/user/orders' ,
           
            config
           )

           console.log(res.data);
           setorders(res.data);
         
       } 
       catch (err) {
           console.error(err);
       }
   }

   const cancel_order = async (e,id)=>{
    try {
           const res = await axios.delete('https://future-medical.herokuapp.com/user/order/cancel' ,
           
             //config, {id:id }
             {
              headers: {
                'Authorization': `Bearer ${token.token}`
              },
              data: {
                id: id,
              },
            }
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

   

  useEffect(() => {
    /*Get_info_api().then((res) => {
      console.log(res);
      setuser_data(res);
    });*/
  }, []);

  const [add, setadd] = useState(null);
  const [blood, setblood] = useState(null);
  const [gender, setGender] = useState(null);
  const [date, setDob] = useState(null);
  //const [history, setHistory] = useState(null);
  const [edit, setEdit] = useState(false);
  const [edit_h, setEdit_h] = useState(false);
  const [edit_photo, setEdit_photo] = useState(false);
  const [newh, setnewh] = useState("");
  //const [edit_history,setedit_history]=useState(user_data.history);
  const [edit_data, seteditdata] = useState(user_data);
  const setedit_history = () => {
    edit_data.history += " " + newh; //asssssk
    seteditdata(edit_data);
    setEdit_h(false);
  };
  

  const editted = { ...user_data };

  const setdata = () => {
    editted.address = add;

    editted.gender = gender;

    editted.date = date;

    editted.blood = blood;

    if (editted.address !== null) user_data.address = editted.address;
    if (editted.blood !== null) user_data.blood = editted.blood;
    if (editted.date !== null) user_data.date = editted.date;
    if (editted.gender !== null) user_data.gender = editted.gender;
    console.log(user_data);
    console.log(editted);
    //edit=false;
    seteditdata(user_data); //edit in database
    setEdit(false);
  };
  // const [newapp, setnewapp] = useState(app);

  // console.log(newapp);
  // const remove = (e, id) => {
  //   const newp = newapp.filter((item) => item.id !== id);
  //   setnewapp(newp);
  // };
  var meetings=[];
  const current = new Date();
  let state;
  for(var i=0;i<token.meetings.length;i++)
  {
    const day = (token.meetings[i].Date).split('-');
    if(parseInt(day[2])<current.getFullYear()) state = 'Done'; //year check
    else if (parseInt(day[2])>current.getFullYear()) state = 'Pending ...'; //next year
    else if ((parseInt(day[1])<current.getMonth()+1) && (parseInt(day[0])<current.getDate()) ) state = 'Done'; //month check
    else if ((parseInt(day[1])===current.getMonth()+1) && (parseInt(day[0])===current.getDate()) && (parseInt(day[2])===current.getFullYear())) state= 'Today'; 
    else state = 'Pending ...';
    meetings.push({id:i, dr_name:token.meetings[i].doctor.username, slot:token.meetings[i].slot, date:token.meetings[i].Date, state:state})
 
  }


  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log(' '), );
    return (<Button type="button" onClick={decoratedOnClick}  variant="primary">{children}</Button>);}


  const sideBarhandler = (btn) => {
    if (btn === "info") {
      setShowinfo(true);
      setShowHistory(false);
      setShowAppointment(false);
      setshoworders(false);
    } else if (btn === "history") {
      setShowinfo(false);
      setShowHistory(true);
      setShowAppointment(false);
      setshoworders(false);
    } else if (btn === "appointment") {
      setShowinfo(false);
      setShowHistory(false);
      setShowAppointment(true);
      setshoworders(false);
    }
    else if (btn === "orders") {
      get_ph_order();
      setShowinfo(false);
      setShowHistory(false);
      setShowAppointment(false);
      setshoworders(true);
    }
  };

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


  return (
    <div className="main-container">
      <SideBarUI compact={compact} oncompact={compacthandler}>
        <div>
          <div className="image-container">
            <Avatar
              className="profile_img"
              src="/broken-image.jpg"
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
      
        </div>
      </SideBarUI>
      <main>
        <div className="profile-container">
          {(sidebar_profile === "info") ? (
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
                    src="/broken-image.jpg"
                    onClick={(e) => setEdit_photo(!edit_photo)}
                    sx={{ width: 56, height: 56, bgcolor: blueGrey[400] }}
                  />
                  {edit_photo ? (
                    <input className="edit-photo" type="file"></input>
                  ) : (
                    ""
                  )}
                    <h3 style={{textAlign:'center'}}>{token.username}</h3>
                </div>
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">                     
                  {token.email} 
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        placeholder={edit_data.address}
                        onChange={(e) => setadd(e.target.value)}
                      ></input>
                    ) : (
                      edit_data.address
                    )}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Data of Birth</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        style={{ cursor: "pointer" }}
                        placeholder={edit_data.date}
                        type="date"
                        onChange={(e) => setDob(e.target.value)}
                      ></input>
                    ) : (
                      edit_data.date
                    )}
                  </div>
                </div>
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
          {(sidebar_profile === "history") ? (
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
                      onChange={(e) => setnewh(e.target.value)}
                      style={{ height: "100px" }}
                    />
                  ) : (
                    //   <input onChange={(e)=>setnewh(e.target.value)}></input>
                    edit_data.history
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
                      <th width="30%">Date</th>
                      <th width="30%">Time</th>
                      <th width="30%">Dr Name</th>

                      <th width="30%">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      meetings.lenght === 0 ? "":
                      <>
                      {meetings.map((item) => (
                        <tr key={item.id}>
                          <td width="33%">{item.date}</td>
                          <td width="33%">{item.slot}</td>
                          <td width="33%">{item.dr_name}</td>
                          <td width="33%">{item.state}</td>
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
       <img src={item.order_data.form} width="300px" height="300px"/>
     </Card.Body>
   </Accordion.Collapse>


</Accordion>
                  
                        
                        </td>
                        <td >
                          {
                            item.pharmacyRespond ? (item.pharmacyApproval ? "Please approve" : "Cancelled") :"Pending ..."
                          }
                          </td>
                       {
                       item.pharmacyApproval && item.pharmacyRespond ? 
                        <td> <ButtonGroup>
                       <Button variant="outline-success" className="col-md-12 text-right" ><MdOutlineDone/></Button>
                       <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>cancel_order(e,item._id)} ><MdCancel/></Button>
                       </ButtonGroup>
                                 </td> : ""
                        
                        
                       }
                        
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


      </main>
    </div>
  );
};

export default ProfileUI;
