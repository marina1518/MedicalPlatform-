import  React,{useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {DoctorsHospital} from '../../data'
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../components/Table/Table';
import Adddoctor from './Adddoctor';
import Editdoctor from './Editdoctor';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'


export default function Adminhospital() {
  const initstate = {username :"" , email : "" , number : '' , hospitalname : "" , image:""};
  var [admindata,setadmindata] = useState(initstate)
  const token = useSelector(state => state.auth) //state of token 

  var [data,setdata] = useState([]) //FROM API HOSPITALS LIST 

//const [data,setdata] = useState([]) 
let admin = {};
var doctors_list = JSON.parse(JSON.stringify(data));
let doctor = {} ;
    const Get_Doctors_Api = (hospitalname)=>{
      return new Promise ((resolve,reject)=>{
      axios.get(`https://future-medical.herokuapp.com/doctors/${hospitalname}`).then((res)=>{

            console.log(res.data)
            for(var i = 0 ; i < res.data.length ; i++ )
            {
                
                doctor.name = res.data[i].username;
                doctor.id = res.data[i]._id;                
                doctor.Email = res.data[i].email;
                doctor.specialization = res.data[i].specialization;
                doctors_list.push(doctor);
                doctor={}
               
            }
            resolve(doctors_list);
            
            //console.log(hospitals_list)
            
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
      })

      
    }


const Get_Admin_data =()=>{  

  //console.log(token.token)
return new Promise ((resolve,reject)=>{
  axios.get('https://future-medical.herokuapp.com/profile', {
   headers: {
    'Authorization': `Bearer ${token.token}`
  }
})
.then((res) => {  
  console.log(res.data)
  admin.username = res.data.admin.username;
  admin.number = res.data.entity.telephone[0];
  admin.email = res.data.admin.email;
  admin.hospitalname = res.data.entity.name;
  admin.address = res.data.entity.address;
  resolve(admin);
  Get_Doctors_Api(res.data.entity.name).then((res)=>{console.log(res); setdata(res) }) 
})
.catch((error) => {
  console.error(error)
  reject(error);
})})}

useEffect(()=>{
 Get_Admin_data().then((res)=>{console.log(res); setadmindata(res)})   
},[])   

    const [viewedit,setedit]=useState(true) //WHEN FALSE SHOW COMPONENT ADD HOSPITAL 
    const [viewadd,setadd]=useState(true)  //WHEN FALSE SHOW COMPONENT EDIT HOSPITAL
    const [editdata,seteditdata]=useState({}); //EDITED DATA FOR HOSPITAL 

    const handleEdit = (props)=>{
        seteditdata(props); //DATA OF HOSPITAL
        console.log(props);
        setedit(false); //GO TO EDIT PAGE
  }
  
  const goback=()=>{
    setedit(true);
    setadd(true);
  }
  const changeedit = (editedhospital)=>{
    //WHEN SUBMIT EDIT HOSPITAL FORM 
     var requiredid = editedhospital.id ;
     console.log(requiredid);
     var updatedlist = JSON.parse(JSON.stringify(data));
     updatedlist = updatedlist.filter((item) => item.id !== requiredid) //delete first
     //console.log(updatedlist);
     updatedlist.push(editedhospital); //add edited one 
    // console.log(updatedlist);
     //Static update list       
     setdata(updatedlist); 
     setedit(true); //AFTER SUBMIT EDIT FORM [GET BACK TO HOSPITALS LIST]
  }
    const changeadd = (newhospital)=>{
      //WHEN SUBMIT ADD HOSPITAL FORM 
        var updatedlist = JSON.parse(JSON.stringify(data));
        const lastid = updatedlist[updatedlist.length - 1].id;
        console.log(lastid);
        newhospital.id=(parseInt(lastid)+1).toString();
        updatedlist.push(newhospital);
        //Static update list       
        setdata(updatedlist); 
        setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO HOSPITALS LIST]
  }   
   
   const handleDelete = (id)=>{
     //API DELETE Hospital
     console.log(id);
     setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }
  const columns = [

  {
    field: 'name',
    headerName: 'Doctor Name',
    width: 220,
    editable: true,
  },
  {
    field: 'number',
    headerName: 'Contact Number',
    width: 190,
    editable: true,
  },
    {
    field: 'Email',
    headerName: 'Admain Email',
    width: 230,
    editable: true,
  },
  {
    field: 'specialization',
    headerName: 'Specialization',
    editable: true,
    width: 210,

  },
   {
      field: "action",
      headerName: "Action" ,
      width: 150,
      renderCell: (params) => {
        return (
          <>       
              <Button variant="outline-primary" onClick={() => handleEdit(params.row)}>Edit</Button>
             <DeleteOutline htmlColor='red' style={{cursor:'pointer' , marginLeft:'30px'}} onClick={() => handleDelete(params.row.id)}
                               
            />
          </>
        );
      },
    }
];

  return (
    <>
   <div className="student-profile py-4" style={{width:'50%' ,margin: '0 auto'}}>
  <div className="container">       
        <div className="card shadow-sm">             
          <div className="card-header bg-transparent text-center">
           <Avatar className="profile_img" src={admindata.image}  />
           {!admindata.image && <input type="file"></input>}           
          <h3>{admindata.username} </h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong className="pr-1">Contact Number: </strong> {admindata.number} </p>               
            <p className="mb-0"><strong className="pr-1">Hospital Name: </strong>{admindata.hospitalname}</p>
            {<p className="mb-0"><strong className="pr-1">Hospital Address: </strong>{admindata.address}</p>}   
            <p className="mb-0"><strong className="pr-1">Email:  </strong>{admindata.email}</p>          
          </div>     
      </div>
     </div>
      </div>
     
    {viewedit && viewadd && <h3 className="spec-title" style={{color:'#06a3da' , marginTop:'15px' , textAlign:'center' }}><strong>Doctors List</strong></h3>}
      
    <div style={{ height: 540, width: '80%' , margin: '0 auto' ,marginBottom:'60px' }}>
     {viewedit && viewadd && <Table rows={data} columns={columns}></Table> }
    {!viewedit && <Editdoctor editdata={editdata} changeedit={changeedit} goback={goback}/>}
    {!viewadd && <Adddoctor changeadd={changeadd} goback={goback} />}  
      
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{marginTop:'10px'}}>Add Doctor</Button>  }

    </div>
    </>
  );
}
