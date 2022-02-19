import React,{useState} from "react";
import { Form,Button,Container,Row,Col,Figure,Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaUser,FaLock} from 'react-icons/fa';
import {MdMedicalServices} from 'react-icons/md';
import pass from "./../image/pass.png";
//import './login.css'


const Login=()=>{

      
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
    //const [data, submit] = useState([{"email":null, "password":null}]);

    const data = [
        {email: "", password : "" , type:""}
    ];
    
    
    const submit_value =(e) => {
        e.preventDefault();
        //submit(email,password);        
        data.email=email;
        data.password=password;
        data.type=type;
        console.log(data);
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

            
           


            <h1 className="shadow-sm text-primary mt-5 p-3 text-center rounded">Welcome Back</h1>
            <br/>
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
                    <Form.Group >
                    <MdMedicalServices/> <Form.Label>Type</Form.Label>
                    <div>
                    <input type="radio" id="gender1" name="gender" value="Dr" onChange={(e)=>setType(e.target.value)} />
                    <label for="gender1">  Dr</label><br/>
                    <input type="radio" id="gender2" name="gender" value="Patient"  onChange={(e)=>setType(e.target.value)}></input>
                    <label for="gender2">  Patient</label>
                </div>
                </Form.Group>
                    <br></br>
                    <div className="d-grid">
                    <Button variant="primary btn-block" type="submit" onSubmit={submit_value}>
                        Login
                    </Button>
                    </div>
                    
                </Form>
                <br/>
                <div className="text-center">
                <p >
                    join us now   
                    <a className="ml-1 text-blue-900 ">  Register here</a>
                </p>
            </div>
            </Col>
        </Row>
        
    </Container>
    )
}
export default Login;