import { useLanguageContext } from '../../contexts/language-context';
import './skills.css';

interface SkillGroup {
  labelEn: string;
  labelFr: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    labelEn: 'Backend',
    labelFr: 'Backend',
    skills: ['C#', 'ASP.NET', 'SQL Server', 'PostgreSQL', 'REST APIs'],
  },
  {
    labelEn: 'Frontend',
    labelFr: 'Frontend',
    skills: ['Angular', 'TypeScript', 'JavaScript', 'React', 'HTML', 'CSS'],
  },
  {
    labelEn: 'Cloud & DevOps',
    labelFr: 'Cloud & DevOps',
    skills: ['Azure', 'Git', 'AWS', 'Docker', 'Jira'],
  },
  {
    labelEn: 'Testing & Other',
    labelFr: 'Tests & Autre',
    skills: ['Python', 'XUnit', 'JUnit', 'Selenium', 'Java', 'C++'],
  },
];

const Skills = () => {
  const { language } = useLanguageContext();
  const isEn = language === 'en';

  return (
    <section className="skills-section kb-section kb-section-alt">
      <div className="kb-container">
        <h2 className="skills-section__heading">
          {isEn ? 'Skills & Technologies' : 'Compétences & Technologies'}
        </h2>
        <p className="skills-section__sub">
          {isEn
            ? 'Technologies I\'ve worked with professionally and in personal projects.'
            : 'Technologies utilisées professionnellement et dans des projets personnels.'}
        </p>
        <div className="skills-grid">
          {SKILL_GROUPS.map(group => (
            <div key={group.labelEn} className="skill-group">
              <span className="skill-group__label">
                {isEn ? group.labelEn : group.labelFr}
              </span>
              <div className="skill-group__tags">
                {group.skills.map(skill => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
