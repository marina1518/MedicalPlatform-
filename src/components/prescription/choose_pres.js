import React, { useEffect, useState } from "react";
import { Modal, Row,Col, Button, Form, Carousel,Card,Alert  } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {GiMedicines} from 'react-icons/gi';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Slot from './file';

const Choose_pres=(props)=>{

        const [show, setShow] = useState(props.show);
        const handleClose = () => {setShow(false); props.setshow(false);};
        const[done, setdone] = useState(false);
        const[pres, setpres]=useState([]);
        const[number, setnumber] = useState(1);
        const [q,setq]=useState([]);
        const[next, setnext] = useState(false);
        const[dis, setdis] = useState(true);
        const token = JSON.parse(useSelector((state) => state.auth));
       
        const config = {headers: {
            'Authorization': `Bearer ${token.token}`}};

        
        
       
        const get_pres = async ()=>{
         try {
                const res = await axios.get('https://future-medical.herokuapp.com/user/prescriptions' ,
                
                 config
                )
     
                console.log(res.data);
                if (res.data==="you have no prescriptions yet") {setnext(true);return}
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

const change=(x)=>{
  for(var i=0; i<med_state.length;i++)
  {
    if(med_state[i].medicine === x) med_state[i].state=(!med_state[i].state);
  }
 
}

const order_details=()=>{
 
  props.set_order(q);
}

const quanity=()=>{
  var o=[];
  for(var i=0;i<med_state.length;i++)
  {
      if(!(o.includes(med_state[i].medicine))&&(med_state[i].state===true)) o.push({medicine: med_state[i].medicine, quanity:1});
  }
  setq(o);
}

    
     useEffect(()=>{
      get_pres();
      },[])
      
        return (
          <>
           
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Choose from your Prescriptions</Modal.Title>
              </Modal.Header>
             { done ? 
             <Modal.Body>
               <Form>
                {
                  q.map(m=> 
                    <Row>
                      <Col>
                      <li>{m.medicine}</li>
                      </Col>
                      <Col>
                      <Slot setfrom={setnumber} data={{med:m.medicine, q:q} }/>
                      </Col>
                    </Row>
                   
                    )
                }
               </Form>
             </Modal.Body>
             : 
             <Modal.Body>
                <Form>
                 
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
                <>
                <input type="checkbox" id={m} name={m} value={m} onChange={(e)=>{change(e.target.value); setdis(false);}} />
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
              

              </Modal.Body>}
              {done ? 
              <Modal.Footer>
              <Button variant="secondary" onClick={(e)=>setdone(false)}>
                Back
              </Button>
              <Button variant="primary" onClick={(e)=>{handleClose(); order_details();}}>
                Order Now
              </Button>
            </Modal.Footer>
              :<Modal.Footer>
                <Button variant="secondary" onClick={(e)=>{handleClose(); props.cancel(false);}}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={(e)=>{setdone(true); quanity();}} disabled={next || dis} >
                  Next
                </Button>
              </Modal.Footer>}
            </Modal>
          </>
        );
      
}
export default Choose_pres;