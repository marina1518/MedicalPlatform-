import React, { useState } from "react";
import "./videochat.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const VideoChat = (props) => {
  const dr_email = props.dr_email;
  console.log("email from videochat", props.dr_email);

  const handleJoinMeeting = () => {
    localStorage.setItem("Dr_email", dr_email);
  };

  return (
    <div>
      {props.button_state ? (
        <Link to="/user/meetingroom">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleJoinMeeting}
          >
            Join Meeting
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleJoinMeeting}
          disabled
        >
          Join Meeting
        </Button>
      )}
    </div>
  );
};

export default VideoChat;
