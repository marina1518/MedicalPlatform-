import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import './App.css';
import Appadmin from './pages/Applicationadmin/Appadmin';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useSelector} from 'react-redux'

function App() {
   const chosencomp = useSelector(state => state.sidebarcomp)
   console.log(chosencomp);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="appadmin" element={<Appadmin />}> </Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
