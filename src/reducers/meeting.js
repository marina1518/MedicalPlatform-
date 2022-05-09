const entry_state = JSON.stringify("")
const meeting_reducer = (state = entry_state , action)=>{ //APP ADMIN
switch(action.type){
case "channel-name":
    console.log(action.state);
    return JSON.stringify(action.state) ;
default :
     return state ;
}
}

export default meeting_reducer ;