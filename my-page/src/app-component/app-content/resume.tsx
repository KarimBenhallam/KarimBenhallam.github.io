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
                    download={language === 'en' ? 'KarimBenhallamResume.pdf' : 'KarimBenhallamResumeFr.pdf'}
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
            <div className="resume-page__mobile-note">
                <i className="pi pi-file-pdf resume-page__mobile-note-icon" aria-hidden="true" />
                <p>{language === 'en' ? 'PDF preview is not available on mobile.' : "L'aperçu PDF n'est pas disponible sur mobile."}</p>
                <p>{language === 'en' ? 'Use the download button above to view the résumé.' : 'Utilisez le bouton de téléchargement ci-dessus pour consulter le CV.'}</p>
            </div>
        </div>
    );
};

export default Resume;
