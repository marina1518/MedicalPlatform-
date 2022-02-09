import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'

export default function Addhospital(props) {

    const [FormValues, setFormvalues ] = useState({}); //FORM VALUES 
    const [Formerrors, setFormerrors ] = useState({}); //ERROR 
    const [issubmit, setissubmit ] = useState(false);  //SUBMITTED OR NOT 
    console.log(props);

    const handlechange = (e)=>{
         const name = e.target.name ;
         const value = e.target.value ;
        
         setFormvalues({...FormValues, [name] : value});
         
         if (issubmit)
         {
            setFormerrors(validate({...FormValues, [name] : value}))
         }       
    }

    function validate (values)
    {
        const errors = {};
        const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (!values.Hospitalname)
            {
                errors.hospitalname="Hospital Name is required!";  
            }
        
        if (!values.number)
            {
                errors.number="Number is required!";  
            }
        else if (values.number.length !== 11)
        {
            errors.number = "This is not a valid phone number ";
        }      
      
        if (!values.Admin)
            {
                errors.Admin="Admin Name is required!";  
            }
        if (!values.Location)
            {
                errors.Location="Location is required!";  
            }
        
        return errors ;
    }
        const submithandle =(e)=>{
        //when submit the form     
        e.preventDefault();
        setFormerrors(validate(FormValues)) //check the errors 
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            setissubmit(true);
            props.changeadd(FormValues);
            //API ADD HOSPITAL
           
            
        }
      }
    return (
        <div>
    <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 20px' ,borderWidth:'1px',borderColor:'#1775ee' , borderStyle:'solid',width:'540px'} }>
  
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#7672ca'} }> Add Hospital </p>
    <Form.Group className="mb-3" controlId="formGridEmail">
      <Form.Label>Hospital Name</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.hospitalname} name="Hospitalname" type="text" placeholder="Enter Hospital name" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.hospitalname}</p>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridPassword">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.number} name="number" type="number" placeholder="Enter Contact number" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.number}</p>
    </Form.Group>
  

  <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Admin Name</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Admin} name="Admin" type="string" placeholder="Enter Admin name " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Admin}</p>
  </Form.Group>

    <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Location</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Location} name="Location" type="string" placeholder="Enter the locaion of the clinic " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Location}</p>
  </Form.Group>
  
      <Button style={{marginLeft:'190px'}} variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </div>
    )
}
