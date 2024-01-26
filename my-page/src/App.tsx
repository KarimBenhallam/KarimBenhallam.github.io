import React from 'react';
import 'primeflex/primeflex.css';
import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-orange/theme.css'
import CustomMenu from './app-component/custom-menu';
import About from '../src/app-component/about';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './app-component/home';
import LanguageContextProvider from './contexts/language-context';
import Resume from './app-component/resume';
import Work from './app-component/work-samples';







function App() {
  return (
    <div className="App">
      <LanguageContextProvider>
        <CustomMenu></CustomMenu>
        <BrowserRouter>
          <Routes>
            <Route path="/about" element={<About />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/resume' element={<Resume />}></Route>
            <Route path='/work-samples' element={<Work />}></Route>
          </Routes>
        </BrowserRouter>
      </LanguageContextProvider>
    </div>
  );
}

export default App;
