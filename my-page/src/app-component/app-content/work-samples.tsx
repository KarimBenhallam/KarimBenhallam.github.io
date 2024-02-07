import { Splitter, SplitterPanel } from 'primereact/splitter';
import { TabMenu } from 'primereact/tabmenu';
import { useLanguageContext } from "../../contexts/language-context";
import { getTextFromJSON } from "../../utils/languageUtils";

const Work = () => {
    const context = useLanguageContext();
    const intro = getTextFromJSON(context.language, "work_content.intro");
    const runSnake = () => {
      // PythonShell.run('./work_samples/snake.py').then(messages => {
      //     console.log('finished');
      // });
      window.open("http://localhost:8000", "snakeFrame")
  };


    const items = [
        {
          label: "Snake (Python)",
          icon: 'pi pi-bolt',
          command: () => { runSnake(); }
        },
        {
          label: "Sudoku (Java)",
          icon: 'pi pi-table',
        },
        {
          label: "Calculator (C++)",
          icon: 'pi pi-calculator',
        }
      ];


    return (
        // this line was needed so the content was centered in variuous browsers
        //the previous version only worked on firefox
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Splitter className="w-11">
                <SplitterPanel className="flex align-items-center justify-content-center" size={25}>
                    <div dangerouslySetInnerHTML={{ __html: intro! }} />
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={50}>
                  <div className='relative'>
                    <TabMenu model={items} />
                    <iframe name='snakeFrame' className='w-12 h-30rem'></iframe>
                  </div>
                </SplitterPanel>
            </Splitter>
        </div>
    );
};

export default Work;