export const hospitals = ()=>{
    return {type : "hospitals"} 
}

export const clinics = ()=>{
    return {type : "clinics"} 
}

export const chart = ()=>{
    return {type : "chart"} 
}

export const pharmacies = ()=>{
    return {type : "pharmacies"} 
}

export const announcments = ()=>{
    return {type : "announcments"} 
}

/*export const signin = (token,usertype)=>{
    return {type : "Signin" , token : token , usertype : usertype } 
}*/
export const signin = (state)=>{
    return {type : "Signin" , state : state } 
}
export const logout = ()=>{
    return {type : "logout"} 
}

/************ profile actions */
export const info = ()=>{
    return {type : "info"} 
}

export const history = ()=>{
    return {type : "history"} 
}

export const appointments = ()=>{
    return {type : "appointments"} 
}

export const myorders = ()=>{
    return {type : "myorders"} 
}