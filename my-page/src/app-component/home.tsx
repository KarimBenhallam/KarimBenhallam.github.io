import React, { useContext, useState } from 'react';
import { getTextFromJSON } from '../utils/languageUtils';
import LanguageContextProvider, { LanguageContext } from '../contexts/language-context';

// Assume you have a language context
// const LanguageContext = React.createContext();

const Home = () => {
    const context = useContext(LanguageContext);
    const h1= getTextFromJSON(context?.language!, "home_content.h1");
    const p1= getTextFromJSON(context?.language!, "home_content.p1");
    const p2= getTextFromJSON(context?.language!, "home_content.p2");
    const p3= getTextFromJSON(context?.language!, "home_content.p3");
    const p4= getTextFromJSON(context?.language!, "home_content.p4");

    return (
        <div className='w-5 left-50 sticky mx-auto '>
            <img src="/logo1.ico" alt="Logo" />
             <h1>{h1}</h1>
            <p>
               {p1}
            </p>
            <p>
               {p2}
            </p>
            <p>
               {p3}
            </p>
            <p>
               {p4}
            </p>
        </div>
    );
};

export default Home;