import React from "react";
import "./announcment.css";
import { Link } from "react-router-dom";
import OneAnnouncment from "./OneAnnouncment";

const Announcment = ({Announcments}) => {
  console.log(Announcments);
  return (
    // <section className="announce-container">
    <>
   {(Announcments.length !==0 )&& Announcments.map((announcement) => (
            <OneAnnouncment announcement={announcement} key={announcement.id}/>
          ))}
   </>
    // </section>
  );
};

export default Announcment;
