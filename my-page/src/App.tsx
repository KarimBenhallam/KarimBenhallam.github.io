import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-orange/theme.css'
import CustomMenu from './app-component/custom-menu';
import About from '../src/app-component/about';
import { BrowserRouter, Routes, Route } from "react-router-dom";

        
        



function App() {
  return (   
    <div className="App">
      <CustomMenu></CustomMenu>
      <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
