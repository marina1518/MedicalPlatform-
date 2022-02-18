import  React,{useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {DoctorsHospital} from '../../data'
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../components/Table/Table';
import Adddoctor from './Adddoctor';
import Editdoctor from './Editdoctor';

export default function Adminhospital() {
    const [data,setdata] = useState(DoctorsHospital) //FROM API HOSPITALS LIST 
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
    width: 190,
    editable: true,
  },
  {
    field: 'specialization',
    headerName: 'Specialization',
    editable: true,
    width: 190,

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
    <div style={{ height: 510, width: '100%'  }}>
      {/*<DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />*/}
    {viewedit && viewadd && <Table rows={data} columns={columns}></Table> }
    {!viewedit && <Editdoctor editdata={editdata} changeedit={changeedit} goback={goback}/>}
    {!viewadd && <Adddoctor changeadd={changeadd} goback={goback} />} 
      </div>
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Doctor</Button>  }

    
    </>
  );
}
