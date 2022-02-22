import axios from 'axios'
import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'

export default function Addclinic(props) {

 const Add_clinic_api = ()=>{
            axios.post('https://future-medical.herokuapp.com/registration/clinicAdmin',
         {
                    username: FormValues.Admin,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    clinicname : FormValues.clinicname,
                    address : FormValues.Location ,
                    telephone : FormValues.number
         }).then((res)=>{
           console.log(res.data);
           props.changeadd(FormValues);  //go to all hospitals
                     
         }).catch(function (error) {
    if (error.response) {    
      console.log(error.response.data);
      console.log(error.response.status);
      const errors = {};  
      errors.clinicname = "the clinic or admin already exist"
      setFormerrors(errors);

    }
})
    }  


     const [FormValues, setFormvalues ] = useState({});
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);
    console.log(props);
    const handlechange = (e)=>{
         
         const name = e.target.name ;
         const value = e.target.value ;
        // console.log(value);
         setFormvalues({...FormValues, [name] : value});
         
         if (issubmit)
         {
            setFormerrors(validate({...FormValues, [name] : value}))
         }
         
         //console.log(FormValues);
    }
    function validate (values)
    {
        const errors = {};
        const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (!values.clinicname)
            {
                errors.clinicname="Clinic Name is required!";  
            }
        
        if (!values.number)
            {
                errors.number="Number is required!";  
            }
        else if (values.number.length !== 11)
        {
            errors.number = "This is not a valid phone number ";
        }      
        /*else if (!regx.test(values.email))
        {
            errors.email = "This is not a valid email format";
        }*/
        
        if (!values.Admin)
            {
                errors.Admin="Admin Name is required!";  
            }
        if (!values.Location)
            {
                errors.Location="Location is required!";  
            }
        if (!values.Email)
            {
                errors.Email="Admin's Email is required!";  
            }
        else if (!regx.test(values.Email))
        {
            errors.email = "This is not a valid email format";
        }    
        if (!values.Password)
            {
                errors.Password="Admin's Password is required!";  
            }    
       if (values.Gender ==="Select Admin Gender" || !values.Gender )
            {
                
                errors.Gender="Admin Gender is required!";  
            }  
        return errors ;
    }
        const submithandle =(e)=>{
        e.preventDefault();
        setFormerrors(validate(FormValues))
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            setissubmit(true);
            Add_clinic_api();
            //props.changeadd(FormValues);
            //APIEDIT
            //sendpostRequest2();
            //POST
           
            
        }
      }
    return (
        <div>
                  <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 20px' ,borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'90%'} }>
  <Row>
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Add Clinic </p>
     <Col>
    <h6><strong>Clinic Information</strong></h6>
    <Form.Group className="mb-3" controlId="formGridEmail">
      <Form.Label>Clinic Name</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.clinicname} name="clinicname" type="text" placeholder="Enter Clinic name" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.clinicname}</p>
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
  </Col>
  <Col>
      <h6><strong>Admin Account Information</strong></h6>
      <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Email} name="Email" type="email" placeholder="Enter Admin's Email " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Email}</p>
  </Form.Group>

  <Form.Group  className="mb-3" controlId="formGridAddress3">
      <Form.Label>Password</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Password} name="Password" type="password" placeholder="Enter Admin's Password " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Password}</p>
  </Form.Group>

<Form.Group  className="mb-3" controlId="formGridAddress2">
    <Form.Label>Gender</Form.Label>
  <Form.Select aria-label="Default select example" defaultValue="Select Admin Gender" name="Gender" value={FormValues.Gender} onChange={(e)=>handlechange(e)}>      
  <option>Select Admin Gender</option>
  <option >Male</option>
  <option >Female</option>
</Form.Select>
<p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Gender}</p>
  </Form.Group>

  </Col>
  </Row>
  <Row>
      <Col>
      <Button style={{width:'100%'}} variant="primary" type="submit">
    Submit
  </Button>
  </Col>
  <Col>
    <Button style={{width:'100%'}} variant="primary" onClick={props.goback}>
   Go back
  </Button>
  </Col>
  </Row>
  </Form>
        </div>
    )
}
