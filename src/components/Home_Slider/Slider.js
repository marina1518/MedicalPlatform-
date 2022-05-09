import React, { useRef } from "react";
import "./slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const Slider = (props) => {
  const executeScroll = () => props.refProp.current.scrollIntoView();

  return (
    <Carousel>
      <Carousel.Item className="edit-item">
        <div className="edit-caption">
          <h6>
            Welcome to <span>future medical</span>
          </h6>
          <h1>
            We are here
            <br />
            For Your care
          </h1>
          <p className="p-s1-color">
            We make our appointment with any doctor much easier
            <br />
            you can meet Doctors and Healthcare Professionals in real time video
          </p>
          {/* <Link to="/"> */}
          <button className="slide1-btn" onClick={executeScroll}>
            Make an appointment
          </button>
          {/* </Link> */}
        </div>
        <img
          className="d-block w-100"
          //src="holder.js/800x400?text=First slide&bg=373940"
          src="assets/images/slide1-edited2.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="edit-item">
        <div className="edit-caption">
          <h6>
            Welcome to <span>future medical</span>
          </h6>
          <h1>
            We are here
            <br />
            For Your care
          </h1>
          <p className="p-s2-color">
            We can make order from any pharmacy
            <br />
            you don't need to go to pharmacy to buy medicine
          </p>
          <Link to="/Entities/pharmacies">
            <button className="slide1-btn">Make an order</button>
          </Link>
        </div>
        <img
          className="d-block w-100"
          //src="holder.js/800x400?text=First slide&bg=373940"
          src="assets/images/slide2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item> */}

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default Slider;
