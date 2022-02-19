import React,{useState} from "react";
import { Form,Button,Container,Row,Col,Figure,Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaUser,FaLock, FaBirthdayCake} from 'react-icons/fa';
import {BsFillTelephoneFill} from 'react-icons/bs';
import {MdBloodtype,MdLocationOn} from 'react-icons/md';
import {BiMessageRoundedDetail} from 'react-icons/bi'
import pass from "./../image/pass.png";
//import './login.css'


const Signup=()=>{

      
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpass, setcPassword] = useState("");
    const [dob,setDob]=useState("");
    const [phone,setphone]=useState("");
    const [add,setadd]=useState("");
    const [blood,setblood]=useState("");
    const [history,seth]=useState("");
    const [msg,setmsg]=useState("");
    //const [data, submit] = useState([{"email":null, "password":null}]);

    const data = [
        {email: "", password : "" , dob:"", add:"", phone:"", history:"", blood:""}
    ];
    
    
    
    const submit_value =(e) => {
        e.preventDefault();
        //submit(email,password);  
        if (password === cpass)
        {
            data.email=email;
            data.password=password;
           
            data.dob=dob;
            data.phone=phone;
            data.add=add;
            data.blood=blood;
            data.history=history;
            console.log(data);
        }      
        
        else {
            setmsg("Error !!");
        }
    };


    return(
        
        <Container>
        {/* <h1 className="shadow-sm text-primary mt-5 p-3 text-center rounded">Login</h1> */}
        
      
        <Row className="mt-5"  lg={4} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
        <Col lg={4} md={6} sm={12} >
        {/* <Figure>
        <Figure.Image
        width={171}
        height={180}
        alt="171x180"
        src={pass}
        />
       
        </Figure> */}

<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={pass}
      alt="First slide"
    />
   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Second slide"
    />

   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

   
  </Carousel.Item>
</Carousel>

        </Col>
        

            <Col lg={4} md={6} sm={12} >

            
           


            <h1 className="shadow-sm text-primary mt-5 p-3 text-center rounded">Welcome </h1>
            <br/>
            <h1 className="text-center text-danger ">{msg}</h1>
                <Form onSubmit={submit_value}>
               
                    <Form.Group controlId="formBasicEmail">
                    <FaUser/> <Form.Label>  Email address </Form.Label>
                     <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)}/>   
                    </Form.Group>
<br/>
                    <Form.Group controlId="formBasicPassword">
                    <FaLock/> <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <FaLock/> <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setcPassword(e.target.value)} required/>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <FaBirthdayCake/> <Form.Label>Date of Birth</Form.Label>
                    <Form.Control  type="date" onChange={(e)=>setDob(e.target.value)} required/>
                    </Form.Group>
                   
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <BsFillTelephoneFill/> <Form.Label>Phone</Form.Label>
                    <Form.Control placeholder="Phone" type="text" onChange={(e)=>setphone(e.target.value)} required/>
                    </Form.Group>


                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <MdLocationOn/> <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Address" type="text" onChange={(e)=>setadd(e.target.value)} required/>
                    </Form.Group>
                   
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <MdBloodtype/> <Form.Label>Blood Type</Form.Label>
                    <div>
                    <select onChange={(e)=>setblood(e.target.value)}>
                    <option value="nth">Don't Know</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                    <BiMessageRoundedDetail/> <Form.Label>History</Form.Label>
                    <Form.Control
               as="textarea"
               placeholder="History"
               onChange={(e)=>seth(e.target.value)}
               style={{ height: '100px' }}
               />

</Form.Group>
                    <br></br>
                    <div className="d-grid">
                    <Button variant="primary btn-block" type="submit" onSubmit={submit_value}>
                        Register
                    </Button>
                    </div>
                    
                </Form>
                <br/>
               
            </Col>
        </Row>
        
    </Container>
    )
}
export default Signup;