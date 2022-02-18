import React from "react";
import "./departments.css";
import { Specialization } from "../../data";
import { Link , useNavigate} from "react-router-dom";

const Departmets = (props) => {
  
 
  //props.clicked_department
  return (    
    <div>
      <section className="section-container">
        <div className="spec-title-info">
          <h1 className="spec-title">Specializations</h1>
        </div>
        <div className="specs-container">
          {Specialization.map((item) => (
            <div className="specs-item" key={item.id}>
              <div className="specs-image-container">
                <Link to={`/Doctors/${item.id}`}> {/*Go to doctors page for this department//*/}
                  <img src={item.image} alt={item.name} />
                </Link>
              </div>
              <div className="specs-data">
                 <Link to={`/Doctors/${item.id}`}>
                  <p className="specs-name">{item.name}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Departmets;
