import React from 'react';
import { useLanguageContext } from "../contexts/language-context";

const Resume = () => {
    const context = useLanguageContext();
    return (
      // this line was needed so the content was centered in variuous browsers
      //the previous version only worked on firefox
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign : 'center' }}>
        {context.language === "en"? (
      <embed src="./resumes/english.pdf" className='w-12 h-screen' />) : (<embed src="./resumes/french.pdf" className='w-12 h-screen'/>)}
    </div>
    );
};

export default Resume;