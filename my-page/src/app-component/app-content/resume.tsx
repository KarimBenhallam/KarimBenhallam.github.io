import { useLanguageContext } from "../../contexts/language-context";
import './resume.css';

const Resume = () => {
    const { language } = useLanguageContext();
    const src = language === 'en' ? './resumes/english.pdf' : './resumes/french.pdf';

    return (
        <div className="resume-page kb-container">
            <div className="resume-page__header">
                <h2 className="resume-page__title">
                    {language === 'en' ? 'Résumé' : 'Curriculum Vitae'}
                </h2>
                <a
                    href={src}
                    download
                    className="resume-page__download"
                    aria-label={language === 'en' ? 'Download PDF résumé' : 'Télécharger le CV en PDF'}
                >
                    <i className="pi pi-download" aria-hidden="true" />
                    {language === 'en' ? 'Download PDF' : 'Télécharger PDF'}
                </a>
            </div>
            <embed
                src={src}
                type="application/pdf"
                className="resume-page__embed"
                title={language === 'en' ? 'Résumé PDF' : 'Curriculum Vitae PDF'}
            />
        </div>
    );
};

export default Resume;
