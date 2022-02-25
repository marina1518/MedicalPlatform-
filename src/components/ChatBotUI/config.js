import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options/Options";
import FMBotAvatar from "./FMBotAvatar";

const config = {
  initialMessages: [
    createChatBotMessage(`Hello, what you want to do ?`, {
      widget: "options",
    }),
  ],
  botName: "Future Medical Bot",
  customComponents: { botAvatar: (props) => <FMBotAvatar {...props} /> },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      // mapStateToProps: ["gist"],
    },
    // {
    //   widgetName: "options",
    //   widgetFunc: (props) => <Options {...props} />,
    // },
  ],
};

export default config;
