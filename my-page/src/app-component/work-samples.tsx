import { useLanguageContext } from "../contexts/language-context";
import { getTextFromJSON } from "../utils/languageUtils";

const Work = () => {
    const context = useLanguageContext();


    return (
        // this line was needed so the content was centered in variuous browsers
        //the previous version only worked on firefox
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <img src="./to_be_deleted.jpg" alt="" />
        </div>
    );
};

export default Work;