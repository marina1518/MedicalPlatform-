import axios from "axios";
import "./login.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import Webcam from "react-webcam";
import { useRef, useState , useEffect } from "react";
import { db } from "./firebase";
import {  doc,  setDoc,  collection,  getDocs,  query,  where,} from "firebase/firestore";
import { Spinner } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../actions";

const FaceModel = () => {
  let navigate = useNavigate();
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  const dispatch = useDispatch();
  // let [imgCount, setImgCount] = useState(0);
  // let img = "No Image";
  // // 1)
  const All_mails_api = async()=>{
    try{
           const res = await axios.get("https://future-medical.herokuapp.com/emails") ;
           const data = await res.data ;
           console.log("mails",data)
           Login_face(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }

   const Login_face_api = async(mail)=>{
    try{
           const res = await axios.post("https://future-medical.herokuapp.com/login/faceID",
           {
            email : mail
           }) ;
           const data = await res.data ;
            dispatch(signin(data)); //save login data redux 
            console.log(token);
            navigate("/");
           //console.log("mails",data)
           //Login_face(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  
  const Login_face = async(mails)=>{
   const res = await axios.post("http://192.168.1.109:5000/face_id",
   {
     mails: mails, //FROM MARY API
    CurrUser : ["login@gmail.com"]
   })
   const data = await res.data ;
   
   console.log("API FACE",data)
   if (data.result==="Not Valid")
   {
     alert("NOT VALID USERA")
   }
   else {
     Login_face_api(data.result) ; //send email to login api [email from face model ]
   }
   
  }

  /*useEffect(()=>{
   All_mails_api()   
  },[])*/


   /*useEffect(()=>{
    Login_face()
   },[])*/
  let allImages = [];
  let imgCount = 0;

  const [loading, setloading] = useState(false);
  const webRef = useRef(null);
  let img = "No Image";
  const showImage = () => {
    console.log("yaraaaaaaaaab")
    img = webRef.current.getScreenshot();
    //console.log(img);
    imgCount++;
    upload(img, `${imgCount}`); // sec argument unique id
    All_mails_api() 
    //get_all_data();
    //get_specific_data("tharwat") // parameter key value to search
    setdone(true);
  };
  const [done, setdone] = useState(false);

  // 2)
  const upload = async (image, uniqueid) => {
    await setDoc(doc(db, "login@gmail.com", uniqueid), {
      key: "login@gmail.com",
      base64: `${image}`,
    });
  }; //we may add key {key:"gg",base64:image}

  const get_all_data = async () => {
    const querySnapshot = await getDocs(collection(db, "model images"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().base64);
    });
  };

  const get_specific_data = async (key) => {
    const q = query(
      collection(db, "model images"),
      where("key", "==", `${key}`)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().base64);
    });
  };

  return (
    <>
      {!loading ? (
        <div className="login_sigup_container">
          <Container>
            <div className="form-container_login">
              <h1
                // className="shadow-sm mt-5 p-3 text-center rounded"
                style={{ color: "#06a3da", marginTop: "30px" }}
              >
                Welcome Back
              </h1>
              <br />
              <div className="form-details_login">
                <div className="login_camera_container">
                  <Webcam
                    ref={webRef}
                    className="CameraDim"
                    videoConstraints={{
                      width: 480,
                      height: 480,
                      aspectRatio: 1,
                    }}
                  />
                </div>
                <br />
                <div className="d-grid">
                  <Button variant="primary btn-block" onClick={showImage} type="button">
                      Login
                    </Button>
                </div>
                <br />
                <div className="text-center">
                  <p>
                    Login using your email
                    <Link to={"/login"}>
                      <a className="ml-1 text-blue-900 ">
                        {" "}
                        <u>Login Page</u>
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="text-center">
                  <p>
                    join us now
                    <Link to={"/signup"}>
                      <a className="ml-1 text-blue-900 ">
                        {" "}
                        <u>Register here</u>
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <div style={{ margin: "auto" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}      
    </>
    // <div className="App">
    // 	<h1> Welcome </h1>

    // 	<Webcam
    // 		ref={webRef}
    // 		className="CameraDim"
    // 		videoConstraints={{
    // 			width: 720,
    // 			height: 720,
    // 			aspectRatio: 1,
    // 		}}
    // 	/>
    // 	<Button
    //           variant="primary btn-block"
    //           type="submit"
    //           onclick={showImage}
    //         >
    //           Login
    //         </Button>
    // </div>
  );
};

export default FaceModel;
