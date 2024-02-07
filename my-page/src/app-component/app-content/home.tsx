import React from 'react';
import { getTextFromJSON } from '../../utils/languageUtils';
import  { useLanguageContext } from '../../contexts/language-context';


const Home = () => {
    const context = useLanguageContext();
    const h1= getTextFromJSON(context.language, "home_content.h1");
    const intro = getTextFromJSON(context.language, "home_content.intro");

    return (
      // this line was needed so the content was centered in variuous browsers
      //the previous version only worked on firefox
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign : 'center' }}>
      <div className='w-5 sticky mx-auto'>
        <img src="/logo1.ico" alt="Logo" />
        <h1>{h1}</h1>
        <div dangerouslySetInnerHTML={{ __html: intro! }} />
      </div>
    </div>
    );
};

export default Home;