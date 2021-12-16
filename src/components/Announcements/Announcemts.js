import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Announcements } from '../../Dummyvalues';
import { useState } from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Clinicedit from '../../components/ClinicEdit/Clinicedit';
import Addclinic from '../ClinicEdit/ADDCLINIC/addclinic';
import Addannouncment from './Add/Addanouncment';
import Announcmentedit from './Edit/Editannouncment';


export default function Announcemts() {
    const [data,setdata] = useState(Announcements)

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
    field: 'announcmentname',
    headerName: 'Announcment Name',
    width: 220,
    editable: true,
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 190,
    editable: true,
  },
  {
    field: 'Image',
    headerName: 'Announcment Image',
    width: 250,
    editable: true,
    renderCell: (params) => {
        return (
          <div className="userListUser">
            <img style={{ }} src={params.row.Image} alt="" />
        </div>
        );
      },
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
      {viewedit && viewadd && <DataGrid rowHeight={250}
        rows={data}
        disableSelectionOnClick
        columns={columns} 
        pageSize={8}
        checkboxSelection
      />}
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Announcment</Button>  }
    {!viewedit && <Announcmentedit editdata={editdata} changeedit={changeedit}/>}
    {!viewadd && <Addannouncment changeadd={changeadd}/>}
    </div>
  );
}

