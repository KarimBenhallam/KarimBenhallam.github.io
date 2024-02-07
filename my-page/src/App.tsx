import React from 'react';
import 'primeflex/primeflex.css';
import './App.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-orange/theme.css'
import CustomMenu from './app-component/custom-menu';
import About from './app-component/app-content/about';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './app-component/app-content/home';
import LanguageContextProvider, { Language, useLanguageContext } from './contexts/language-context';
import Resume from './app-component/app-content/resume';
import Work from './app-component/app-content/work-samples';
import ContentContextProvider, { Content, useContentContext } from './contexts/content_context';
import { classNames } from 'primereact/utils';
import DisplayContent from './app-component/display-content';


// const {content, setContent} = useContentContext()
// const {language, setLanguage} = useLanguageContext() 





function App() {
  var language : Language = 'en';
  var content : Content = 'home';
  
  const getData = (data : {language : Language, content : Content}) => {language = data.language; content = data.content}
  return (
    <div className="App">
      <LanguageContextProvider defaultLanguage={language}>
        <ContentContextProvider>
        <CustomMenu onShareData = {getData} />
        <DisplayContent/>
        </ContentContextProvider>
      </LanguageContextProvider>
    </div>
  );
}

export default App;
