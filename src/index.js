import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,applyMiddleware} from 'redux'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' //reactlocalstorage 
import allreducers from './reducers/index'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'

const persistConfig ={
  key:'main-root',
  storage,
} 
const persistedReducer = persistReducer(persistConfig,allreducers);
let mystore = createStore(persistedReducer,applyMiddleware());

const persistor = persistStore(mystore);  
ReactDOM.render(
  <React.StrictMode>
    <Provider store={mystore}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate >
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

