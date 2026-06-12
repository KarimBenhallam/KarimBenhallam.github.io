import { useState } from 'react';
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
      {/* Desktop nav — hidden on mobile via CSS */}
      <Menubar
        model={menuItems}
        className="kb-desktop-nav"
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

      {/* Mobile nav — hidden on desktop via CSS */}
      <div className="kb-mobile-nav">
        <div className="kb-mobile-nav__bar">
          <button
            className="kb-logo-btn"
            onClick={() => { handleContentChange('home'); setMobileOpen(false); }}
            aria-label="Go to home"
          >
            <KBMark />
          </button>
          <div className="kb-mobile-nav__controls">
            {languageToggle}
            <button
              className="kb-hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <i className={`pi ${mobileOpen ? 'pi-times' : 'pi-bars'}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="kb-mobile-nav__panel">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`kb-mobile-nav__item${content === item.key ? ' kb-mobile-nav__item--active' : ''}`}
                onClick={() => { handleContentChange(item.key); setMobileOpen(false); }}
              >
                <i className={`${item.icon} kb-mobile-nav__item-icon`} aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default CustomMenu;
