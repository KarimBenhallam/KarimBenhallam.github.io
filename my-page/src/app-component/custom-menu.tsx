import React from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-orange/theme.css';
import { Menubar } from 'primereact/menubar';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { getTextFromJSON } from '../utils/languageUtils';
import { Language, LanguageContext, useLanguageContext } from '../contexts/language-context';
import { Content, useContentContext } from '../contexts/content_context';


interface CustomMenuProps {
  onShareData: ({ language, content }: { language: Language, content: Content }) => void;
}

const CustomMenu = ({ onShareData }: CustomMenuProps) => {
  const { language, setLanguage } = useLanguageContext();
  const { content, setContent } = useContentContext();

  const handleContentChange = (selectedContent: Content) => {
    setContent(selectedContent);
    onShareData({ language, content });
  }


  const items = [
    {
      label: getTextFromJSON(language, 'home'),
      icon: 'pi pi-home',
      command: () => { handleContentChange("home") }
      // url: '/'
    },
    {
      label: getTextFromJSON(language, 'about-me'),
      icon: 'pi pi-user',
      command: () => { handleContentChange("about") }

      // url: 'about'
    },
    {
      label: getTextFromJSON(language, 'resume'),
      icon: 'pi pi-file-pdf',
      command: () => { handleContentChange("resume") }
      // url: 'resume'
    },
    {
      label: getTextFromJSON(language, 'work-samples'),
      icon: 'pi pi-file-edit',
      command: () => { handleContentChange("work") }
      // url : 'work-samples'
    },
  ];


  return (
    <div className="Menu">
      <Menubar model={items}
        start={<img src="/logo1.ico" alt="Logo" style={{ width: '64px', height: '64px' }} />}
        end={renderLanguageDropdown(useLanguageContext())} className="mb-2" />
    </div>
  );
  function renderLanguageDropdown(context: LanguageContext) {
    const handleLanguageChange = (e: DropdownChangeEvent) => {
      setLanguage(e.value);
      onShareData({ language, content });

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
