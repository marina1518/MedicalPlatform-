import React from 'react'
import './sidebar.css'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import DashboardIcon from '@material-ui/icons/Dashboard';
export default function Slidebar(props) {
    return (
        <div className='SIDEBAR'>
            
            <ul style={{padding:'0 25px' ,marginTop:'80px'}}>
                 <li className='item' onClick={()=>{props.change('Chart')}} >
                    <DashboardIcon htmlColor='#7672ca' />
                    Dashboard
                </li>
                <li className='item'  onClick={()=>{props.change('Hospital')}}>
                    <LocalHospitalIcon htmlColor='#7672ca' />
                    Hospitals
                </li>
                <li className='item' onClick={()=>{props.change('Clinic')}}>
                    <LocalHospitalIcon htmlColor='#7672ca'/>
                    Clinics
                </li>
                <li className='item'onClick={()=>{props.change('Pharmacy')}}>
                    <LocalPharmacyIcon htmlColor='#7672ca' />
                   Pharmacies
                </li>
                
                 <li className='item' onClick={()=>{props.change('Announcement')}}>
                     <AnnouncementIcon htmlColor='#7672ca' />
                   Announcements
                </li>
            </ul>
        </div>
    )
}
