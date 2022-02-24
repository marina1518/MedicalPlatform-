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

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handlehospitaloption = () => {
    const message = this.createChatbotMessage("انا فادى");
    // <Link to="/login"></Link>;
    this.addMessageToState(message);
  };

  hihandler = () => {
    const message = this.createChatbotMessage(
      "Hello,we are here for your care"
    );
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
