import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handlehospitaloption = () => {
    const optionmess = this.createChatbotMessage("Click this button", {
      widget: "hospital_option",
    });
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handleprofileoption = () => {
    console.log("hereprofile");
    const optionmess = this.createChatbotMessage("Click this button", {
      widget: "profile_option",
    });
    setTimeout(() => {
      this.addMessageToState(optionmess);
    }, 2000);
  };

  handlemess = async (message) => {
    try {
      // console.log("actionprovider", message);
      let { data } = await axios.post("https://chatbotmf.herokuapp.com/chat", {
        msg: message,
      });
      console.log("res", data);
      console.log("response:", data.response);

      const replybotmess = data.response;
      console.log("replybotmess", replybotmess);

      const lower_case_mess = replybotmess.toLowerCase();

      console.log(lower_case_mess);

      if (
        lower_case_mess.includes("hospitals") ||
        lower_case_mess.includes("hospital") ||
        lower_case_mess.includes("مستشفى") ||
        lower_case_mess.includes("مستشفيات")
      ) {
        this.handlehospitaloption();
      }

      if (
        lower_case_mess.includes("clinics") ||
        lower_case_mess.includes("clinic") ||
        lower_case_mess.includes("عيادة") ||
        lower_case_mess.includes("عيادات")
      ) {
        this.handlehclinicsoption();
      }
      if (
        lower_case_mess.includes("صيدلية") ||
        lower_case_mess.includes("pharmacy") ||
        lower_case_mess.includes("pharmacies") ||
        lower_case_mess.includes("صيدليات")
      ) {
        this.handlepharmacyoption();
      }
      if (
        lower_case_mess.includes("تخصصات") ||
        lower_case_mess.includes("تخصص") ||
        lower_case_mess.includes("دكاترة") ||
        lower_case_mess.includes("specialization")
      ) {
        this.handleSpecializationoption();
      }
      if (
        lower_case_mess.includes("Personal") ||
        lower_case_mess.includes("Appointment") ||
        lower_case_mess.includes("Appointments") ||
        lower_case_mess.includes("order") ||
        lower_case_mess.includes("orders")
      ) {
        // console.log("condition_here");
        this.handleprofileoption();
      }
      // const temp = "ممكن تضغط على زرار 'login'وبعد كده دوس 'Register'";

      // const temp2 =
      //   "محتاج تدور على دكتور اللى انت عاوزه و بعد كده تضغط على زرار 'Register'";
      // const temp3 =
      //   "ممكن تضغط على زرار login من فوق بعدها تضغط على زرار Register here وتملى بياناتك";

      // const temp =
      //   "معاد الميتنج بتاعك هيبقى  الساعة 6:34 و هيبقى يوم الاتنين و احنا شغالين 123123123 hours وبعد كده تقفل الميتنج يا مريض";

      const replymess = this.createChatbotMessage(replybotmess);
      console.log("replymessage:", replymess);
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
