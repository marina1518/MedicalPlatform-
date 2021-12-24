import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { HospitalsList } from '../../Dummyvalues';
import { useState } from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';

import Addhospital from './AddHospital/Addhospital';
import Hospitaledit from './EditHospital/Edithospital'




export default function Clinics() {

    const [data,setdata] = useState(HospitalsList)

    const [viewedit,setedit]=useState(true)
    const [viewadd,setadd]=useState(true)

    const [editdata,seteditdata]=useState({});
    const handleEdit = (props)=>{
        seteditdata(props); //DATA OF CLINIC
        console.log(props);
        setedit(false);
        
    }
  const changeedit = ()=>{
        //API DELETE CLINIC
     setedit(true);
  }
    const changeadd = ()=>{
        //API DELETE CLINIC
     setadd(true);
  }   
    console.log(data)
      const handleDelete = (id)=>{
        //API DELETE CLINIC
     setdata(data.filter((item) => item.id !== id))
  }
  const columns = [

  {
    field: 'Hospitalname',
    headerName: 'Hospital Name',
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
      {viewedit && viewadd && <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns} 
        pageSize={8}
        checkboxSelection
      />}
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Hospital</Button>  }
    {!viewedit && <Hospitaledit editdata={editdata} changeedit={changeedit}/>}
    {!viewadd && <Addhospital changeadd={changeadd}/>}
    </div>
  );
}
