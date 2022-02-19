import React , {useState} from "react";
import './profile.css';
import { Alert ,Button,ButtonGroup,Form, Stack} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';

const Dr_Profile =()=>{
    const user_data = {
        email:"",
        username:"madonna",
        gender:"Female",
        date:"12/5/1999",
        pic:"https://source.unsplash.com/600x300/?student",
       personal_phone:"",
       name_hospital:"",
        edu:"",
        university:""

    }
    const app=[
        {id:"0",date:"10/12/2021",time:"10:00", dr_name:"kk",state:""},
        {id:"1",date:"16/12/2021", time:"10:00" , dr_name:"mm",state:""},
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
     const [edit_photo,setEdit_photo]=useState(false);
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
         
            
          
            <h3>Dr {user_data.username}</h3>
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
            <h3 className="mb-0"><i className="far fa-clone pr-1"></i>Personal Information </h3>  
            {/* <Button variant="outline-secondary">Secondary</Button> 
            <svg data-testid="EditIcon"></svg>
            */}
            
          </div>
          <div className="card-body pt-0">
            <table className="table table-bordered">
            <tr>
                <th width="30%">Specialization	</th>
                <td width="2%">:</td>
                <td>{user_data.edu}</td>
              </tr>
              <tr>
                <th width="30%">University	</th>
                <td width="2%">:</td>
                <td>{user_data.university}</td>
              </tr>
              <tr>
                <th width="30%">Hospital   </th>
                <td width="2%">:</td>
                <td>{user_data.name_hospital}</td>
              </tr>
              <tr>
                <th width="30%">Dr Phone Number	</th>
                <td width="2%">:</td>
                <td>{user_data.personal_phone}</td>
              </tr>
              <tr>
                <th width="30%">Date of Birth	</th>
                <td width="2%">:</td>
                <td>{user_data.date}</td>
              </tr>
              <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>{user_data.gender}</td>
              </tr>
              
              
              <br/>
              
            </table>
            
              {/* {edit ? <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>:""} */}
             
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
                <th width="30%">Patient Name</th>
               
                <th width="30%">State</th>
               
              </tr>
              {
                  app.map((item)=>
                    <tr key={item.id}>
                    <td width="33%">{item.date}</td>
                    <td width="33%">{item.time}</td>
                    <td width="33%">{item.dr_name}</td>
                    <td width="33%">{item.state==="pending" ? "pending"
                    
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
export default Dr_Profile;