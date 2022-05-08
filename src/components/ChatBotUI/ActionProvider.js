// class ActionProvider {
//   constructor(
//     createChatBotMessage,
//     setStateFunc,
//     createClientMessage,
//     stateRef,
//     createCustomMessage,
//     ...rest
//   ) {
//     this.createChatBotMessage = createChatBotMessage;
//     this.setState = setStateFunc;
//     this.createClientMessage = createClientMessage;
//     this.stateRef = stateRef;
//     this.createCustomMessage = createCustomMessage;
//   }
// }
// export default ActionProvider;
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handlemess = async (message) => {
    try {
      // console.log("actionprovider", message);
      let { data } = await axios.post("https://chatbotmf.herokuapp.com/chat", {
        msg: message,
      });
      // console.log("res", data);
      // console.log("response:", data.response);
      // console.log("response_data", data.data);
      const replymess = this.createChatbotMessage(data.response);
      // console.log("replymessage:", replymess);
      this.addMessageToState(replymess);
    } catch (err) {
      if (err.res) {
        console.log(err.data.response);
        console.log(err.data.status);
        console.log(err.data.headers);
      } else {
        console.log(`Error ${err.message}`);
      }
    }
  };

  handlehospitaloption = () => {
    const optionmess = this.createChatbotMessage("Click this button", {
      widget: "hospital_option",
    });
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };
  handleSpecializationoption = () => {
    const optionmess = this.createChatbotMessage("Click this button", {
      widget: "specialization_option",
    });
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handlehclinicsoption = () => {
    const optionmess = this.createChatbotMessage("Click this button", {
      widget: "clinics_option",
    });
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handlepharmacyoption = () => {
    const optionmess = this.createChatbotMessage("Click this button", {
      widget: "pharmacy_option",
    });
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  // hihandler = () => {
  //   const message = this.createChatbotMessage(
  //     "Hello,we are here for your care"
  //   );
  //   this.addMessageToState(message);
  // };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
