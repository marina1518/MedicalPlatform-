import React,{useState,useEffect} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import './pharmacyorder.css'
import PlaceholderLoading from 'react-placeholder-loading'
function OrderLoading() {
  return (
    <div>       
<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton >
        
            <div style={{'color':'#064e68'}}>
            <Modal.Title id="contained-modal-title-vcenter"   >
         <strong> Welcome to {props.pharmacyname}   </strong>         
          </Modal.Title>
             <span style={{marginRight:'2rem'}}> <i class="bi bi-geo-alt-fill"></i> {props.pharmacyaddress}
                  </span>
               <span> <i class="bi bi-telephone-fill"></i> {props.pharmacyphone}
                  </span> 
                  </div>
  
      </Modal.Header>
      <Modal.Body>
         <PlaceholderLoading shape="circle" width={60} height={60} />
         </Modal.Body>
         </Modal>  
    </div>
  )
}

export default OrderLoading