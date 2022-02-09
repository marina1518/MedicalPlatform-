import sidebarstate_reducer from "./sidebarcomp";

import islogged from "./islogged"

import {combineReducers} from 'redux'

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
    islogged:islogged
})

export default allreducers ;