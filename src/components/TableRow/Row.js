import React from 'react'

export default function Row(props) {
    return (
        
    <tr style={{ backgroundColor:' rgb(251, 251, 255)' , padding:'20px' , fontSize:'17px'  }}>
      <td style={{display:'flex',flexDirection:'row',alignItems:'center',padding:'20px' }}>{props.name}</td>
      <td>{props.number}</td>
      <td style={{width:'200px',padding:'10px'}}>{props.location}</td>
      <td>{props.admin}</td>
    </tr>
        
    )
}
