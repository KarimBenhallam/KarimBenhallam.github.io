import { Splitter, SplitterPanel } from 'primereact/splitter';
import { TabMenu } from 'primereact/tabmenu';
import { useLanguageContext } from "../../contexts/language-context";
import { getTextFromJSON } from "../../utils/languageUtils";
import { useState } from 'react';
import { classNames } from 'primereact/utils';
import Sudoku from '../projects/sudoku';
import Players from '../projects/players';

type Project = "web" | "snake" | "sudoku" | "api" | "calculator"

const Work = () => {
  //context and states
  const context = useLanguageContext();
  const [project, setProject] = useState<Project>("web");
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  //json constants
  const intro = getTextFromJSON(context.language, "work_content.intro");
  const website_text = getTextFromJSON(context.language, "work_content.website_text");
  const website = getTextFromJSON(context.language, "work_content.website");
  const snake = getTextFromJSON(context.language, "work_content.snake");
  const sudoku = getTextFromJSON(context.language, "work_content.sudoku");
  const api = getTextFromJSON(context.language, "work_content.api");
  const calculator = getTextFromJSON(context.language, "work_content.calculator");



  const runSnake = () => {
    window.open("https://karimbenhallam.github.io/work_samples/snake/build/web/index.html", "snakeFrame")
    setIsWindowOpen(true);
  };


  const items = [
    {
      label: website,
      icon: 'pi pi-globe',
      command: () => { setProject("web") }
    },
    {
      label: snake,
      icon: 'pi pi-bolt',
      command: () => {
        setProject("snake")
        if (!isWindowOpen) {
          runSnake();
        }
      }
    },
    {
      label: sudoku,
      icon: 'pi pi-table',
      command: () => { setProject("sudoku") }
    },
    {
      label: api,
      icon: 'pi pi-server',
      command: () => { setProject("api") }
    },
    {
      label: calculator,
      icon: 'pi pi-calculator',
      command: () => { setProject("calculator") }
    }
  ];


  return (
    // this line was needed so the content was centered in variuous browsers
    //the previous version only worked on firefox
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Splitter className="w-11 max-h-screen">
        <SplitterPanel className="flex align-items-center justify-content-center " size={25}>
          <div dangerouslySetInnerHTML={{ __html: intro! }} />
        </SplitterPanel>


        <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={50}>
          <div className='relative'>
            <TabMenu model={items} />
            {/* iframe needs to always exist as it's the target of window.open */}
            <iframe name='snakeFrame' className={classNames('w-12 h-30rem', { hidden: project !== "snake" })}></iframe>

            <div>
              {project === "web" && (
                <div dangerouslySetInnerHTML={{ __html: website_text! }} />

              )}
            </div>

            {/* 
            <div>
              {project === "sudoku" &&(
                <div>
                    <Sudoku/>
                </div>
              )}
            </div> */}

<           div>
              {project === "api" && (
                <Players/>
              )}
            </div>

            <div>
              {project === "calculator" && (
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
              )}
            </div>

          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
};

export default Work;