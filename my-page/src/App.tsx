import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './App.css';
import CustomMenu from './app-component/custom-menu';
import LanguageContextProvider, { Language } from './contexts/language-context';
import ContentContextProvider, { Content } from './contexts/content_context';
import DisplayContent from './app-component/display-content';

function App() {
  let language: Language = 'en';

  const getData = (data: { language: Language; content: Content }) => {
    language = data.language;
  };

  return (
    <div className="App">
      <LanguageContextProvider defaultLanguage={language}>
        <ContentContextProvider>
          <CustomMenu onShareData={getData} />
          <DisplayContent />
        </ContentContextProvider>
      </LanguageContextProvider>
    </div>
  );
}

export default App;
