class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hi")) {
      this.actionProvider.hihandler();
    }
    if (lowercase.includes("hospitals") || lowercase.includes("hosp")) {
      this.actionProvider.handlehospitaloption();
    }
    console.log(this.state);
  }
}

export default MessageParser;
