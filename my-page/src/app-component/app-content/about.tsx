import { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { useLanguageContext } from '../../contexts/language-context';
import { getTextFromJSON } from '../../utils/languageUtils';
import { classNames } from 'primereact/utils';
import { Carousel } from 'primereact/carousel';
import { useRevealOnce } from '../../utils/useRevealOnce';
import './about.css';

// ── Types ─────────────────────────────────────────────────────────────────────

type TranslateFn = (key: string) => string | undefined;
type CallbackRef = (el: HTMLDivElement | null) => void;

interface ExpCardProps {
  refProp: CallbackRef;
  revealed: boolean;
  translate: TranslateFn;
  logoSrc: string;
  logoAlt: string;
  titleKey: string;
  contentKey: string;
  period: string;
  tags: string[];
  align?: 'left' | 'right';
}

interface PersonalCardProps {
  refProp: CallbackRef;
  revealed: boolean;
  translate: TranslateFn;
  titleKey: string;
  contentKey: string;
  images: { src: string; alt: string }[];
  align?: 'left' | 'right';
}

// ── Image carousel template ───────────────────────────────────────────────────

const imageTemplate = (item: { src: string; alt: string }) => (
  <div className="carousel-slide">
    <img src={item.src} alt={item.alt} className="carousel-slide__img" />
  </div>
);

// ── Experience card — defined outside About so its reference is stable ────────

const ExpCard = ({
  refProp, revealed, translate,
  logoSrc, logoAlt, titleKey, contentKey, period, tags, align = 'left',
}: ExpCardProps) => (
  <div
    ref={refProp}
    className={classNames(
      'exp-card',
      `exp-card--${align}`,
      revealed ? (align === 'left' ? 'reveal-left' : 'reveal-right') : 'reveal-hidden',
    )}
  >
    <div className="exp-card__header">
      <img src={logoSrc} alt={logoAlt} className="exp-card__logo" />
      <div className="exp-card__meta">
        <h3 className="exp-card__title">{translate(titleKey)}</h3>
        <span className="exp-card__period">{period}</span>
      </div>
    </div>
    <div className="exp-card__body" dangerouslySetInnerHTML={{ __html: translate(contentKey)! }} />
    <div className="exp-card__tags">
      {tags.map(tag => (
        <span key={tag} className="exp-tag">{tag}</span>
      ))}
    </div>
  </div>
);

// ── Personal card — defined outside About so its reference is stable ──────────

const PersonalCard = ({
  refProp, revealed, translate, titleKey, contentKey, images, align = 'left',
}: PersonalCardProps) => (
  <div
    ref={refProp}
    className={classNames(
      'personal-card',
      `personal-card--${align}`,
      revealed ? (align === 'left' ? 'reveal-left' : 'reveal-right') : 'reveal-hidden',
    )}
  >
    <h3 className="personal-card__title">{translate(titleKey)}</h3>
    <div className="personal-card__grid">
      <div
        className="personal-card__text"
        dangerouslySetInnerHTML={{ __html: translate(contentKey)! }}
      />
      <div className="personal-card__media">
        <Carousel
          value={images}
          numVisible={1}
          numScroll={1}
          circular
          itemTemplate={imageTemplate}
        />
      </div>
    </div>
  </div>
);

// ── About page ────────────────────────────────────────────────────────────────

const About = () => {
  const context = useLanguageContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const isEn = context.language === 'en';

  const t: TranslateFn = (key: string) => getTextFromJSON(context.language, key);

  // ── Experience refs — each fires once, never resets ───────────────────────
  const [ubee_ref,     ubee_revealed]     = useRevealOnce();
  const [fstack_ref,   fstack_revealed]   = useRevealOnce();
  const [capstone_ref, capstone_revealed] = useRevealOnce();
  const [ra_ref,       ra_revealed]       = useRevealOnce();
  const [wdev_ref,     wdev_revealed]     = useRevealOnce();
  const [wcc_ref,      wcc_revealed]      = useRevealOnce();

  // ── Personal refs ─────────────────────────────────────────────────────────
  const [morocco_ref, morocco_revealed] = useRevealOnce();
  const [me_ref,      me_revealed]      = useRevealOnce();
  const [soccer_ref,  soccer_revealed]  = useRevealOnce();
  const [gym_ref,     gym_revealed]     = useRevealOnce();

  const mor_images = [
    { src: './about_images/lunch.webp',       alt: 'Moroccan lunch' },
    { src: './about_images/flag.webp',        alt: 'Moroccan flag' },
    { src: './about_images/view.webp',        alt: 'View in Morocco' },
    { src: './about_images/couscous.jpeg',    alt: 'Couscous' },
    { src: './about_images/meat.jpeg',        alt: 'Grilled meat' },
    { src: './about_images/beach.jpeg',       alt: 'Moroccan beach' },
    { src: './about_images/breakfast.jpg',    alt: 'Moroccan breakfast' },
    { src: './about_images/sheep.jpeg',       alt: 'Sheep in Morocco' },
    { src: './about_images/sunset.webp',      alt: 'Sunset in Morocco' },
    { src: './about_images/camel.jpeg',       alt: 'Camel in the desert' },
    { src: './about_images/sea.jpeg',         alt: 'Sea in Morocco' },
    { src: './about_images/palm.jpeg',        alt: 'Palm trees' },
    { src: './about_images/beautiful.jpeg',   alt: 'Beautiful Moroccan landscape' },
    { src: './about_images/restaurant.jpeg',  alt: 'Moroccan restaurant' },
    { src: './about_images/nice_sunset.jpeg', alt: 'Sunset over Morocco' },
    { src: './about_images/hassan2.jpeg',     alt: 'Hassan II Mosque' },
  ];

  const gym_images = [
    { src: './about_images/calisthenics.jpg', alt: 'Calisthenics training' },
    { src: './about_images/squat.jpg',        alt: 'Squat' },
    { src: './about_images/handstand.jpg',    alt: 'Handstand' },
    { src: './about_images/pullup.jpg',       alt: 'Pull-up' },
  ];

  const socc_images = [
    { src: './about_images/shoes.jpg',    alt: 'Soccer cleats' },
    { src: './about_images/ping.jpg',     alt: 'Playing soccer' },
    { src: './about_images/game.webp',    alt: 'Soccer game' },
    { src: './about_images/street.jpg',   alt: 'Street soccer' },
    { src: './about_images/wcup.webp',    alt: '2022 World Cup' },
    { src: './about_images/amrabat.webp', alt: 'Sofyan Amrabat' },
  ];

  const me_images = [
    { src: './about_images/duo.jpg',     alt: 'Karim with a friend' },
    { src: './about_images/bday.webp',   alt: 'Birthday celebration' },
    { src: './about_images/dogs.jpg',    alt: 'Dogs' },
    { src: './about_images/glasses.jpg', alt: 'Karim wearing glasses' },
  ];

  return (
    <div className="about-page kb-container">
      <TabView activeIndex={activeIndex} onTabChange={e => setActiveIndex(e.index)}>

        <TabPanel header={t('about_content.overview')!} leftIcon="pi pi-briefcase mr-2">
          <div className="exp-list">
            <ExpCard
              refProp={ubee_ref} revealed={ubee_revealed} translate={t}
              logoSrc="./ubee-icon.png" logoAlt="Ubee"
              titleKey="about_content.ubee_title" contentKey="about_content.ubee"
              period={isEn ? 'October 2024 – Present' : 'Octobre 2024 – Présent'}
              tags={['Angular', 'C#', 'TypeScript', 'Azure', 'SQL Server', 'Auth0', 'Ngrok', 'Docker']}
              align="left"
            />
            <ExpCard
              refProp={ra_ref} revealed={ra_revealed} translate={t}
              logoSrc="./uottawa.png" logoAlt="University of Ottawa"
              titleKey="about_content.ra_title" contentKey="about_content.ra"
              period={isEn ? 'May 2023 – March 2026' : 'Mai 2023 – Mars 2026'}
              tags={['C#', 'Python', 'PostgreSQL', 'FieldWorks', 'Regex']}
              align="right"
            />
            <ExpCard
              refProp={fstack_ref} revealed={fstack_revealed} translate={t}
              logoSrc="./conceptio.png" logoAlt="Conceptio Technologies"
              titleKey="about_content.fstack_title" contentKey="about_content.fstack"
              period={isEn ? 'May 2022 – August 2022' : 'Mai 2022 – Août 2022'}
              tags={['Angular', 'ASP.NET', 'C#', 'TypeScript', 'Auth0', 'XUnit']}
              align="left"
            />
            <ExpCard
              refProp={wdev_ref} revealed={wdev_revealed} translate={t}
              logoSrc="./innovapost.jpg" logoAlt="Innovapost / Canada Post"
              titleKey="about_content.wdev_title" contentKey="about_content.wdev"
              period={isEn ? 'September 2021 – December 2021' : 'Septembre 2021 – Décembre 2021'}
              tags={['HTML', 'CSS', 'JavaScript', 'SharePoint Online']}
              align="right"
            />
            <ExpCard
              refProp={capstone_ref} revealed={capstone_revealed} translate={t}
              logoSrc="./uottawa.png" logoAlt="University of Ottawa"
              titleKey="about_content.capstone_title" contentKey="about_content.capstone"
              period={isEn ? 'January 2023 – December 2023' : 'Janvier 2023 – Décembre 2023'}
              tags={['C#', 'Angular', 'Azure Synapse', 'SQL Server', 'LINQ']}
              align="left"
            />
            <ExpCard
              refProp={wcc_ref} revealed={wcc_revealed} translate={t}
              logoSrc="./uottawa.png" logoAlt="University of Ottawa"
              titleKey="about_content.wcc_title" contentKey="about_content.wcc"
              period="2020"
              tags={['Drupal', 'Uniweb', 'Content Management']}
              align="right"
            />
          </div>
        </TabPanel>

        <TabPanel header={t('about_content.more')!} leftIcon="pi pi-heart mr-2">
          <div className="personal-list">
            <PersonalCard
              refProp={morocco_ref} revealed={morocco_revealed} translate={t}
              titleKey="about_content.morocco_title" contentKey="about_content.morocco"
              images={mor_images} align="left"
            />
            <PersonalCard
              refProp={me_ref} revealed={me_revealed} translate={t}
              titleKey="about_content.me_title" contentKey="about_content.me"
              images={me_images} align="right"
            />
            <PersonalCard
              refProp={soccer_ref} revealed={soccer_revealed} translate={t}
              titleKey="about_content.soccer_title" contentKey="about_content.soccer"
              images={socc_images} align="left"
            />
            <PersonalCard
              refProp={gym_ref} revealed={gym_revealed} translate={t}
              titleKey="about_content.gym_title" contentKey="about_content.gym"
              images={gym_images} align="right"
            />
          </div>
        </TabPanel>

      </TabView>
    </div>
  );
};

export default About;
