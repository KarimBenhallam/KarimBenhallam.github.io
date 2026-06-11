import { Menubar } from 'primereact/menubar';
import { Language, useLanguageContext } from '../contexts/language-context';
import { Content, useContentContext } from '../contexts/content_context';
import './custom-menu.css';

interface CustomMenuProps {
  onShareData: (data: { language: Language; content: Content }) => void;
}

const KBMark = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    aria-label="Karim Benhallam"
    className="kb-mark"
  >
    <rect width="32" height="32" rx="8" fill="var(--accent-muted)" />
    <text
      x="16"
      y="22"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
      fontWeight="700"
      fontSize="13"
      fill="var(--accent)"
      letterSpacing="-0.5"
    >
      KB
    </text>
  </svg>
);

const CustomMenu = ({ onShareData }: CustomMenuProps) => {
  const { language, setLanguage } = useLanguageContext();
  const { content, setContent } = useContentContext();

  const handleContentChange = (selected: Content) => {
    setContent(selected);
    onShareData({ language, content: selected });
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    onShareData({ language: lang, content });
  };

  const isEn = language === 'en';

  const navItems = [
    { label: isEn ? 'Home'         : 'Accueil',               icon: 'pi pi-home',     key: 'home'   as Content },
    { label: isEn ? 'About Me'     : 'À Propos',              icon: 'pi pi-user',     key: 'about'  as Content },
    { label: isEn ? 'Resume'       : 'Curriculum Vitae',      icon: 'pi pi-file-pdf', key: 'resume' as Content },
    { label: isEn ? 'Projects'     : 'Projets',               icon: 'pi pi-code',     key: 'work'   as Content },
  ];

  const menuItems = navItems.map(item => ({
    label: item.label,
    icon: item.icon,
    className: content === item.key ? 'p-menuitem-active-custom' : '',
    command: () => handleContentChange(item.key),
  }));

  const languageToggle = (
    <div className="kb-lang-toggle" role="group" aria-label="Language selection">
      <button
        className={`kb-lang-btn${isEn ? ' kb-lang-btn--active' : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-pressed={isEn}
      >
        EN
      </button>
      <span className="kb-lang-sep" aria-hidden="true">/</span>
      <button
        className={`kb-lang-btn${!isEn ? ' kb-lang-btn--active' : ''}`}
        onClick={() => handleLanguageChange('fr')}
        aria-pressed={!isEn}
      >
        FR
      </button>
    </div>
  );

  return (
    <header>
      <Menubar
        model={menuItems}
        start={
          <button
            className="kb-logo-btn"
            onClick={() => handleContentChange('home')}
            aria-label="Go to home"
          >
            <KBMark />
          </button>
        }
        end={languageToggle}
      />
    </header>
  );
};

export default CustomMenu;
