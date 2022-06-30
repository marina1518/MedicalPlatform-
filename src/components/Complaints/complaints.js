import React, { useState, useEffect } from "react";
//import "./profileui.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Form,
    Button,
    Container,
  } from "react-bootstrap";
import { FaUser, FaLock, FaBirthdayCake } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import {AiFillMessage} from "react-icons/ai";
import { MdBloodtype, MdLocationOn, MdEmail } from "react-icons/md";
import "./complaint.css"
const Complaint = () => {
  
  return (
    <div className="login_sigup_container">
      <Container>
        <div className="form-container_signup">
          <h1 style={{ color: "#06a3da", marginTop: "30px" }}>
            Complaint Form
          </h1>
          <br />
          <div className="Total_form_signup">
            <Form >
              <div className="form-details_signup2">
                <div style={{ gridArea: "1 / 1 / 2 / 2" }}>
                  <Form.Group controlId="formBasicusername">
                    <FaUser style={{ color: "#06a3da" }} />{" "}
                    <Form.Label> Full Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "1 / 2 / 2 / 3" }}>
                  <Form.Group controlId="formBasicEmail">
                    <MdEmail style={{ color: "#06a3da" }} />{" "}
                    <Form.Label> Email address </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "2 / 1 / 3 / 3" }}>
                  <Form.Group controlId="formBasicPassword">
                    <BsFillTelephoneFill style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      placeholder="Phone"
                      type="text"
                      required
                    />
                  </Form.Group>
                </div>
                <br />
                <div style={{ gridArea: "3 / 1 / 4 / 3" }}>
                  <Form.Group controlId="formBasicPassword">
                    <AiFillMessage style={{ color: "#06a3da" }} />{" "}
                    <Form.Label>Complaint</Form.Label>
                    <Form.Control
                      placeholder="Type your complaint"
                      as="textarea"
                      required
                    />
                  </Form.Group>
                </div>
                <br/>
                <div className="d-grid" style={{ gridArea: " 4 / 1 / 5 / 3" }}>
                  <Button
                    variant="primary btn-block"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <br />
        </div>
      </Container>
    </div>
  );
};

export default Complaint;
