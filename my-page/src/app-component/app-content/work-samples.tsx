import { Splitter, SplitterPanel } from 'primereact/splitter';
import { TabMenu } from 'primereact/tabmenu';
import { useLanguageContext } from "../../contexts/language-context";
import { getTextFromJSON } from "../../utils/languageUtils";
import { useState, useRef } from 'react';
import { classNames } from 'primereact/utils';
import Players from '../projects/players';

type Project = "ubee" | "web" | "snake"  | "api";

const UbeeIcon = () => (
  <svg viewBox="0 0 26 26" width="1.2em" height="1.2em" fill="currentColor" style={{ marginRight: '0.5rem' }}>
    <defs>
      <mask id="ubeeDollarMask">
        <rect width="26" height="26" fill="white" />
        {/* $ punched out of the white circle — reveals house color beneath */}
        <text x="19.5" y="21.5" textAnchor="middle" fontSize="8" fontWeight="900" fontFamily="sans-serif" fill="black">$</text>
      </mask>
    </defs>
    {/* Mask applied to the group cuts $ through both house and circle → shows background */}
    <g mask="url(#ubeeDollarMask)">
      <path fillRule="evenodd" d="M13 2L1 11.5h3V22h18V11.5h3L13 2z M8 13h3v3H8z M12 13h3v3h-3z M8 17h3v3H8z M12 17h3v3h-3z" />
      <circle cx="19.5" cy="19" r="5" fill="white" />
    </g>
  </svg>
);

const Work = () => {
  //context
  const context = useLanguageContext();

  //links
  const webLink = "https://github.com/KarimBenhallam/KarimBenhallam.github.io/blob/main/my-page/README.md";
  const snakeLink = "https://github.com/KarimBenhallam/KarimBenhallam.github.io/blob/main/my-page/public/work_samples/snake/README.md";
  const apiLink = "https://github.com/KarimBenhallam/KarimBenhallam.github.io/blob/main/C%23Project/README.md";
  const ubeeLink = context.language === "en" ? "https://ubee.com/en/" : "https://ubee.com/";

  //states
  const [project, setProject] = useState<Project>("ubee");
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [link, setLink] = useState(ubeeLink);



  //json constants
  const intro = getTextFromJSON(context.language, "work_content.intro");
  const website_text = getTextFromJSON(context.language, "work_content.website_text");
  const website = getTextFromJSON(context.language, "work_content.website");
  const snake = getTextFromJSON(context.language, "work_content.snake");
  const api = getTextFromJSON(context.language, "work_content.api");
  const button = getTextFromJSON(context.language, "work_content.button");
  const button_ubee = getTextFromJSON(context.language, "work_content.button_ubee");



  const snakeIframeRef = useRef<HTMLIFrameElement>(null);

  const runSnake = () => {
    window.open(`${window.location.origin}/work_samples/snake/build/web/index.html`, "snakeFrame")
    setIsWindowOpen(true);
  };

  const suppressSnakeLeavePrompt = () => {
    try {
      snakeIframeRef.current?.contentWindow?.addEventListener(
        'beforeunload',
        (e) => { e.stopImmediatePropagation(); },
        true
      );
    } catch (_) {}
  };


  const items = [
      {
      label: "Ubee",
      icon: <UbeeIcon />,
      command: () => {
        setProject("ubee")
        setLink(ubeeLink);
      }
    },
    {
      label: website,
      icon: 'pi pi-globe',
      command: () => {
        setProject("web")
        setLink(webLink);
      }
    },
    {
      label: snake,
      icon: 'pi pi-bolt',
      command: () => {
        setProject("snake")
        setLink(snakeLink);
        if (!isWindowOpen) {
          runSnake();
        }
      }
    },
    {
      label: api,
      icon: 'pi pi-server',
      command: () => {
        setProject("api")
        setLink(apiLink);
      }
    },
  ];


  return (
    // this line was needed so the content was centered in variuous browsers
    //the previous version only worked on firefox
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Splitter className="w-11 max-h-screen">
        <SplitterPanel className="flex flex-column" size={25}>
          <div dangerouslySetInnerHTML={{ __html: intro! }} />
          <div className='justify-content-center'>
            <a href={project !== "ubee" ? link : undefined} target="_blank" rel="noopener noreferrer" className={`p-button font-bold mb-2${project === "ubee" ? " p-disabled" : ""}`} aria-disabled={project === "ubee"}>{project === "ubee" ? button_ubee : button}</a>
          </div>
        </SplitterPanel>


        <SplitterPanel className="flex justify-content-center" size={75} minSize={50}>
          <div className='relative w-full'>
            <TabMenu model={items} />
            <div style={{ height: '45rem', overflowY: project === 'snake' ? 'hidden' : 'auto', padding: '0.75rem' }}>
              {/* iframe needs to always exist as it's the target of window.open */}
              <iframe ref={snakeIframeRef} title='snakeFrame' name='snakeFrame' className={classNames('w-full h-full', { hidden: project !== "snake" })} onLoad={suppressSnakeLeavePrompt}></iframe>

              {project === "ubee" && (
                <a href={ubeeLink} target="_blank" rel="noreferrer">
                  <img src="/ubee_landing_page.png" alt="Ubee" className='mt-3' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </a>
              )}

              {project === "web" && (
                <div dangerouslySetInnerHTML={{ __html: website_text! }} className='mt-5' />
              )}

              {project === "api" && (
                <Players />
              )}
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
};

export default Work;