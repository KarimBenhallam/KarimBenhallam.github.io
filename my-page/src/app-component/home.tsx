import React from 'react';
import { getTextFromJSON } from '../utils/languageUtils';
import  { useLanguageContext } from '../contexts/language-context';


const Home = () => {
    const context = useLanguageContext();
    const h1= getTextFromJSON(context.language, "home_content.h1");
    const p1= getTextFromJSON(context.language, "home_content.p1");
    const p2= getTextFromJSON(context.language, "home_content.p2");
    const p3= getTextFromJSON(context.language, "home_content.p3");
    const p4= getTextFromJSON(context.language, "home_content.p4");

    return (
      // this line was needed so the content was centered in variuous browsers
      //the previous version only worked on firefox
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign : 'center' }}>
      <div className='w-5 sticky mx-auto'>
        <img src="/logo1.ico" alt="Logo" />
        <h1>{h1}</h1>
        <p>{p1}</p>
        <p>{p2}</p>
        <p>{p3}</p>
        <p>{p4}</p>
      </div>
    </div>
    );
};

export default Home;