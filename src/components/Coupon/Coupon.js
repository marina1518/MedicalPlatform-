

 import React from "react";
import ScratchCard from "react-scratchcard";
import couponCover from "./Card.jpg";
var cc = require('coupon-code');

const { useState } = React;
export default function Payment() {
  
  const [scratchedText, setScratchedText] = useState(
    "Congratulations! You WON!"
  );
  const handleScratchComplete = () => {
     
    //console.log("The card is now clear!");
    //setScratchedText("Congratulations! You WON!");
  };
 var x = cc.generate();
  const geht = false;
  const settings = {
    width: 500,
    height: 500,
    image: couponCover,
    finishPercent: 45,
    onComplete: () => handleScratchComplete()
  };
  return (
    <div >
      <ScratchCard {...settings}>
        {geht ? (
          <div>
            <p>hallo</p>
          </div>
        ) : (
          <div className="Text"> 
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
        </div>
        )}
      </ScratchCard>
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
