import React from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Container, Navbar, Nav } from "react-bootstrap";
import { Link ,useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { signin,logout } from "../../actions";
import { chart } from "../../actions";
import { Button,Badge } from "react-bootstrap";

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const token = useSelector(state => state.auth) //state of token 
  const initstate = ()=>{ ////GO BACK ALL STATES TO INIT STATES  
     dispatch(logout());
     dispatch(chart());
     navigate('/')
  }
  
  const handlerouting =(type)=>{
      if (type === "owner"){navigate ('/appadmin')}
      else if (type === "user"){navigate ('/user')}
      else if (type === "c_admin"){navigate('/clinicdoctor')}
      else if (type === "p_admin"){navigate('/pharmacyadmin')}
      else if (type === "h_admin"){navigate('/hospitaladmin')}
      else if (type === "doctor"){navigate('/doctor')}
    }
  return (
    <div className="Container">
      <div className="wrapper">
        <Link to="/" className="link-custom">
          <div className="left">
            <img
              className="logo-image"
              alt="logo"
              src="/assets/images/logo.png"
            />
            <h3 className="logo-name">FUTURE MEDICAL</h3>
          </div>
        </Link>
        <div className="center">
          <Link to="/" className="link-custom">
            <button>Home</button>
          </Link>
          <Link to="/" className="link-custom">
            <button>Specializations</button>
          </Link>
          <Link to="/" className="link-custom">
            <button>Hospitals</button>
          </Link>
          <Link to="/" className="link-custom">
            <button>About</button>
          </Link>
         
          <Link to="/login" className="link-custom">
            <button>Contact Us</button>
          </Link>
        </div>
        { !token.token ? 
        <div className="right">
          <Link to="/login">
            <button>Log in</button>
          </Link>
        </div> : <div className="right">
          
            <Button style={{backgroundColor:'#06a3da'}} onClick={()=>{handlerouting(token.usertype)}} >
            Profile <Badge bg="light" style={{color:'black'}}>9</Badge>
           <span className="visually-hidden">unread messages</span>
          </Button> 
                   
            <button onClick={initstate}>Logout</button>         
        </div> }
      </div>
    </div>

    // <Navbar bg="light" variant="light">
    //   <Container>
    //     <Navbar.Brand href="/home">Future Medical</Navbar.Brand>
    //     <Nav className="me-auto">
    //       <Nav.Link href="/">Home</Nav.Link>
    //       <Nav.Link href="/features">Features</Nav.Link>
    //       <Nav.Link href="#pricing">Pricing</Nav.Link>
    //     </Nav>
    //   </Container>
    // </Navbar>
  );
};

export default Header;
