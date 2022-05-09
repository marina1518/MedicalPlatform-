import React, { useEffect, useState } from "react";
import { Modal, Row,Col, Button, Form, Carousel,Card,Alert  } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {GiMedicines} from 'react-icons/gi';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Choose_pres=(props)=>{

    
        const [show, setShow] = useState(props.show);
        const handleClose = () => {setShow(false); props.setshow(false);};
        //const handleShow = () => setShow(true);
        const token = JSON.parse(useSelector((state) => state.auth));
        console.log(token.token);
        const config = {headers: {
            'Authorization': `Bearer ${token.token}`}};

        const[pres, setpres]=useState([]);
        
       
        const get_pres = async ()=>{
         try {
                const res = await axios.get('https://future-medical.herokuapp.com/user/prescriptions' ,
                
                 config
                )
     
                console.log(res.data);
                if (res.data==="you have no prescriptions yet") return
                setpres(res.data);
                
              
            } 
            catch (err) {
                console.error(err);
            }
        }

var med_state=[];
for(var i=0; i<pres.length;i++)
{
  for(var j=0; j<pres[i].medicines.length;j++)
  {
    med_state.push({medicine:pres[i].medicines[j], state:false});
  }

}
console.log(med_state);
const change=(x)=>{
  for(var i=0; i<med_state.length;i++)
  {
    if(med_state[i].medicine === x) med_state[i].state=(!med_state[i].state);
  }
  console.log(med_state);
}

const order_details=()=>{
  var o=[];
  for(var i=0;i<med_state.length;i++)
  {
      if(!(o.includes(med_state[i].medicine))&&(med_state[i].state===true)) o.push(med_state[i].medicine);
  }
  props.set_order(o);
}

    //  const[medicine,setmedicine]=useState("");
    //  console.log(medicine);
     useEffect(()=>{
      get_pres();
      },[])
      
        return (
          <>
            {/* <Button variant="primary" onClick={(e)=>{handleShow(); get_pres();}}>
              choose 
            </Button> */}

      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Choose from your Prescriptions</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  
                  </Form.Group>
                  
            <div style={{width:"350px", height:"350px"}}>
                {
                    pres.length ===0 ? 
                    <>
                      <Alert key="primary" variant="primary">
                        There are no prescriptions yet.
                      </Alert>
                  </>
                  :
               
            <Carousel variant="dark">
                    {
                        pres.map((p)=>
                            <Carousel.Item>
        <div style={{ textAlign:"center"}}>
            <Card>
            <Card.Body>
              <Card.Title>Prescription</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{p.Date}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Dr {p.doctor.username}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{p.doctor.email}</Card.Subtitle>
              <Card.Text>
              <div key={`default-checkbox`} className="mb-3">
                {
                    p.medicines.map((m)=>
                //     <Form.Check 
                //     type="checkbox"
                //     id={`default-checkbox`}
                //     label={m}
                // />
                <>
                <input type="checkbox" id={m} name={m} value={m} onChange={(e)=>change(e.target.value)}/>
                <label for={m}>  {" "+ m}</label><br></br></>
                    )
                }
                </div>
                <ul></ul>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
  </Carousel.Item>
                        )
                    }
            </Carousel>}
            </div>
                 
                </Form>
              

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={(e)=>{handleClose(); order_details();}}>
                  Order Now
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      
}
export default Choose_pres;