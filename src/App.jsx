import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Menu, 
  X, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  Sparkles, 
  Copy, 
  Printer, 
  Sun, 
  Moon,
  ChevronRight
} from 'lucide-react';
import { resumeData } from './data/resumeData';
import './App.css';

// Local SVG Brand Icons to avoid trademark packages and version bugs
const GithubIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function App() {
  const { personalInfo, techStack, currentlyLearning, projects, coreSkills, education, experience } = resumeData;
  
  // Theme state
  const [theme, setTheme] = useState('dark');
  
  // Subtitles typewriter state
  const [currentText, setCurrentText] = useState('');
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Navigation states
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Typewriter speeds
  const typingSpeed = isDeleting ? 30 : 60;
  const pauseDuration = 1500;

  // Typewriter Hook
  useEffect(() => {
    let timer;
    const targetString = personalInfo.subtitles[subtitleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(targetString.substring(0, currentText.length - 1));
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(targetString.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === targetString) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setSubtitleIndex((prev) => (prev + 1) % personalInfo.subtitles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, subtitleIndex, personalInfo.subtitles]);

  // Toggle Theme class
  const handleThemeChange = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  // Copy Email toast handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socials.email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Scrollspy to set active navbar link
  useEffect(() => {
    const onScroll = () => {
      const targetSections = ['home', 'about', 'skills', 'projects', 'experience', 'learning'];
      const scrollYOffset = window.scrollY + 120;

      for (const section of targetSections) {
        const domElement = document.getElementById(section);
        if (domElement) {
          const top = domElement.offsetTop;
          const height = domElement.offsetHeight;
          if (scrollYOffset >= top && scrollYOffset < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Compute github username
  const isCustomGithub = personalInfo.socials.github && !personalInfo.socials.github.includes('YOUR_USERNAME');
  const githubUser = isCustomGithub ? personalInfo.socials.github.split('/').pop() : 'Gayatri-Raulji';

  return (
    <div className="app-container">
      {/* Toast Notification Alert */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        <span className="toast-success-dot"></span>
        <span>Email successfully copied!</span>
      </div>

      {/* Header Panel */}
      <header className="header">
        <a href="#home" className="logo">
          <span>&lt;Gayatri /&gt;</span>
        </a>

        {/* Desktop Links */}
        <nav className="nav-links">
          {['home', 'about', 'skills', 'projects', 'experience', 'learning'].map((sect) => (
            <a 
              key={sect} 
              href={`#${sect}`} 
              className={`nav-link ${activeSection === sect ? 'active' : ''}`}
            >
              {sect.charAt(0).toUpperCase() + sect.slice(1)}
            </a>
          ))}
        </nav>

        {/* Action controls */}
        <div className="nav-right">
          <button 
            className="social-icon-btn" 
            onClick={handleThemeChange}
            title={`Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            aria-label="Change Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            className="btn-print" 
            onClick={() => window.print()}
            title="Export Resume PDF"
          >
            <Printer size={16} />
            <span>Print CV</span>
          </button>

          <button 
            className="menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <nav className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        {['home', 'about', 'skills', 'projects', 'experience', 'learning'].map((sect) => (
          <a 
            key={sect}
            href={`#${sect}`}
            className={`mobile-nav-link ${activeSection === sect ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {sect.charAt(0).toUpperCase() + sect.slice(1)}
          </a>
        ))}
      </nav>

      {/* Main Grid viewport */}
      <main className="main-content">
        
        {/* HERO AREA */}
        <section id="home" className="section hero-grid">
          <div className="hero-left">
            <span className="hero-hello">
              <Sparkles size={16} />
              <span>Namaste, I'm</span>
            </span>
            <h1 className="hero-name">{personalInfo.name}</h1>
            
            <div className="hero-title-container">
              <span className="hero-title">{currentText}</span>
            </div>
            
            <p className="hero-tagline">{personalInfo.tagline}</p>
            
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>View Projects</span>
                <ChevronRight size={16} />
              </a>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.socials.email}`} target="_blank" rel="noreferrer" className="btn-secondary">
                <Mail size={16} />
                <span>Get in Touch</span>
              </a>
            </div>

            <div className="hero-socials">
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub Link">
                <GithubIcon size={20} />
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn Link">
                <LinkedinIcon size={20} />
              </a>
              <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram Link">
                <InstagramIcon size={20} />
              </a>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.socials.email}`} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Send Email" title="Send Email">
                <Mail size={20} />
              </a>
            </div>

            {/* Print format static links */}
            <div className="hero-social-print" style={{ display: 'none' }}>
              <div>✉ Email: {personalInfo.socials.email}</div>
              <div>🔗 GitHub: {personalInfo.socials.github}</div>
              <div>🔗 LinkedIn: {personalInfo.socials.linkedin}</div>
              <div>🔗 Instagram: {personalInfo.socials.instagram}</div>
            </div>
          </div>

          <div className="hero-right">
            <div className="avatar-container animate-float">
              <div className="avatar-glow animate-pulse-glow"></div>
              <div className="avatar-img-frame">
                <img 
                  src={personalInfo.avatar} 
                  alt={personalInfo.name} 
                  className="avatar-img"
                  onError={(e) => {
                    e.target.src = "https://skillicons.dev/icons?i=react";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ME */}
        <section id="about" className="section">
          <div className="section-header">
            <span className="section-tag">About</span>
            <h2 className="section-title">Professional Bio</h2>
          </div>
          
          <div className="about-card glass-card">
            <div className="about-grid">
              <div className="about-text">
                <p>{personalInfo.about.bio}</p>
                <div className="about-highlights">
                  {personalInfo.about.highlights.map((highlight, idx) => (
                    <div key={idx} className="about-highlight-item">
                      <span className="highlight-bullet"></span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="skills-summary-box">
                <h3 className="skills-summary-title">Proficiency Grid</h3>
                <div className="skills-summary-list">
                  <div className="skills-summary-item">
                    <div className="skills-summary-header">
                      <span>Frontend Development</span>
                      <span>90%</span>
                    </div>
                    <div className="skills-summary-bar-bg">
                      <div className="skills-summary-bar-fill" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="skills-summary-item">
                    <div className="skills-summary-header">
                      <span>Backend APIs</span>
                      <span>80%</span>
                    </div>
                    <div className="skills-summary-bar-bg">
                      <div className="skills-summary-bar-fill" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className="skills-summary-item">
                    <div className="skills-summary-header">
                      <span>Databases & Management</span>
                      <span>75%</span>
                    </div>
                    <div className="skills-summary-bar-bg">
                      <div className="skills-summary-bar-fill" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section id="skills" className="section">
          <div className="section-header">
            <span className="section-tag">Skills</span>
            <h2 className="section-title">Technical Expertise</h2>
          </div>

          <div className="tech-container">
            {/* Frontend */}
            <div className="tech-card glass-card">
              <div className="tech-card-header">
                <div className="tech-icon-container">
                  <Code2 size={22} />
                </div>
                <h3 className="tech-card-title">Frontend</h3>
              </div>
              <div className="tech-list">
                {techStack.frontend.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-level">{tech.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="tech-card glass-card">
              <div className="tech-card-header">
                <div className="tech-icon-container">
                  <Server size={22} />
                </div>
                <h3 className="tech-card-title">Backend</h3>
              </div>
              <div className="tech-list">
                {techStack.backend.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-level">{tech.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Database */}
            <div className="tech-card glass-card">
              <div className="tech-card-header">
                <div className="tech-icon-container">
                  <Database size={22} />
                </div>
                <h3 className="tech-card-title">Database</h3>
              </div>
              <div className="tech-list">
                {techStack.database.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-level">{tech.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="tech-card glass-card">
              <div className="tech-card-header">
                <div className="tech-icon-container">
                  <Wrench size={22} />
                </div>
                <h3 className="tech-card-title">Tools</h3>
              </div>
              <div className="tech-list">
                {techStack.tools.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-level">{tech.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CORE SKILLS BADGES */}
        <section className="section" style={{ paddingTop: '20px' }}>
          <div className="badges-container">
            {coreSkills.map((skill, idx) => (
              <div key={idx} className={`skill-badge ${skill.theme}`}>
                <div className="skill-badge-left">{skill.name}</div>
                <div className="skill-badge-right">{skill.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        <section id="projects" className="section">
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Featured Project</h2>
          </div>

          <div className="featured-project-container">
            {projects.map((project) => (
              <div key={project.id} className="project-showcase-card glass-card">
                <div className="project-top-row">
                  <span className="spotlight-badge">Project Spotlight</span>
                  <div className="project-links">
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="project-link-btn" aria-label="GitHub source code">
                      <GithubIcon size={20} />
                      <span>Source</span>
                    </a>
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="project-link-btn" aria-label="Live Demo Link">
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <div className="project-tagline">{project.tagline}</div>
                <p className="project-desc">{project.description}</p>
                
                <div className="features-box">
                  <div className="features-title">Core Implementation Details:</div>
                  <ul className="features-list">
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech">
                  {project.tech.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION TIMELINE */}
        <section id="experience" className="section">
          <div className="section-header">
            <span className="section-tag">Timeline</span>
            <h2 className="section-title">Experience & Education</h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {/* Experience timeline items */}
            {experience.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot">
                  <Briefcase size={12} color="var(--color-primary)" />
                </div>
                <div className="timeline-card glass-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <div className="timeline-company">{exp.company}</div>
                    </div>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              </div>
            ))}

            {/* Education timeline items */}
            {education.map((edu, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot">
                  <GraduationCap size={12} color="var(--color-secondary)" />
                </div>
                <div className="timeline-card glass-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{edu.degree}</h3>
                      <div className="timeline-company">{edu.school}</div>
                    </div>
                    <span className="timeline-period">{edu.period}</span>
                  </div>
                  <p className="timeline-desc">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CURRENTLY LEARNING */}
        <section id="learning" className="section">
          <div className="section-header">
            <span className="section-tag">Research</span>
            <h2 className="section-title">Currently Learning</h2>
          </div>

          <div className="learning-grid">
            {currentlyLearning.map((item, idx) => (
              <div key={idx} className="learning-card glass-card">
                <span className="learning-num">0{idx + 1}.</span>
                <h3 className="learning-title">{item.title}</h3>
                <p className="learning-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GITHUB METRICS */}
        <section className="section" style={{ paddingTop: '0px' }}>
          <div className="section-header">
            <span className="section-tag">Insights</span>
            <h2 className="section-title">GitHub Engagement</h2>
          </div>

          <div className="github-stats-container">
            <div className="github-stats-card glass-card">
              <div className="github-grid">
                <div className="github-img-wrapper">
                  <img 
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=tokyonight`} 
                    alt="GitHub Stats SVG Widget" 
                  />
                </div>
                <div className="github-img-wrapper">
                  <img 
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUser}&theme=tokyonight`} 
                    alt="GitHub Streak Widget" 
                  />
                </div>
                <div className="github-img-wrapper">
                  <img 
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUser}&layout=compact&theme=tokyonight`} 
                    alt="Top Languages Widget" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer copyright */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="gradient-text">&lt;Gayatri Raulji /&gt;</span>
          </div>
          <p className="footer-text">
            Full Stack Developer focused on building modern, responsive, and performant web experiences. Open to exciting freelance opportunities and developer roles.
          </p>
          <div className="footer-socials">
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub Footer Link">
              <GithubIcon size={18} />
            </a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn Footer Link">
              <LinkedinIcon size={18} />
            </a>
            <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram Footer Link">
              <InstagramIcon size={18} />
            </a>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.socials.email}`} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Send Email Footer" title="Send Email">
                <Mail size={18} />
              </a>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Gayatri Raulji. All rights reserved. Designed with ❤️.
          </div>
        </div>
      </footer>
    </div>
  );
}
