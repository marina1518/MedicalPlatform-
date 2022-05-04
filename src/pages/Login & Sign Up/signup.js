import React,{useState} from "react";
import { Form,Button,Container,Row,Col,Figure,Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaUser,FaLock, FaBirthdayCake} from 'react-icons/fa';
import {BsFillTelephoneFill} from 'react-icons/bs';
import {MdBloodtype,MdLocationOn,MdEmail} from 'react-icons/md';
import {BiMessageRoundedDetail} from 'react-icons/bi'
import {useSelector,useDispatch} from 'react-redux'
import axios from "axios";
import { signin,logout } from "../../actions";
import {Link,useNavigate} from 'react-router-dom'
//import dr1 from './../../images/dr2.png';
//import './login.css'


const Signup=()=>{
     
    const token = JSON.parse(useSelector(state => state.auth)) //state of token 
    const dispatch = useDispatch();
      let navigate = useNavigate();
    const routing_login =(type)=>{
     navigate ('/')
    }


    const register_api = ()=>{
            axios.post('https://future-medical.herokuapp.com/register',
         {
                    username : data.username,
                    email : data.email ,
                    password : data.password ,  
                    //gender : 
         }).then((res)=>{
           console.log(res.data);
           dispatch(signin(res.data)); //save the data
           navigate('/'); //Go to Home
         }).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
})
    }  
      
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpass, setcPassword] = useState("");
    const [dob,setDob]=useState("");
    const [phone,setphone]=useState("");
    const [add,setadd]=useState("");
    const [blood,setblood]=useState("Don't Know");
    const [history,seth]=useState("");
    const [msg,setmsg]=useState("");
    const [username,setusername]=useState("");

    const data = [
        {email: "", password : "" , dob:"", add:"", phone:"", history:"", blood:"" , username:""}
    ];
    
    const [e_u,sete_u] = useState("");
    const [e_p,sete_p] = useState("");
  
    const [e_b,sete_b] = useState("");
    const [e_a,sete_a] = useState("");
    const [e_e,sete_e] = useState("");
    const [e_c,sete_c] = useState("");
    const [e_ph,sete_ph] = useState("");

    const submit_value =(e) => {
        e.preventDefault();
        var flag = 0;
        //submit(email,password); 
        if (username === "")
        {
          flag=1;
          sete_u("!! required username");
          
        }
        if (email === "")
        {
          flag=1;
          sete_e("!! required Email");
          
        }
        if (password === "")
        {
          flag=1;
          sete_p("!! required Password");
          //setflag("true");
          console.log(flag);
        }
        if (password.length < 8 && password != "")
        {
          flag=1;
          sete_p("!! at least 8 numbers or charaters");
          //setflag("true");
          console.log(flag);
        }
        if ((phone.length !== 11 ) && phone != "")
        {
          flag=1;
          sete_ph("!! required 11 numbers");
          //setflag("true");
          console.log(flag);
        }
        if (cpass === "")
        {
          flag=1;
          sete_c("!! confirm the password");
          //setflag("true");
          console.log(flag);
        }
        if (dob === "")
        {
          flag=1;
          sete_b("!! required Date of Birth");
          //setflag("true");
        }
        if (add === "")
        {
          flag=1;
          sete_a("!! required Address");
          //setflag("true");
        }
        if (phone === "")
        {
          flag=1;
          sete_ph("!! required Phone Number");
          //setflag("true");
        }
        console.log(flag);
        if (password === cpass && flag === 0)
        {
            data.email=email;
            data.password=password;
           
            data.dob=dob;
            data.phone=phone;
            data.add=add;
            data.blood=blood;
            data.history=history;
            data.username=username;
            console.log(data);
            register_api();
        }      
        
        else if(flag === 0) {
            setmsg("!! not matching passwords");
        }
    };


    return(
        
        <Container>
        {/* <h1 className="shadow-sm text-primary mt-5 p-3 text-center rounded">Login</h1> */}
        
      
        <Row className="mt-5 p-5 m-auto shadow-sm rounded-lg"  lg={4} md={6} sm={12} >
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
     // src={dr1}
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

            
           


            <h1 className="shadow-sm mt-5 p-3 text-center rounded" style={{color:"#06a3da"}}>Welcome </h1>
            <br/>
            
                <Form onSubmit={submit_value}>

                    <Form.Group controlId="formBasicusername">
                    <FaUser style={{color:"#06a3da"}}/> <Form.Label>  User name </Form.Label>
                     <Form.Control type="text" placeholder="Enter username"  onChange={(e)=>{setusername(e.target.value); sete_u("");}}/>   
                     <h6 style={{color:"red"}}>{e_u}</h6> 
                    </Form.Group>     
<br/>
                    <Form.Group controlId="formBasicEmail">
                    <MdEmail style={{color:"#06a3da"}}/> <Form.Label>  Email address </Form.Label>
                     <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>{setEmail(e.target.value); sete_e("");}}/>   
                     <h6 style={{color:"red"}}>{e_e}</h6> 
                    </Form.Group>
<br/>
                    <Form.Group controlId="formBasicPassword">
                    <FaLock style={{color:"#06a3da"}}/> <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); sete_p("");}} />
                        <h6 style={{color:"red"}}>{e_p}</h6> 
                       
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <FaLock style={{color:"#06a3da"}}/> <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setcPassword(e.target.value); sete_c("");}} />
                        <h6 style={{color:"red"}}>{e_c}</h6>
                        <h6 style={{color:"red"}}>{msg}</h6>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <FaBirthdayCake style={{color:"#06a3da"}}/> <Form.Label>Date of Birth</Form.Label>
                    <Form.Control  type="date" onChange={(e)=>{setDob(e.target.value); sete_b("");}} />
                    <h6 style={{color:"red"}}>{e_b}</h6>
                    </Form.Group>
                   
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <BsFillTelephoneFill style={{color:"#06a3da"}}/> <Form.Label>Phone</Form.Label>
                    <Form.Control placeholder="Phone" type="text" onChange={(e)=>{setphone(e.target.value); sete_ph("");}} />
                    <h6 style={{color:"red"}}>{e_ph}</h6>
                    </Form.Group>


                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <MdLocationOn style={{color:"#06a3da"}}/> <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Address" type="text" onChange={(e)=>{setadd(e.target.value); sete_a("");}} />
                    <h6 style={{color:"red"}}>{e_a}</h6>
                    </Form.Group>
                   
                    <br/>
                    <Form.Group controlId="formBasicPassword">
                    <MdBloodtype style={{color:"#06a3da"}}/> <Form.Label>Blood Type</Form.Label>
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
                    <BiMessageRoundedDetail style={{color:"#06a3da"}}/> <Form.Label>History</Form.Label>
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