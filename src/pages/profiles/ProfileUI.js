import React, { useState, useEffect } from "react";
import SideBarUI from "../../components/SideBarUI/SideBarUI";
import "./profileui.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Alert, Button, ButtonGroup, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import Avatar from "@material-ui/core/Avatar";
import { BsInfoCircleFill } from "react-icons/bs";
import { blueGrey } from "@material-ui/core/colors";
import { BiMessageDetail } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";

const ProfileUI = () => {
  // const user_data = {
  //     email:"",
  //     username:"madonna",
  //     history:"gg",
  //     gender:"Female",
  //     blood:"O",
  //     date:"12/5/1999",
  //     app:"",
  //     pic:"https://source.unsplash.com/600x300/?student",
  //     address:"42 london st"
  // }

  const [showinfo, setShowinfo] = useState(false);
  const [showhistory, setShowHistory] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);

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
  const token = useSelector((state) => state.auth);
  console.log(token.token);
  const Get_info_api = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://future-medical.herokuapp.com/profile", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          // setuser_data()
          user_data2.email = res.data.email;
          user_data2.username = res.data.username;
          for (var i = 0; i < res.data.history.disease; i++) {
            user_data2.history[i] = res.data.history[i];
          }

          user_data2.pic = res.data.icon;

          //setuser_data(user_data);
          resolve(user_data2);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  useEffect(() => {
    Get_info_api().then((res) => {
      console.log(res);
      setuser_data(res);
    });
  }, []);

  const app = [
    { id: "0", date: "10/12/2021", time: "10:00", dr_name: "kk", state: "" },
    { id: "1", date: "15/12/2021", time: "10:00", dr_name: "mm", state: "" },
    { id: "2", date: "20/12/2021", time: "10:00", dr_name: "ll", state: "" },
    { id: "3", date: "25/12/2021", time: "10:00", dr_name: "ll", state: "" },
    { id: "4", date: "29/12/2021", time: "10:00", dr_name: "ll", state: "" },
  ];
  const current = new Date();
  const today_date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  console.log(today_date);
  // for (var i = 0; i < Object.keys(app).length; i++) {
  //    if(app.date[i]>=today_date) app.state="pending";
  //    else app.state="done";
  //   }
  //   console.log(app);
  for (let a in app) {
    console.log(`${app[a].date} `);
    const day = app[a].date.split("/");
    console.log(day[2]);

    if (
      parseInt(day[0]) === parseInt(current.getDate()) &&
      parseInt(day[1]) === parseInt(current.getMonth() + 1) &&
      parseInt(day[2]) === parseInt(current.getFullYear())
    )
      app[a].state = "today";
    else if (
      (parseInt(day[0]) < parseInt(current.getDate()) &&
        parseInt(day[1]) <= parseInt(current.getMonth() + 1)) ||
      parseInt(day[2]) < parseInt(current.getFullYear())
    )
      app[a].state = "done";
    else app[a].state = "pending";
    // if (app[a].date === today_date) app[a].state="today";
    // else if(app[a].date < today_date) app[a].state="done";
    // else app[a].state="pending";
  }
  console.log(app);
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
  //const hist = {...user_data.history};

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
  const [newapp, setnewapp] = useState(app);

  console.log(newapp);
  const remove = (e, id) => {
    const newp = newapp.filter((item) => item.id !== id);
    setnewapp(newp);
  };

  const sideBarhandler = (btn) => {
    if (btn === "info") {
      setShowinfo(true);
      setShowHistory(false);
      setShowAppointment(false);
    } else if (btn === "history") {
      setShowinfo(false);
      setShowHistory(true);
      setShowAppointment(false);
    } else if (btn === "appointment") {
      setShowinfo(false);
      setShowHistory(false);
      setShowAppointment(true);
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
            {token.usertype === "user" ? (
              <h3>{user_data.username}</h3>
            ) : (
              <h3></h3>
            )}
          </div>
          {/* <div className="user-Email">
            {token.usertype === "user" ? (
              <p className="mb-0">
                <strong className="pr-1">Email: </strong>
                {user_data.email}
              </p>
            ) : (
              // <p className="mb-0">
              //   <strong className="pr-1">Email: </strong>
              // </p>
              ""
            )}
          </div> */}
        </div>
        <div className="sidebar-links">
          {/* <ul className="sidebar-links"> */}
          <li onClick={() => sideBarhandler("info")}>
            <i class="bi bi-info-circle-fill"></i>
            {compact ? "" : <span> Personnal Info</span>}
          </li>
          <li onClick={() => sideBarhandler("history")}>
            <i class="bi bi-chat-left-text-fill"></i>
            {compact ? "" : <span> History</span>}
          </li>
          <li onClick={() => sideBarhandler("appointment")}>
            <i class="bi bi-clock-fill"></i>
            {compact ? "" : <span> Appointments</span>}
          </li>
          {/* </ul> */}
        </div>
      </SideBarUI>
      <main>
        <div className="profile-container">
          {showinfo ? (
            <div className="card">
              <div className="card-header bg-transparent">
                <h3 className="mb-0">
                  <BsInfoCircleFill /> Personal Information
                  {token.usertype === "user" ? (
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setEdit(true)}
                    ></EditIcon>
                  ) : (
                    ""
                  )}
                </h3>
                {/* <Button variant="outline-secondary">Secondary</Button> 
            <svg data-testid="EditIcon"></svg>
            */}
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

                  {token.usertype === "user" ? (
                    <h3>{user_data.username}</h3>
                  ) : (
                    <h3></h3>
                  )}
                </div>
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {token.usertype === "user" ? user_data.email : ""}
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
                      edit_data.gender
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
                      edit_data.blood
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
          {showhistory ? (
            <div className="card">
              <div className="card-header bg-transparent border-0">
                <h3 className="mb-0">
                  <BiMessageDetail /> History
                  {token.usertype === "user" ? (
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setEdit_h(true)}
                    />
                  ) : (
                    ""
                  )}
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
        {showAppointment ? (
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
                    {newapp.map((item) => (
                      <tr key={item.id}>
                        <td width="33%">{item.date}</td>
                        <td width="33%">{item.time}</td>
                        <td width="33%">{item.dr_name}</td>
                        <td width="33%">
                          {item.state === "pending" ? (
                            <Button
                              variant="outline-danger"
                              onClick={(e) => remove(e, item.id)}
                            >
                              <CancelIcon />
                            </Button>
                          ) : item.state === "today" ? (
                            <Alert variant="danger">Today</Alert>
                          ) : (
                            "Done"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default ProfileUI;
