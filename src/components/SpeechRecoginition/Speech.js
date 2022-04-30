import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import './Voice.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';

const Speech = () => {
  const [transcript_index , setindex] = useState(0);
//let transcript_index = 0 ; //index for transpect 
let wanted_sentece = ""; //to send to model api   
let navigate = useNavigate();
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, voices } = useSpeechSynthesis({
    onEnd,
  });

const voice = voices[7] || null; //voices [1] arabic eg 1/6/7

const departments = ['طب الاطفال','جراحة عامة'] ;
const read_departments = ()=>{
for (let i = 0 ; i < departments.length ; i++)
{
     speak({ text: departments[i] , voice : voice }) //What to say 
}
}

const go_hospitals = ()=>{
navigate('/Entities/hospitals');
//API HOSPITALS 
}


 const [message, setMessage] = useState('');
 const commands = [
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
 ]
const {
   transcript,
   interimTranscript,
   finalTranscript,
   resetTranscript,
   listening,
 } = useSpeechRecognition({ commands });


  const listenContinuously = () => {
   SpeechRecognition.startListening({
     continuous: true,
     language: 'ar-EG',
   });
 };
 useEffect(() => {
     listenContinuously();
   if (finalTranscript !== '') {
     //console.log("index",transcript_index)
     for (let i = transcript_index ; i < finalTranscript.length; i++ )
     {
       wanted_sentece+=finalTranscript[i];
       //console.log('sentece', wanted_sentece);
     }
     console.log('sentece', wanted_sentece); //GO TO THE MODEL 
     wanted_sentece ='';
     //transcript_index = finalTranscript.length ; 
     setindex(finalTranscript.length); //Update the index 
     //console.log("index",transcript_index)
     console.log('Got final result:', finalTranscript);
     //transcript='hi';
     //console.log('after',finalTranscript)
     //resetTranscript();
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