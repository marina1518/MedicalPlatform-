import React,{useState} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import './pharmacyorder.css'
function PharmacyOrder(props) {
    console.log(props)
    const [FormValues, setFormvalues ] = useState({}); //FORM VALUES 
    const handlechange = (e)=>{
         const name = e.target.name ;
         const value = e.target.value ;
         setFormvalues({...FormValues, [name] : value});
    }
const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    //console.log(file)
    uploadFiles(file);
  };

const uploadFiles = (file) =>{
if (!file) return
const storageRef = ref(storage,`/files/prescription/${file.name}`);
const uploadTask = uploadBytesResumable(storageRef,file);
uploadTask.on("state_changed",()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        console.log(url); // saved in database
        //api calling to save in database
        //setimage (url);
    }).catch((err)=>{console.log(err)})
})
}
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton >
        {
            <div style={{'color':'#064e68'}}>
            <Modal.Title id="contained-modal-title-vcenter"   >
         <strong> Welcome to {props.pharmacyname}   </strong>         
          </Modal.Title>
             <span style={{marginRight:'2rem'}}> <i class="bi bi-geo-alt-fill"></i> {props.pharmacyaddress}
                  </span>
               <span> <i class="bi bi-telephone-fill"></i> {props.pharmacyphone}
                  </span> 
                  </div>
  }
      </Modal.Header>
      <Modal.Body>
        <h5 style={{'color':'#064e68'}}>Make Your Order</h5>
        <Form onSubmit={formHandler}>
         <Form.Group  className="mb-3" controlId="formGridimage">
    <Form.Label>Upload your prescription</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Image} name="Image" type="file" placeholder="Enter Admin image " />
  </Form.Group>
   <Button style={{'backgroundColor':'#064e68','borderColor':'#064e68'}} type='submit'>Submit Your order</Button>
   </Form>
      </Modal.Body>
      {/*<Modal.Footer>
        <Button type='submit'  onClick={props.onHide}>Close</Button>
</Modal.Footer>*/}
      
    </Modal>
  );
}

export default PharmacyOrder