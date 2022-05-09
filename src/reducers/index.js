import sidebarstate_reducer from "./sidebarcomp";

import auth_reducer from "./islogged";
import meeting_reducer from './meeting';
import {combineReducers} from 'redux'
import profile_reducer from "./Profilesidebar";

import order_reducer from "./order";

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   auth:auth_reducer,
   profile_reducer:profile_reducer,
  meeting_reducer:meeting_reducer,
   order_reducer:order_reducer
   
})

export default allreducers ;