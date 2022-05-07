import sidebarstate_reducer from "./sidebarcomp";

import auth_reducer from "./islogged";

import {combineReducers} from 'redux'
import profile_reducer from "./Profilesidebar";
import channel_reducer from "./meeting";
import order_reducer from "./order";
const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   auth:auth_reducer,
   profile_reducer:profile_reducer,
   channel_reducer:channel_reducer,
   order_reducer:order_reducer
   
})

export default allreducers ;