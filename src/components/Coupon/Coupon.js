import React from "react";
import ScratchCard from "react-scratchcard";
import couponCover from "./Card.jpg";
import Button from "@mui/material/Button";
import "./coupon.css";

var cc = require("coupon-code");

const { useState } = React;
export default function Payment(props) {
  const [scratchedText, setScratchedText] = useState(
    "Congratulations! You WON!"
  );
  const handleScratchComplete = () => {
    //console.log("The card is now clear!");
    //setScratchedText("Congratulations! You WON!");
  };
  var x = cc.generate();
  const geht = false;
  // const settings = {
  //   width: 500,
  //   height: 500,
  //   image: couponCover,
  //   finishPercent: 45,
  //   onComplete: () => handleScratchComplete(),
  // };
  return (
    <div>
      {/* <ScratchCard {...settings}> */}
      {/* {geht ? (
          <div>
            <p>hallo</p>
          </div>
        ) : ( */}
      <div className="coupon-container">
        <div className="coupon-card">
          <div className="image1free">
            <img
              alt="freecouponimg1"
              src="/assets/images/free4.png"
              width="120"
            />
          </div>
          <form className="form">
            {/* <h2>Hello There!</h2> */}
            <h1 className="coupon-code">
              <code style={{ color: "white" }}>
                Coupon code <br /> {x}
              </code>
            </h1>
            <div style={{ paddingBottom: "1rem" }}>
              <input
                type="text"
                name="code"
                placeholder="Paste Coupon Code"
              ></input>
            </div>
            <div>
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                onClick={props.clickSubmit}
                style={{ marginRight: "1rem" }}
              >
                Submit
              </Button>
              <Button
                variant="text"
                onClick={props.close}
                style={{ color: "white" }}
              >
                Close
              </Button>
            </div>
          </form>
          <div className="image2free">
            <img
              alt="freecouponimg2"
              src="/assets/images/free4.png"
              width="120"
            />
          </div>
        </div>
      </div>
      {/* )}
      </ScratchCard> */}
    </div>
  );
}

/*import React from "react";

import ScratchCard from "react-scratch-coupon";

export default function Payment() {

    console.log(x);
    const settings = {
    width: 1000,
    height: 1000,
    image: "https://image.shutterstock.com/image-vector/100-off-rubber-stamp-red-260nw-1862921821.jpg",
    finishPercent: 90,
    //onComplete: () => handleScratchComplete()
  };
  return (
    <div className="App">

      <ScratchCard {...settings} >
        <form className="form">
          <h2>Hello There!</h2>
          <h1>
            <code>Coupon code : {x}</code>
          </h1>
          <div>
            <input type="text" name="code" placeholder="Coupon Code"></input>
          </div>
          <div>
            <input type="submit" value="Submit"></input>
          </div>
        </form>
      </ScratchCard>
    </div>
  );
}*/
