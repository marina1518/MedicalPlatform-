import React from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
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

        <div className="right">
          <Link to="/login">
            <button>Log in</button>
          </Link>
        </div>
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
