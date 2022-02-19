import React , {useState} from "react";
import './profile.css';
import { Alert ,Button,ButtonGroup,Form, Stack} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar';
import BackupIcon from '@material-ui/icons/Backup';

const Profile =()=>{
    const user_data = {
        email:"",
        username:"madonna",
        history:"gg",
        gender:"Female",
        blood:"O",
        date:"12/5/1999",
        app:"",
        pic:"https://source.unsplash.com/600x300/?student",
        address:"42 london st"
    }
    const app=[
        {id:"0",date:"10/12/2021",time:"10:00", dr_name:"kk",state:""},
        {id:"1",date:"15/12/2021", time:"10:00" , dr_name:"mm",state:""},
        {id:"2",date:"20/12/2021", time:"10:00", dr_name:"ll",state:""},
        {id:"3",date:"25/12/2021", time:"10:00", dr_name:"ll",state:""},
        {id:"4",date:"29/12/2021", time:"10:00", dr_name:"ll",state:""}
    ];
    const current = new Date();
    const today_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    console.log(today_date);
    // for (var i = 0; i < Object.keys(app).length; i++) {
    //    if(app.date[i]>=today_date) app.state="pending";
    //    else app.state="done";
    //   }
    //   console.log(app);
    for(let a in app){
        console.log(`${app[a].date} `);
        const day = (app[a].date).split('/');
        console.log(day[2]);
      
        if (parseInt(day[0]) === parseInt(current.getDate()) && parseInt(day[1]) === parseInt(current.getMonth()+1) && parseInt(day[2]) === parseInt(current.getFullYear()) ) app[a].state="today";
        else if(parseInt(day[0]) < parseInt(current.getDate()) && parseInt(day[1]) <= parseInt(current.getMonth()+1) || parseInt(day[2]) < parseInt(current.getFullYear()) ) app[a].state="done";
       
        else app[a].state="pending";
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
   const [edit,setEdit]=useState(false);
  const [edit_h,setEdit_h]=useState(false);
  const [edit_photo,setEdit_photo]=useState(false);
  const [newh,setnewh]=useState("");
  //const [edit_history,setedit_history]=useState(user_data.history);
  const [edit_data,seteditdata]=useState(user_data);
  const setedit_history=()=>{
    edit_data.history+=(" "+newh);  //asssssk 
    seteditdata(edit_data);
    setEdit_h(false);
  }
  //const hist = {...user_data.history};
 
   const editted = {...user_data};
  
   const setdata=()=>{
       
        editted.address=add;
       
        editted.gender=gender;
        
        editted.date=date;
        
        editted.blood=blood;
        
        if (editted.address!==null) user_data.address=editted.address;
        if (editted.blood!==null) user_data.blood=editted.blood;
        if (editted.date!==null) user_data.date=editted.date;
        if (editted.gender!==null) user_data.gender=editted.gender;
        console.log(user_data);
        console.log(editted);
        //edit=false;
        seteditdata(user_data); //edit in database
        setEdit(false);
   }
   const [newapp,setnewapp]=useState(app);
   
   console.log(newapp);
   const remove=(e,id)=>{
    const newp = newapp.filter((item)=> item.id !== id );
    setnewapp(newp);
   }
    return(

        <div className="student-profile py-4">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow-sm">
             
          <div className="card-header bg-transparent text-center">

            {/* <img className="profile_img" src={user_data.pic} alt="student dp"/> */}
            {/* <Avatar className="profile_img"  alt="Remy Sharp" src="/broken-image.jpg" >
                B
            </Avatar> */}
           {/* <div>
               
           <Avatar className="profile_img" src="/broken-image.jpg" />
           <Button onClick={(e)=>setEdit_photo(true)}>
           <BackupIcon ></BackupIcon> upload
           </Button>
           {edit_photo ? <input type="file"></input>:""}
           
           </div> */}
           <Avatar className="profile_img" src="/broken-image.jpg" onClick={(e)=>setEdit_photo(true)} />
           {edit_photo ? <input type="file"></input>:""}
         
            
          
            <h3>{user_data.username}</h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong className="pr-1">Email: </strong>{user_data.email}</p>
            
            
          </div>
        </div>
      </div>
      <br/>
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            <h3 className="mb-0"><i className="far fa-clone pr-1"></i>Personal Information <EditIcon onClick={(e)=>setEdit(true)}></EditIcon></h3>  
            {/* <Button variant="outline-secondary">Secondary</Button> 
            <svg data-testid="EditIcon"></svg>
            */}
            
          </div>
          <div className="card-body pt-0">
            <table className="table table-bordered">
              <tr>
                <th width="30%">Address</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.address} onChange={(e)=>setadd(e.target.value)}></input>:edit_data.address}</td>
              </tr>
              <tr>
                <th width="30%">Date of Birth	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.date} type="date" onChange={(e)=>setDob(e.target.value)}></input>:edit_data.date}</td>
              </tr>
              <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>{edit ? <div>
                    <input type="radio" id="gender1" name="gender" value="Male" onChange={(e)=>setGender(e.target.value)} />
                    <label for="gender1"> Male</label><br/>
                    <input type="radio" id="gender2" name="gender" value="Female"  onChange={(e)=>setGender(e.target.value)}></input>
                    <label for="gender2"> Female</label>
                </div>:edit_data.gender}</td>
              </tr>
              
              <tr>
                <th width="30%">blood</th>
                <td width="2%">:</td>
                <td>{edit ? 
                <div>
                    <select onChange={(e)=>setblood(e.target.value)}>
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
                :edit_data.blood}</td>
               </tr>
              <br/>
              
            </table>
            {edit ? 
              <ButtonGroup>
              <Button variant="outline-success" className="col-md-12 text-right" onClick={setdata}>Submit</Button>
              <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>
              </ButtonGroup>
              :""} 
              {/* {edit ? <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>:""} */}
             
          </div>
        </div>
        <br/>
          <div styled="height: 26px"></div>
          
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            
            <h3 className="mb-0"><i className="far fa-clone pr-1"></i>History  <EditIcon onClick={(e)=>setEdit_h(true)}/></h3>
          </div>
          <div className="card-body pt-0">
              <p>{edit_h ? 
               <Form.Control
               as="textarea"
               placeholder="Update History"
               onChange={(e)=>setnewh(e.target.value)}
               style={{ height: '100px' }}
               />
            //   <input onChange={(e)=>setnewh(e.target.value)}></input>
              :edit_data.history}</p>
             
               
              
              {edit_h ? 
            //   <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
              <ButtonGroup>
              <Button variant="outline-success" className="col-md-12 text-right" onClick={setedit_history}>Submit</Button>
              <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit_h(false)}>Cancel</Button>
              </ButtonGroup>
              :""}
          </div>
        </div>
        <br/>
          <div styled="height: 26px"></div>
          
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            
            <h3 className="mb-0"><i className="far fa-clone pr-1"></i>Appointments</h3>
          </div>
          <div className="card-body pt-0">
          <tr>
                <th width="30%">Date</th>
                <th width="30%">Time</th>
                <th width="30%">Dr Name</th>
               
                <th width="30%">State</th>
               
              </tr>
              {
                  newapp.map((item)=>
                    <tr key={item.id}>
                    <td width="33%">{item.date}</td>
                    <td width="33%">{item.time}</td>
                    <td width="33%">{item.dr_name}</td>
                    <td width="33%">{item.state==="pending" ? <Button variant="outline-danger" onClick={(e)=>remove(e,item.id)}><CancelIcon/></Button>
                    
                    :item.state==="today" ? 
                    <Alert variant="danger" >
                   Today
                  </Alert>
                    :"Done"}</td>
                   
                  </tr>
                  )
              }
             
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
export default Profile;