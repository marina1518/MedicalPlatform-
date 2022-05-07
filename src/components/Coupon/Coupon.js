import React from "react";

import ScratchCard from "react-scratch-coupon";
var cc = require('coupon-code');
export default function Payment() {
    var x = cc.generate();
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
}
