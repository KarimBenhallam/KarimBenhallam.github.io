import { useState, useRef } from 'react';
import { useLanguageContext } from '../../contexts/language-context';
import { getTextFromJSON } from '../../utils/languageUtils';
import { classNames } from 'primereact/utils';
import Players from '../projects/players';
import { useIsMobile } from '../../utils/useIsMobile';
import SwipeHint from '../swipe-hint';
import './work-samples.css';

type Project = 'ubee' | 'web' | 'snake' | 'api';

const UbeeIcon = () => (
  <svg viewBox="0 0 26 26" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <defs>
      <mask id="ubeeDollarMask">
        <rect width="26" height="26" fill="white" />
        <text x="19.5" y="21.5" textAnchor="middle" fontSize="8" fontWeight="900" fontFamily="sans-serif" fill="black">$</text>
      </mask>
    </defs>
    <g mask="url(#ubeeDollarMask)">
      <path fillRule="evenodd" d="M13 2L1 11.5h3V22h18V11.5h3L13 2z M8 13h3v3H8z M12 13h3v3h-3z M8 17h3v3H8z M12 17h3v3h-3z" />
      <circle cx="19.5" cy="19" r="5" fill="white" />
    </g>
  </svg>
);

interface ProjectMeta {
  key: Project;
  labelEn: string;
  labelFr: string;
  icon: React.ReactNode;
  badgeEn?: string;
  badgeFr?: string;
}

const PROJECTS: ProjectMeta[] = [
  {
    key: 'ubee',
    labelEn: 'Ubee',
    labelFr: 'Ubee',
    icon: <UbeeIcon />,
    badgeEn: 'Professional',
    badgeFr: 'Professionnel',
  },
  {
    key: 'api',
    labelEn: 'Web API',
    labelFr: 'Api Web',
    icon: <i className="pi pi-server" />,
    badgeEn: 'Live demo',
    badgeFr: 'Démo live',
  },
  {
    key: 'web',
    labelEn: 'This site',
    labelFr: 'Ce site',
    icon: <i className="pi pi-globe" />,
  },
  {
    key: 'snake',
    labelEn: 'Snake',
    labelFr: 'Serpent',
    icon: <i className="pi pi-bolt" />,
    badgeEn: 'Playable',
    badgeFr: 'Jouable',
  },
];

const Work = () => {
  const { language } = useLanguageContext();
  const isEn = language === 'en';
  const t = (key: string) => getTextFromJSON(language, key);

  const webLink   = 'https://github.com/KarimBenhallam/KarimBenhallam.github.io/blob/main/my-page/README.md';
  const snakeLink = 'https://github.com/KarimBenhallam/KarimBenhallam.github.io/blob/main/my-page/public/work_samples/snake/README.md';
  const apiLink   = 'https://github.com/KarimBenhallam/KarimBenhallam.github.io/blob/main/C%23Project/README.md';
  const ubeeLink  = isEn ? 'https://ubee.com/en/' : 'https://ubee.com/';

  const [project, setProject] = useState<Project>('ubee');
  const [snakeOpened, setSnakeOpened] = useState(false);
  const snakeIframeRef = useRef<HTMLIFrameElement>(null);
  const isMobile = useIsMobile();

  const linkMap: Record<Project, string | undefined> = {
    ubee:  undefined,
    web:   webLink,
    snake: snakeLink,
    api:   apiLink,
  };

  const currentLink = linkMap[project];

  const suppressSnakeLeavePrompt = () => {
    try {
      snakeIframeRef.current?.contentWindow?.addEventListener(
        'beforeunload',
        (e) => { e.stopImmediatePropagation(); },
        true
      );
    } catch (_) {}
  };

  const handleProjectSelect = (key: Project) => {
    setProject(key);
    if (key === 'snake' && !snakeOpened) {
      window.open(
        `${window.location.origin}/work_samples/snake/build/web/index.html`,
        'snakeFrame'
      );
      setSnakeOpened(true);
    }
  };

  return (
    <div className="work-page kb-container">

      {/* ── Section header ───────────────────────────────────────────────── */}
      <div className="work-page__header">
        <h2 className="work-page__title">
          {isEn ? 'Projects' : 'Projets'}
        </h2>
        <p className="work-page__sub">
          {isEn
            ? 'A selection of professional and personal work.'
            : 'Une sélection de travaux professionnels et personnels.'}
        </p>
      </div>

      {/* ── Layout ───────────────────────────────────────────────────────── */}
      <div className="work-layout">

        {/* Sidebar */}
        <aside className="work-sidebar">
          <p className="work-sidebar__intro" dangerouslySetInnerHTML={{ __html: t('work_content.intro')! }} />
          {currentLink ? (
            <a
              href={currentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="work-sidebar__btn"
            >
              <i className="pi pi-github" />
              {isEn ? 'View repository' : 'Voir le code source'}
            </a>
          ) : (
            <span className="work-sidebar__btn work-sidebar__btn--disabled" aria-disabled="true">
              <i className="pi pi-lock" />
              {t('work_content.button_ubee')}
            </span>
          )}
        </aside>

        {/* Main panel */}
        <div className="work-main">

          {/* Project tabs — SwipeHint adds the mobile scroll affordance */}
          <SwipeHint label={t('work_content.swipe_tabs')}>
            {(scrollRef) => (
              <nav ref={scrollRef} className="work-tabs" role="tablist" aria-label={isEn ? 'Projects' : 'Projets'}>
                {PROJECTS.map(p => (
                  <button
                    key={p.key}
                    role="tab"
                    aria-selected={project === p.key}
                    className={classNames('work-tab', { 'work-tab--active': project === p.key })}
                    onClick={() => handleProjectSelect(p.key)}
                  >
                    <span className="work-tab__icon">{p.icon}</span>
                    <span className="work-tab__label">{isEn ? p.labelEn : p.labelFr}</span>
                    {(p.badgeEn) && (
                      <span className="work-tab__badge">
                        {isEn ? p.badgeEn : p.badgeFr}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            )}
          </SwipeHint>

          {/* Project content */}
          <div className="work-content" role="tabpanel">

            {/* Snake needs a physical keyboard — warn on mobile */}
            {project === 'snake' && isMobile && (
              <div className="work-content__snake-note">
                <div className="work-content__note">
                  <i className="pi pi-info-circle" aria-hidden="true" />
                  <span>{t('work_content.snake_note')}</span>
                </div>
              </div>
            )}

            {/* name="snakeFrame" is the window.open target — must match exactly */}
            <iframe
              ref={snakeIframeRef}
              name="snakeFrame"
              title={isEn ? 'Snake game' : 'Jeu Snake'}
              className={classNames('work-content__snake', { hidden: project !== 'snake' })}
              onLoad={suppressSnakeLeavePrompt}
            />

            {project === 'ubee' && (
              <div className="work-content__ubee">
                <a href={ubeeLink} target="_blank" rel="noreferrer">
                  <img
                    src={isMobile ? '/ubee_landing_page_mobile.png' : '/ubee_landing_page.png'}
                    alt="Ubee platform landing page"
                    className="work-content__ubee-img"
                  />
                </a>
              </div>
            )}

            {project === 'web' && (
              <div
                className="work-content__text"
                dangerouslySetInnerHTML={{ __html: t('work_content.website_text')! }}
              />
            )}

            {project === 'api' && (
              <div className="work-content__api">
                <div className="work-content__note">
                  <i className="pi pi-info-circle" aria-hidden="true" />
                  <span>{t('work_content.api_note')}</span>
                </div>
                <SwipeHint
                  scrollSelector=".p-datatable-wrapper"
                  label={t('work_content.swipe_columns')}
                >
                  {(scrollRef) => (
                    <div ref={scrollRef}>
                      <Players />
                    </div>
                  )}
                </SwipeHint>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
