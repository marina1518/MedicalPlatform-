import React from 'react'
import "./announcment.css";
function OneAnnouncment(props) {
    //console.log(props)
  return (
       

       <div className="info">
      <div className="alert-icon">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <div className="announce-p">
        <p>
          <span>{props.announcement.announce.title} </span>{props.announcement.announce.description}
        </p>
      </div>
  </div>
  )
}

export default OneAnnouncment