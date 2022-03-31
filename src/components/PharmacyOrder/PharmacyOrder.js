import React,{useState,useEffect} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import './pharmacyorder.css'
import PlaceholderLoading from 'react-placeholder-loading'

function PharmacyOrder(props) {
    const token = useSelector(state => state.auth);
    const [loading,setloading]=useState(false) //flag for getting downloaded link
    const d = new Date();
    const [FormValues, setFormvalues ] = useState({}); //FORM VALUES 
    console.log(props)
    const make_order_api = ()=>{
        const day_date = d.getDay() +"/" + d.getMonth() + "/" + d.getFullYear();
        //console.log(day_date)
            axios.post('https://future-medical.herokuapp.com/user/pharmacy/order',
           {
             adminEmail : props.pharmacyadmin ,
             form :  FormValues.imageurl ,//image
             date:day_date,
             address:FormValues.address,
             phone:FormValues.number,
           },{
            headers: {
          'Authorization': `Bearer ${token.token}`
          }
         }).then((res)=>{console.log(res)
          setFormvalues({});
          
          alert(" The order added successfully , you can see it from your profile")
          props.setfalseloading();
        }).catch((err)=>{console.log(err)})
           
         /*catch(err)
         {
           console.log(err)
         }*/
    }
    useEffect(()=>{
      console.log("render")
      if(props.loading){
      props.setshow();}
    },[props.loading])
    const handlechange = (e)=>{
         const name = e.target.name ;
         const value = e.target.value ;
         //console.log(e)
         setFormvalues({...FormValues, [name] : value});
    }
const formHandler = (e) => {
    e.preventDefault();
    upload(e.target[0].files[0])
    props.onHide();
    props.setloading(); //make loading true
    setloading(true)
  };
/*const uploadFiles = (file) =>{
   console.log(file)
if (!file) return
const storageRef = ref(storage,`/files/${file.name}`);
const uploadTask = uploadBytesResumable(storageRef,file);
}*/
const upload = (file) => {
      //e.preventDefault()
    console.log('start of upload')
    // async magic goes here...    
    const storageRef = ref(storage,`/files/${file.name}${d.getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef,file);
    
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      getDownloadURL(uploadTask.snapshot.ref)
       .then(fireBaseUrl => {
         console.log(fireBaseUrl)
         FormValues.imageurl=fireBaseUrl;
         props.onHide();//trial
         make_order_api();
       })
    })
    }
/*const downloadFiles = (file) =>{
  console.log(file)
if (!file) return
//const storageRef = ref(storage,`/files/${file.name}`);
getDownloadURL(ref(storage,`/files/${file.name}`)).then((url)=>{
  console.log(url);
}).catch((err)=>{console.log(err)})*/
console.log(props.loading)
  return (
    <>
    
     { (props.loading === false) &&
     <>
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton >
        
            <div style={{'color':'#064e68'}}>
            <Modal.Title id="contained-modal-title-vcenter"   >
         <strong> Welcome to {props.pharmacyname}   </strong>         
          </Modal.Title>
             <span style={{marginRight:'2rem'}}> <i class="bi bi-geo-alt-fill"></i> {props.pharmacyaddress}
                  </span>
               <span> <i class="bi bi-telephone-fill"></i> {props.pharmacyphone}
                  </span> 
                  </div>
  
      </Modal.Header>
      <Modal.Body>
         <><h5 style={{'color':'#064e68'}}>Make Your Order</h5>
        <Form onSubmit={formHandler}>
         {<Form.Group  className="mb-3" >
    <Form.Label>Upload your prescription</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)}  name="Image" type="file" placeholder="Enter prescription image " />
</Form.Group>}
     <Row>
     <Col>
     <Form.Group  className="mb-3" controlId="formGridaddress">
    <Form.Label>Address</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.address} name="address" type="text" placeholder="Enter your address " />
  </Form.Group>
     </Col>
      <Col>
  <Form.Group  className="mb-3" controlId="formGridnumber">
    <Form.Label>Phone number</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.number} name="number" type="text" placeholder="Enter your phone number " />
  </Form.Group>
     </Col>
   </Row>
    <Button style={{'backgroundColor':'#064e68','borderColor':'#064e68'}} type='submit'>Submit Your order</Button>
   </Form>
   </>
      </Modal.Body>
      {/*<Modal.Footer>
        <Button type='submit'  onClick={props.onHide}>Close</Button>
</Modal.Footer>*/}
      
    </Modal> </>}

{  (props.loading === true) && 
<>
<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton >
        
            <div style={{'color':'#064e68'}}>
            <Modal.Title id="contained-modal-title-vcenter"   >
         <strong> Welcome to {props.pharmacyname}   </strong>         
          </Modal.Title>
             <span style={{marginRight:'2rem'}}> <i class="bi bi-geo-alt-fill"></i> {props.pharmacyaddress}
                  </span>
               <span> <i class="bi bi-telephone-fill"></i> {props.pharmacyphone}
                  </span> 
                  </div>
  
      </Modal.Header>
      <Modal.Body>
         <PlaceholderLoading shape="circle" width={100} height={100} />
         </Modal.Body>
         </Modal> </>}
         </>
  );
}

export default PharmacyOrder