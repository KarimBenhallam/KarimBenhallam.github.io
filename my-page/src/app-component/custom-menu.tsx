import React from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-orange/theme.css';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import { getTextFromJSON } from '../utils/languageUtils';
import { LanguageContext, useLanguageContext } from '../contexts/language-context';

const CustomMenu = () => {
  const {language, setLanguage} = useLanguageContext();


    const items = [
        {
          label: getTextFromJSON(language, 'home'),
          icon: 'pi pi-home',
          url: '/'
        },
        {
          label: getTextFromJSON(language, 'about-me'),
          icon: 'pi pi-user',
          url: 'about'
        },
        {
          label: getTextFromJSON(language, 'resume'),
          icon: 'pi pi-file-pdf',
          url: 'resume'
        },
        {
          label: getTextFromJSON(language, 'work-samples'),
          icon: 'pi pi-file-edit',
          url : 'work-samples'
        },
      ];


  return (
    <div className="Menu">
      <Menubar model={items} 
      start={<img src="/logo1.ico" alt="Logo" style={{ width: '64px', height: '64px' }} />}
      end={renderLanguageDropdown(useLanguageContext())} className="mb-2" />
    </div>
  );
  function renderLanguageDropdown(context : LanguageContext) {
    const handleLanguageChange = (e:any) => {
      setLanguage(e.value);
      console.log(e.value)
    };
  
    return (
      <Dropdown
        value={language}
        options={[
          { label: '🇬🇧 EN', value: 'en' }, 
          { label: '🇫🇷 FR', value: 'fr' },
        ]}
        onChange={handleLanguageChange}
      />
    );
  }
};



export default CustomMenu;
