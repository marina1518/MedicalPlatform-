import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { PharmacyList } from '../../Dummyvalues';
import { useState } from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../Table/Table';
import Addpharmacy from './Add/Pharmaadd';
import Pharmacyedit from './EDIT/Pharmaedit';




export default function Pharmacies() {

    const [data,setdata] = useState(PharmacyList) //FROM API PHARMACIES LIST 

    const [viewedit,setedit]=useState(true) //WHEN FALSE SHOW COMPONENT EDIT PHARMACY
    const [viewadd,setadd]=useState(true) //WHEN FALSE SHOW COMPONENT ADD PHARMACY

    const [editdata,seteditdata]=useState({}); //EDITED DATA FOR PHARMACY 
    const handleEdit = (props)=>{
        seteditdata(props); //DATA OF PHARMACY
        console.log(props);
        setedit(false); //GO TO EDIT PAGE
        
    }
  const changeedit = (editedpharmacy)=>{
            //WHEN SUBMIT EDIT PHARMACY FORM 
     var requiredid = editedpharmacy.id ;
     console.log(requiredid);
     var updatedlist = JSON.parse(JSON.stringify(data));
     updatedlist = updatedlist.filter((item) => item.id !== requiredid) //delete first
     //console.log(updatedlist);
     updatedlist.push(editedpharmacy); //add edited one 
    // console.log(updatedlist);
     //Static update list       
     setdata(updatedlist); 
     setedit(true); //AFTER SUBMIT EDIT FORM [GET BACK TO PHARMACIES LIST]
     
  }
    const changeadd = (newpharmacy)=>{
       //WHEN SUBMIT ADD PHARMACY FORM 
       var updatedlist = JSON.parse(JSON.stringify(data));
       const lastid = updatedlist[updatedlist.length - 1].id;
       console.log(lastid);
       newpharmacy.id=(parseInt(lastid)+1).toString();
       updatedlist.push(newpharmacy);
       //Static update list       
       setdata(updatedlist);    
     setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO PHARMACIES LIST]
  }   
    console.log(data)
  const handleDelete = (id)=>{
        //API DELETE PHARMACY 
     setdata(data.filter((item) => item.id !== id)) //STATIC DELETE
  }
  const columns = [

  {
    field: 'pharmacyname',
    headerName: 'Pharmacy Name',
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
    field: 'Admin',
    headerName: 'Admain Name',
    width: 170,
    editable: true,
  },
  {
    field: 'Location',
    headerName: 'Location',
    editable: true,
    width: 220,

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
    <div style={{ height: '75%', width: '100%' }}>
      {viewedit && viewadd && <Table rows={data} columns={columns}></Table>}
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Pharmacy</Button>  }
    {!viewedit && <Pharmacyedit editdata={editdata} changeedit={changeedit}/>}
    {!viewadd && <Addpharmacy changeadd={changeadd}/>}
    </div>
  );
}
