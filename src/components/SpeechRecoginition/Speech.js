import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import './Voice.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";


import axios from 'axios';
import { info ,myorders , order_status ,appointments} from '../../actions';
const Speech = () => {

 const dispatch = useDispatch();
 const get_orders_store = JSON.parse(useSelector((state) => state.order_reducer)); //User Order 
const token = JSON.parse(useSelector((state) => state.auth)); //state of token
let handle_speak=''; // What to say 
var flag_speicific_dep = false ; // if ask about specific order
var flag_order = false ; // if wants to make order

var counter_var = 0 ;
//var approved_count = 0 ; 
const [approved_count,set_approved_count] =useState(0)
const [counter_state,set_counter_state]=useState(0)
//////// USER ORDER PROFILE
const [approved_array_orders,set_approved_array_orders] = useState([]); //Array of approved array of use
const [current_order_id,set_current_id]=useState("");
const [flag_approve_my_order ,set_approve_my_order] =useState(false); // if wants to make action to order 

const [flag_ask_my_order ,set_my_order] =useState(false); // if wants to ask about his orders
const [wanted_sentence,set_wanted]=useState("")

let wanted_sentece = ""; //to send to model api   

//TO DETECED KEY PRESS
var press_var = false ; // Key press handle 
const [press_state,set_press_state]=useState(false)
const [key_sound,set_key]=useState(0)
  const [transcript_index , setindex] = useState(0);

let navigate = useNavigate();
  const onEnd = () => {
    // You could do something here after speaking has finished
     listenContinuously();
     handle_speak='';
     flag_speicific_dep = false;
     //specialization = '';
     flag_order = false;
  };
  const { speak, voices ,speaking ,supported ,cancel} = useSpeechSynthesis({
    onEnd,
  });

const voice = voices[1] || null; //voices [1] arabic eg 1/6/7

  const handleKeyDown = (event) => {
    
    //console.log('A key was pressed', event.keyCode);
    set_key(event.keyCode)
    if (press_var)
    {
      press_var = false ;
      set_press_state(false)
    }
    else{
      press_var = true ;
      set_press_state(true)
    }

  };



 const handle_response = (response)=>{
   console.log("handle",response)
   switch(response) {
  case "Read The departments":
    read_departments(); 
    break;
  case "Go to hospitals":
     Get_Hospitals_Api();
     //go_hospitals();
    break;    
  case "Go to pharmacies":
     Get_Pharmacies_Api();
    break;   
  case "Go to clinics":
     Get_Clinics_Api();
    break;
 case "orders":
      flag_order = true;
      Get_Pharmacies_Api();
  break;  
   case "account":
     SpeechRecognition.stopListening();
     handle_speak = 'انا مش هقدر اساعدك فى عملية الدخول عشان محتاجة كتابة و عملية الخروج عشان الحماية'
     speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
  break;  
  case "profile information":
     SpeechRecognition.stopListening();
     if(!token.token){
        //Not login 
        handle_speak = "لازم تكون فاتح الأكونت بتاعك الأول"
        speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
     }
     else{
     handle_speak = 'انا مش هقدر اساعدك فى التغيير عشان محتاجة كتابة بس انا فتحتلك البروفايل '
     dispatch(info());
     navigate('/user');
     speak({ text: handle_speak , voice : voice , rate : 0.9}) 
     }//What to say 
  break;  

  case 'ازيك ، يارب يومك يكون كويس.ازاي اقدر اساعدك؟' :
     SpeechRecognition.stopListening();
     handle_speak = 'ايه الأخبار ياريت يومك يكون كويس ازاي اقدر اساعدك؟'
     speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
    break;
    case 'عفوا في خدمتك أي وقت' :
     SpeechRecognition.stopListening();
     //handle_speak = 'ايه الأخبار ياريت يومك يكون كويس ازاي اقدر اساعدك؟'
     speak({ text: response , voice : voice , rate : 0.9}) //What to say 
    break;  
    case 'My orders' :
      my_orders();
    break;  
    case 'my meetings' :
      my_meetings();
    break; 
        

  default:
    // code block
}
 }
 
 //// API VOICE MODEL
 const Get_Voice_model = async (message)=>{
 try {
        const res = await axios.post('https://chatbotmf.herokuapp.com/voice',
        {
          "msg":message
        })
        const data = await res.data;
        console.log(data)
        //set_model_response(data.response); //response out of model 
        handle_response(data.response); //handle model response 
       
    } 
    catch (err) {
        console.error(err);
    }
} 
//GET USER MEETINGS 

// GET USER ORDERS PROFILE 
const Get_User_meetings =()=>{
  
axios.get(`https://future-medical.herokuapp.com/user/meetings`,
{
  headers : { 'Authorization': `Bearer ${token.token}` }
}).then((res)=>{
console.log(res.data);

  SpeechRecognition.stopListening();
   //specialization = res.data[0].specialization ;
  //handle_speak = ` الطلبات بتاعتك هى  ` ;  
  var pending_meetings = "" ; var flag_pending = false;
  //var approved_orders = ""; var flag_approved = false;
  //var disapproved_orders = ""; var flag_disapproved = false;
  //var app_order_list = []
  res.data.forEach((x) => {
           if (x.status === "pending")
           {
             flag_pending =true ;
             var time_slot =  x.slot.split("-");
               pending_meetings+="مقابلة بالتاريخ"+ " " + x.Date+ " مع دكتور " + x.doctor.arabic_username + " من الساعة " + time_slot[0] + " الى"+time_slot[1] + " . ";
           }   
          }  )
if (flag_pending)
{
  handle_speak+=" مقابلات معادها مش الأن " +" . "+ pending_meetings;
} 

if (flag_pending == false)
{
   handle_speak += "لا يوجد مقابلات للمتابعة"
}

        speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 


}).catch((err)=>{console.log(err)})
}

// GET USER ORDERS PROFILE 
const Get_User_Orders =()=>{
  
axios.get(`https://future-medical.herokuapp.com/user/orders`,
{
  headers : { 'Authorization': `Bearer ${token.token}` }
}).then((res)=>{
console.log(res.data);
if(res.data !== "no doctors found in this department"){
  SpeechRecognition.stopListening();
   //specialization = res.data[0].specialization ;
  //handle_speak = ` الطلبات بتاعتك هى  ` ;  
  var pending_oders = "" ; var flag_pending = false;
  var approved_orders = ""; var flag_approved = false;
  var disapproved_orders = ""; var flag_disapproved = false;
  var app_order_list = []
  res.data.forEach((x) => {
           if (x.status === "pending")
           {
             flag_pending =true ;
               pending_oders+="طلب بالتاريخ"+ " " + x.order_data.Date+ " من " + x.pharmacy.arabic_name + " . " ;
           }   
           if (x.status === "approved")
           {
             app_order_list.push(x);
             
              /*if (flag_approved = false)
              { //Fisrt approved order
              approved_orders+="طلب بالتاريخ"+ " " + x.order_data.Date+ " من " + x.pharmacy.arabic_name + " . " + " السعر " + x.price + " . ";
              }*/
               flag_approved = true ;
            }   
           if (x.status === "disapproved")
           {
               flag_disapproved = true ;
               disapproved_orders+="طلب بالتاريخ"+ " " + x.order_data.Date+ " من " + x.pharmacy.arabic_name + " . " ;
           }       
     })
set_approved_array_orders(app_order_list); //Approved order List      
if (flag_pending)
{
  handle_speak+=" الطلبات دى لسة متردش عليها من الصيدلية" +" . "+ pending_oders;
} 
if (flag_disapproved)
{
  handle_speak+=" الطلبات دى متوافقش عليها من الصيدلية" + ". " +disapproved_orders;
} 
if (flag_approved)
{
  handle_speak+=" الطلبات دى اتوافق عليها من الصيدلية" + " . "+approved_orders;
  handle_speak+="طلب بالتاريخ "+ " " + app_order_list[0].order_data.Date+ " من " + app_order_list[0].pharmacy.arabic_name + " . " + " السعر " + app_order_list[0].price + " . ";
   handle_speak += " لو عاوز توافق على الطلب اوول واحد لو عاوز تلغى الطلب اوول اتنين "
   set_approve_my_order(true)
   //console.log(app_order_list[0])
   set_current_id(app_order_list[0]._id)
  if (app_order_list.length == 1)
  {
    console.log("only one approved ")
  }
  else 
  {
    set_approved_count( app_order_list.length);
   //approved_count = app_order_list.length ; //Length of array approved 
   counter_var = 1 ;// alli at2ra wahed 
   set_counter_state(1);
    //more than one element 
    //function takes the list say first .. 

  }
} 
if (flag_approved == false && flag_disapproved == false && flag_pending == false)
{
   handle_speak += "لا يوجد طلبات للمتابعة"
}

        speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
}

}).catch((err)=>{console.log(err)})
}

/// HANDLE THE REST OF APPROVED ORDERS 
const handle_rest_approved = ()=>{
  console.log("approved array" ,approved_array_orders)
  //console.log("counter var ",counter_var )
  console.log("counter state ",counter_state ) 
  SpeechRecognition.stopListening();
  handle_speak +="طلب بالتاريخ "+ " " + approved_array_orders[counter_state].order_data.Date+ " من " + approved_array_orders[counter_state].pharmacy.arabic_name + " . " + " السعر " + approved_array_orders[counter_state].price + " . ";
  handle_speak += " لو عاوز توافق على الطلب اوول واحد لو عاوز تلغى الطلب اوول اتنين "
   set_approve_my_order(true)
   //console.log(app_order_list[0])
   set_current_id(approved_array_orders[counter_state]._id)
   counter_var = counter_var + 1 ;
   set_counter_state(counter_state + 1);
    speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
} 
//// GET THE DOCTORS FOR SPECIFIC DEPARTMENT 
const Get_Doctors_Department =(dep)=>{
  console.log(dep);
  flag_speicific_dep = false ; ///// initial 
axios.get(`https://future-medical.herokuapp.com/user/department/${dep}`).then((res)=>{
console.log(res.data);
if(res.data !== "no doctors found in this department"){
  SpeechRecognition.stopListening();
   //specialization = res.data[0].specialization ;
  navigate(`/Doctors/${res.data[0].specialization }`)
  handle_speak = ` دكاترة قسم ${dep} ` ;  
  res.data.forEach((x) => {
           handle_speak+="دكتور"+ " " + x.arabic_username+ " من " + x.entity_id.arabic_name + " . " ;
     })
        speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
}
else {
  SpeechRecognition.stopListening();
   handle_speak = ` مفيش دكاترة متاحة فى القسم ده الأن ` ;  
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 

}
}).catch((err)=>{console.log(err)})
}

//////////////////// Get all hospitals 
 const Get_Hospitals_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/hospitals/arabic',
      )
        const data = await res.data;
        console.log(data)
         // sethospitals(data); //Save it  
        navigate('/Entities/hospitals');
        SpeechRecognition.stopListening();
        handle_speak = "المستشفيات الموجودة هى" ;  
        for (let i = 0 ; i < data.length ; i++) 
        {
            //await sleepNow (2500)
          handle_speak+=data[i].arabic_name+ "  . ";
        }
        speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
        //speak({ text: "مستشفيات" , voice : voice }) //What to say 
        
       
    } 
    catch (err) {
        console.error(err);
    }
} 

//////////////// GET ALL CLINICS
 const Get_Clinics_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/clinics/arabic',
      )
        const data = await res.data;
        console.log(data)
        navigate('/Entities/clinics');
        SpeechRecognition.stopListening();
        handle_speak = "العيادات الموجودة هى" ;  
         data.forEach((x) => {
           handle_speak+=x.arabic_name+ "  . ";
         })
        speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
    } 
    catch (err) {
        console.error(err);
    }
} 

//////////////// GET ALL PHARMACIES 
 const Get_Pharmacies_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/pharmacies/arabic',
      )
        const data = await res.data;
        console.log(data)
        navigate('/Entities/pharmacies');
        SpeechRecognition.stopListening();
        if (flag_order){
          handle_speak = "تقدر تحط صورة الروشتة و تطلبها من اى صيدلية من الصيدليات الموجودة" + " "; 
          
         data.forEach((x) => {
           handle_speak+=x.arabic_name+ "  . ";
         })
        speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
        }
        else{
          handle_speak = " الصيدليات الموجودة هى" + " ";  
         data.forEach((x) => {
           handle_speak+=x.arabic_name+ "  . ";
         })
        speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
        }
        
    } 
    catch (err) {
        console.error(err);
    }
}


///////////////// APRROVE ORDER USER 
const Approve_Order_Api = async(id)=>{
  console.log("Order Id" , id)
  try {
        const res = await axios.patch('https://future-medical.herokuapp.com/user/order/approve',{
            id : id 
        },{
  headers : { 'Authorization': `Bearer ${token.token}` }
})
        const data = await res.data;
        //SpeechRecognition.stopListening();
         //handle_speak = " تمت العملية بنجاح " + " ";  
         //speak({ text: handle_speak , voice : voice , rate :1 }) //What to say 
        //alert('Order approved')
           var o=[];
           for(var i=0; i<get_orders_store.length;i++)
           {
             if(get_orders_store[i]._id === id) {o.push(get_orders_store[i]); o[i]["status"]="preparing";}
             else o.push(get_orders_store[i]);
           }
           console.log(o)
           dispatch(order_status(o));
        
        console.log(data)       

    } 
    catch (err) {
        console.error(err);
    }

}

///////////////// Cancel ORDER USER 
const Cancel_Order_Api = async(id)=>{
  console.log("Order Id" , id)
  try {
        const res = await axios.patch('https://future-medical.herokuapp.com/user/order/cancel',{
            id : id 
        },{
  headers : { 'Authorization': `Bearer ${token.token}` }
})
        const data = await res.data;
        //SpeechRecognition.stopListening();
        //alert('Order cancelled successfully');
           var o=[];
           for(var i=0; i<get_orders_store.length;i++)
           {
             if(get_orders_store[i]._id !== id) o.push(get_orders_store[i]);
           }
           dispatch(order_status(o));
         //handle_speak = "  تمت العملية بنجاح " + " ";  
        // speak({ text: handle_speak , voice : voice , rate : 1}) //What to say 
        console.log(data)       
    } 
    catch (err) {
        console.error(err);
    }

}




/*const sleepNow = (delay) => new Promise ((resolve) => setTimeout (resolve, delay ))*/


//console.log("Voices Available" ,voices[1].lang); //////////See voices   


///////////////// departments tag 
const departments_format = ['طوارئ','جلدية','قلب','صدر و التنفس','تغذية','مسالك بولية','اطفال'];
const departments = ['الطوارئ','الجلدية','القلب','الصدر و التنفس','التغذية','مسالك بولية','طب الاطفال'];
//const departments = ['طب الاطفال','جراحة عامة','طب الاطفال','جراحة عامة','طب الاطفال','جراحة عامة'] ;
const read_departments = async ()=>{
  var word = wanted_sentece;
  console.log(word);
  for (let i = 0 ; i < departments.length ; i++)
{
    //await sleepNow (2500)
  var n = word.includes(departments[i]);
  if (n == true)
  {console.log("department is :" ,departments[i] ) ;
  Get_Doctors_Department(departments[i])
  flag_speicific_dep = true ;
   break;}
 
  var y = word.includes(departments_format[i]);
  console.log(y)
  if (y == true)
  {console.log("department is :" ,departments_format[i] ) ;
  Get_Doctors_Department(departments[i])
  flag_speicific_dep = true ;
   break;}
 
}
  
  if (flag_speicific_dep == false){
  //SpeechRecognition.stopListening();
  SpeechRecognition.stopListening();
  handle_speak = "الأقسام الموجودة هى" ;  
for (let i = 0 ; i < departments.length ; i++)
{
    //await sleepNow (2500)
  handle_speak+=departments[i]+ "  . ";
}
   speak({ text: handle_speak , voice : voice , rate : 0.8}) //What to say 
console.log("end")
}
}


const my_orders = ()=>{
   SpeechRecognition.stopListening(); 
   if (token.token)
   {
           dispatch(myorders())
           navigate('/user')
           Get_User_Orders();
   }
   else { //not logined 
    
  handle_speak = "لازم تكون فاتح الأكونت بتاعك الأول"
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
  }
}
const my_meetings = ()=>{
   SpeechRecognition.stopListening(); 
   if (token.token)
   {
           dispatch(appointments())
           navigate('/user')
           Get_User_meetings();
   }
   else { //not logined 
    
  handle_speak = "لازم تكون فاتح الأكونت بتاعك الأول"
  speak({ text: handle_speak , voice : voice , rate : 0.9}) //What to say 
  }
}


 const [message, setMessage] = useState('');
 /*const commands = [
   {
     command: 'reset',
     callback: () => resetTranscript()
   },
   {
     command: 'shut up',
     callback: () => setMessage('I wasn\'t talking.')
   },     
   {
     command: ['عرفني الأقسام الموجودة.','hi'],
     callback : () => read_departments()
   },
   { 
     command: 'عرفني المستشفيات الموجودة.',
     callback : () => go_hospitals()
   },
   {
     command: 'صباح الخير.',
     callback: () => speak({ text: 'صباح النور' , voice : voice })     
   },
 ]*/
const {
   transcript,
   interimTranscript,
   finalTranscript,
   resetTranscript,
   listening,
 } = useSpeechRecognition();


  const listenContinuously = () => {
   SpeechRecognition.startListening({
     continuous: true,
     language: 'ar-EG',
   });
 };

  React.useEffect(() => {
    
    window.addEventListener('keydown', (event)=>{handleKeyDown(event)});
    

    // cleanup this component

    return () => {

      window.removeEventListener('keydown', handleKeyDown);

    };

  }, []);






 useEffect(()=>{  

   if(key_sound == 32)  
   {
     if(listening)
     {SpeechRecognition.stopListening();}
     else{listenContinuously();}
   }
   if(key_sound == 27)  
   {
     set_approved_count(0)
     set_counter_state(0)
     cancel(); //Stop speaking
   }
 },[press_state])



 const Trial = ()=>{
   console.log("hii")
   //set_first_render(true)
   SpeechRecognition.stopListening();    
   handle_speak = "انا بوت هحاول اساعدك لو عاوز توقفنى و انا بتكلم دوس سكيب و لو محتاج تفتح أو تقفل المايك دوس سبيس"
  speak({ text: handle_speak , voice : voice , rate : 1})} //What to say }
 
 // Didmount(Trial,[])

 /*useEffect(()=>{
   console.log("hii")
   SpeechRecognition.stopListening();    
   handle_speak = "انا بوت هحاول اساعدك لو عاوز توقفنى و انا بتكلم دوس سكيب و لو محتاج تفتح أو تقفل المايك دوس سبيس"
  speak({ text: handle_speak , voice : voice , rate : 1}) //What to say 
 },[])*/


const replies_my_order = [" واحد."," إتنين."," اثنان."," واحد"," إتنين"," اثنان"]; 
 useEffect(() => {

    //console.log("first Done",handle_first_render)
    //if(handle_first_render){listenContinuously();}
    console.log("malkkkkkkkkk")
     listenContinuously();
   if (finalTranscript !== '') {
     console.log("my odrer",flag_ask_my_order);
    
     set_wanted('');
     wanted_sentece ='';
     //console.log("index",transcript_index)
     for (let i = transcript_index ; i < finalTranscript.length; i++ )
     {
       wanted_sentece+=finalTranscript[i];
       //console.log('sentece', wanted_sentece);
     }
     console.log('sentece', wanted_sentece); //GO TO THE MODEL 
      if(flag_approve_my_order)
     {
       set_approve_my_order(false) 
       if(replies_my_order.includes(wanted_sentece))
       {
         console.log("yes")
         var index_reply = replies_my_order.indexOf(wanted_sentece);
         if (index_reply == 0 || index_reply == 3)
         { //ALL orders
           console.log("Aprroveeeeeee The order ")
           //console.log(current_order_id)
          Approve_Order_Api(current_order_id);
         }
         else{
           //Specific order 
           Cancel_Order_Api(current_order_id);
           console.log("Disprroveeeeeee The order ")    
           }
       }
       else{
         if (counter_state == approved_count){
            Get_Voice_model(wanted_sentece);
             setindex(finalTranscript.length); //Update the index 
             console.log("model")
            ////////////////////m3nah ano b3dha mosh hykml orders
            }
            }
           
      console.log("counter",counter_state)
      console.log("approved count",approved_count)
      if (counter_state !== approved_count){
               handle_rest_approved();    
            }
      else{ 
              counter_var = 0 ; 
              set_counter_state(0)
              set_approved_count(0)
            }
        
     }
     else{
     Get_Voice_model(wanted_sentece); //voice moedl 
     set_wanted(wanted_sentece)}
     
     //transcript_index = finalTranscript.length ; 
     setindex(finalTranscript.length); //Update the index 
     //console.log("index",transcript_index)
     console.log('Got final result:', finalTranscript);
   }
 }, [ finalTranscript]);

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
 }

 return (
   <div>
     {/*<div>
       <span>
         listening:
         {' '}
         {listening ? 'on' : 'off'}
       </span>
       <div>
         <button type="button" onClick={resetTranscript}>Reset</button>
         <button type="button" onClick={listenContinuously}>Listen</button>
         <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
       </div>
     </div>
     <div>
       {message}
     </div>
     <div>
     <span>{transcript}</span>*/}
     <button className="voice-btn" onClick={listening?SpeechRecognition.stopListening:listenContinuously}>
        <KeyboardVoiceIcon htmlColor={listening?'green':'red'}/>
           </button>
   </div>
 );
};

export default Speech;