import { useState, useEffect } from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiDocker,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiLinux,
  SiGooglecloud,   
  SiFastapi,          
  SiDjango,          
  SiMongodb,          
  SiVite,             
} from "react-icons/si";


import { FaJava, FaAws, FaNodeJs, FaMicrosoft } from "react-icons/fa";
import { SiExpress, SiFlask } from "react-icons/si";

const ContentSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredCurrentPage, setFilteredCurrentPage] = useState(1);
  const [expandedExperience, setExpandedExperience] = useState(false);
  const totalPages = 5;
  const itemsPerPage = 4;

  const handleFilterClick = (language: string) => {
    const newFilters = activeFilters.includes(language)
      ? activeFilters.filter(f => f !== language)
      : [...activeFilters, language];
    
    setActiveFilters(newFilters);
    setFilteredCurrentPage(1); // Reset to first page when filters change
  };

  const showNextPage = () => {
    if (activeFilters.length > 0) {
      const allProjects = document.querySelectorAll('.projects-page .project-card');
      const matchingProjects: Element[] = [];
      
      allProjects.forEach(card => {
        const languages = (card.getAttribute('data-language') || '').toLowerCase().split(',').map(lang => lang.trim());
        const matches = activeFilters.some(filter => languages.includes(filter.toLowerCase()));
        if (matches) {
          matchingProjects.push(card);
        }
      });
      
      const totalFilteredPages = Math.ceil(matchingProjects.length / itemsPerPage);
      setFilteredCurrentPage(prev => prev >= totalFilteredPages ? 1 : prev + 1);
    } else {
      setCurrentPage(prev => prev >= totalPages ? 1 : prev + 1);
    }
  };

  const showPrevPage = () => {
    if (activeFilters.length > 0) {
      const allProjects = document.querySelectorAll('.projects-page .project-card');
      const matchingProjects: Element[] = [];
      
      allProjects.forEach(card => {
        const languages = (card.getAttribute('data-language') || '').toLowerCase().split(',').map(lang => lang.trim());
        const matches = activeFilters.some(filter => languages.includes(filter.toLowerCase()));
        if (matches) {
          matchingProjects.push(card);
        }
      });
      
      const totalFilteredPages = Math.ceil(matchingProjects.length / itemsPerPage);
      setFilteredCurrentPage(prev => prev <= 1 ? totalFilteredPages : prev - 1);
    } else {
      setCurrentPage(prev => prev <= 1 ? totalPages : prev - 1);
    }
  };

  useEffect(() => {
    // Handle filtering
    const filteredContainer = document.getElementById('filtered-projects');
    const projectsPages = document.querySelectorAll('.projects-page');
    
    if (activeFilters.length > 0 && filteredContainer) {
      // Hide regular project pages and show filtered results
      projectsPages.forEach(page => {
        (page as HTMLElement).style.display = 'none';
      });
      filteredContainer.className = 'filtered-projects-container active';
      
      // Clear and populate filtered results
      filteredContainer.innerHTML = '';
      
      // Get all project cards
      const allProjects = document.querySelectorAll('.projects-page .project-card');
      const matchingProjects: Element[] = [];
      
      allProjects.forEach(card => {
        const languages = (card.getAttribute('data-language') || '').toLowerCase().split(',').map(lang => lang.trim());
        const matches = activeFilters.some(filter => languages.includes(filter.toLowerCase()));
        
        if (matches) {
          matchingProjects.push(card);
        }
      });

      // Paginate filtered results - show only 4 at a time
      const startIndex = (filteredCurrentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageProjects = matchingProjects.slice(startIndex, endIndex);

      currentPageProjects.forEach(card => {
        const clone = card.cloneNode(true) as HTMLElement;
        clone.style.display = 'flex';
        clone.style.flexDirection = 'column';
        
        // Extract URL from the original onClick attribute
        const onClickAttr = (card as HTMLElement).getAttribute('onClick');
        const urlMatch = onClickAttr?.match(/window\.open\('([^']+)'/);
        
        if (urlMatch && urlMatch[1]) {
          const url = urlMatch[1];
          clone.style.cursor = 'pointer';
          clone.addEventListener('click', () => {
            window.open(url, '_blank');
          });
        }
        
        filteredContainer.appendChild(clone);
      });
    } else if (filteredContainer) {
      // Show regular project pages and hide filtered results
      projectsPages.forEach(page => {
        (page as HTMLElement).style.display = '';
      });
      filteredContainer.className = 'filtered-projects-container';
    }
  }, [activeFilters, filteredCurrentPage]);

  // Experience popup functions
  const showExperiencePopup = (company: string, date: string, role: string, description: string) => {
    const popup = document.getElementById('experience-popup');
    const companyEl = document.getElementById('popup-company');
    const dateEl = document.getElementById('popup-date');
    const roleEl = document.getElementById('popup-role');
    const descriptionEl = document.getElementById('popup-description');
    
    if (popup && companyEl && dateEl && roleEl && descriptionEl) {
      companyEl.textContent = company;
      dateEl.textContent = date;
      roleEl.textContent = role;
      descriptionEl.textContent = description;
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  const closeExperiencePopup = () => {
    const popup = document.getElementById('experience-popup');
    if (popup) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handlePopupClick = (e: MouseEvent) => {
      const popup = document.getElementById('experience-popup');
      const popupContent = document.querySelector('.popup-content');
      
      if (popup && popup.style.display === 'flex' && 
          !popupContent?.contains(e.target as Node)) {
        closeExperiencePopup();
      }
    };

    document.addEventListener('click', handlePopupClick);
    return () => document.removeEventListener('click', handlePopupClick);
  }, []);

  return (
    <div className="content-section-container">
      {/* ABOUT Section */}
      <section id="about" className="section-content">
        <div className="section-header">
          <h1 className="section-title">ABOUT</h1>
        </div>
        <div className="content-body">
          <div className="about-content">
            <div className="about-text">
              <p>
                Hello! My name is <span className="highlight">Diego Cicotoste</span>. I'm an undergraduate at
                <span className="highlight"> Northeastern University</span>, class of 2026. After graduation,
                I plan on being an <span className="highlight">SDE @ AWS</span>, working on scalable systems and
                cloud-backed applications. A quick fun fact about me is that I was born and raised in Brazil.
              </p>

              <p>
                My interests are centered around backend engineering, automation, and building software that
                scales. I enjoy working close to infrastructure and cloud services, especially when systems
                need to be reliable, secure, and efficient under real-world load.
              </p>

              <p>
                Outside of work, I love to travel, snowboard, and experiment with personal projects. I’ve
                automated many parts of my life—whether it’s extending my Alexa, house searching, or building
                apps for me and my loved ones to simplify everyday tasks.
              </p>

              
              <div className="action-buttons">
                <a href="https://github.com/DiegoCico/Resume_latex/blob/main/Resume%203.2.pdf" className="action-button">View Resume</a>
                <a href="https://calendly.com/cicotosted/coffee-chat?month=2026-01" className="action-button">Schedule Coffee Chat</a>
                <a href="https://www.linkedin.com/in/diego-cicotoste/" className="action-button">View LinkedIn</a>
              </div>
            </div>
            <div className="about-image">
                <img
                  src="/me.JPG"
                  alt="Diego Cicotoste"
                  className="profile-image"
                />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS Section */}
      <section id="projects" className="section-content">
        <div className="section-header">
          <h1 className="section-title">PROJECTS</h1>
        </div>
        <div className="content-body">
          {/* Filter Buttons */}
          <div className="filter-buttons">
            {['java', 'python', 'ai', 'react', 'htmlcss', 'typescript', 'swift'].map(lang => (
              <button
                key={lang}
                className={`filter-btn ${activeFilters.includes(lang) ? 'active' : ''}`}
                onClick={() => handleFilterClick(lang)}
              >
                {lang === 'ai' ? 'AI/ML' : lang === 'htmlcss' ? 'HTML/CSS' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Carousel */}
          <div className="projects-carousel">
            <button className="carousel-arrow left" onClick={showPrevPage}>
              <span>‹</span>
            </button>

            {/* Container for Filtered Results */}
            <div id="filtered-projects" className="filtered-projects-container">
              {/* Filtered results will be populated here */}
            </div>

            {/* Page 1 */}
            <div className={`projects-page ${currentPage === 1 ? 'active' : ''}`} id="projects-page-1">
              <div className="project-card" data-language="python" data-url="https://github.com/DiegoCico/AlgoVisualizer" onClick={() => window.open('https://github.com/DiegoCico/AlgoVisualizer', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z"/>
                  </svg>
                </div>
                <h3>AlgoVisualizer</h3>
                <div className="project-tags">
                  <span className="tag">Python</span>
                </div>
                <p>A Python application that graphically demonstrates how various sorting algorithms work. It helps users understand the mechanics behind each algorithm through dynamic visualizations.</p>
              </div>
              <div className="project-card" data-language="react,htmlcss" data-url="https://github.com/DiegoCico/treeva" onClick={() => window.open('https://github.com/DiegoCico/treeva', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <h3>Treeva</h3>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">HTML/CSS</span>
                </div>
                <p>Task management app with a unique 3D tree visualization of sprint progress, featuring dark/light modes, Firebase integration, and team analytics.</p>
              </div>
              <div className="project-card" data-language="python" data-url="https://github.com/DiegoCico/HouseFinder" onClick={() => window.open('https://github.com/DiegoCico/HouseFinder', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
                <h3>HouseFinder</h3>
                <div className="project-tags">
                  <span className="tag">Python</span>
                </div>
                <p>An automated system for discovering and analyzing real estate listings with rich neighborhood data. It combines web scraping, semantic search, and AWS (S3, EC2, IAM) to support both cloud and local workflows.</p>
              </div>
              <div className="project-card" data-language="ai,java" data-url="https://github.com/DiegoCico/PredatorPreySim" onClick={() => window.open('https://github.com/DiegoCico/PredatorPreySim', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84C10.19 11.15 10 11.57 10 12C10 12.43 10.19 12.85 10.5 13.16L16.17 18.83L13.5 21.5L15 23L21 17V15H19V9H21Z"/>
                  </svg>
                </div>
                <h3>PredatorPreySim</h3>
                <div className="project-tags">
                  <span className="tag">AI/ML</span>
                  <span className="tag">Java</span>
                </div>
                <p>A simulation project that models the interactions between predators and prey, complete with graphical representations of population changes.</p>
              </div>
            </div>

            {/* Page 2 */}
            <div className={`projects-page ${currentPage === 2 ? 'active' : ''}`} id="projects-page-2">
              <div className="project-card" data-language="react,htmlcss" data-url="https://github.com/DiegoCico/DYA" onClick={() => window.open('https://github.com/DiegoCico/DYA', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,3H7V5H5V10A2,2 0 0,1 3,8V6A2,2 0 0,1 5,4V3M18,3V4A2,2 0 0,1 20,6V8A2,2 0 0,1 18,10V5H16V3H18M4,14A4,4 0 0,0 8,18H16A4,4 0 0,0 20,14V12A2,2 0 0,0 18,10H6A2,2 0 0,0 4,12V14Z"/>
                  </svg>
                </div>
                <h3>DYA</h3>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">HTML/CSS</span>
                </div>
                <p>DYA is an educational website that teaches kids and beginners how to code through interactive, game-like elements, visual programming, and step-by-step tutorials.</p>
              </div>
              <div className="project-card" data-language="python" data-url="https://github.com/DiegoCico/MergeCompaniesAlgorithm" onClick={() => window.open('https://github.com/DiegoCico/MergeCompaniesAlgorithm', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7L15,11L11,15V13H7A5,5 0 0,0 2,18A5,5 0 0,0 7,23H20V21H7A3,3 0 0,1 4,18A3,3 0 0,1 7,15H11V13.1H7C5.29,13.1 3.9,11.71 3.9,10V12Z"/>
                  </svg>
                </div>
                <h3>MergeAlgorithm</h3>
                <div className="project-tags">
                  <span className="tag">Python</span>
                </div>
                <p>This script standardizes company data, geocodes addresses, and detects similar companies by name and location using two different geocoding and matching approaches.</p>
              </div>
              <div className="project-card" data-language="react,htmlcss,python" data-url="https://github.com/DiegoCico/text-me-wrapped" onClick={() => window.open('https://github.com/DiegoCico/text-me-wrapped', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9V7H18V9H6M14,11V13H6V11H14M16,15V17H6V15H16Z"/>
                  </svg>
                </div>
                <h3>Text Me Wrapped</h3>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">HTML/CSS</span>
                  <span className="tag">Python</span>
                </div>
                <p>React frontend with a Flask backend on AWS EC2, offering insights into chat logs like sentiment analysis, emoji usage, and participation stats in an interactive, visual format.</p>
              </div>
              <div className="project-card" data-language="java" data-url="https://github.com/DiegoCico/diego-pipeline" onClick={() => window.open('https://github.com/DiegoCico/diego-pipeline', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                  </svg>
                </div>
                <h3>diego-pipeline</h3>
                <div className="project-tags">
                  <span className="tag">Java</span>
                </div>
                <p>This project automates the build, test, validation, and deployment of a Java project, including building, testing, user input validation, and automatic deployment to GitHub.</p>
              </div>
            </div>

            {/* Page 3 */}
            <div className={`projects-page ${currentPage === 3 ? 'active' : ''}`} id="projects-page-3">
              <div className="project-card" data-language="react,htmlcss,python,ai" onClick={() => window.open('https://github.com/DiegoCico/WaveCap', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                  </svg>
                </div>
                <h3>WaveCap</h3>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">HTML/CSS</span>
                  <span className="tag">Python</span>
                  <span className="tag">AI/ML</span>
                </div>
                <p>Stock Portfolio Management System using Flask (backend) and React (frontend) for tracking stocks, viewing charts, managing portfolios, simulating trades, and analyzing news sentiment.</p>
              </div>
              <div className="project-card" data-language="react,htmlcss,ai" onClick={() => window.open('https://github.com/DiegoCico/ConnectHealth', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                  </svg>
                </div>
                <h3>ConnectHealth</h3>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">HTML/CSS</span>
                  <span className="tag">AI/ML</span>
                </div>
                <p>Secure platform for hospitals to manage patient data, ensuring data security and collaboration. Powered by Ruff, an AI assistant, it helps doctors make informed decisions on medications, treatments, and care protocols.</p>
              </div>
              <div className="project-card" data-language="java" onClick={() => window.open('https://github.com/DiegoCico/diego.tools', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z"/>
                  </svg>
                </div>
                <h3>diego.tools</h3>
                <div className="project-tags">
                  <span className="tag">Java</span>
                </div>
                <p>An intuitive tool for coding beginners, simplifying complex concepts and providing an easy starting point for learning programming.</p>
              </div>
              <div className="project-card" data-language="java,ai" onClick={() => window.open('https://github.com/DiegoCico/SurvivalSprintHarvest', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22V16H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V16H2V14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M5,16V20H19V16H5M6,9A1,1 0 0,1 7,10A1,1 0 0,1 6,11A1,1 0 0,1 5,10A1,1 0 0,1 6,9M18,9A1,1 0 0,1 19,10A1,1 0 0,1 18,11A1,1 0 0,1 17,10A1,1 0 0,1 18,9Z"/>
                  </svg>
                </div>
                <h3>SurvivalSprintHarvest</h3>
                <div className="project-tags">
                  <span className="tag">Java</span>
                  <span className="tag">AI/ML</span>
                </div>
                <p>An AI-driven simulation where agents must find and collect food to survive. Manage their movements and energy to ensure they thrive, returning to base strategically to avoid running out of energy.</p>
              </div>
            </div>

            {/* Page 4 */}
            <div className={`projects-page ${currentPage === 4 ? 'active' : ''}`} id="projects-page-4">
              <div className="project-card" data-language="react,htmlcss,python,ai" onClick={() => window.open('https://github.com/DiegoCico/ruff', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                  </svg>
                </div>
                <h3>Ruff</h3>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">HTML/CSS</span>
                  <span className="tag">Python</span>
                  <span className="tag">AI/ML</span>
                </div>
                <p>Ruff is an AI-powered medical symptom analysis and call-handling system designed to assist individuals in assessing their symptoms through voice interactions. By leveraging natural language processing and sentiment analysis.</p>
              </div>
              <div className="project-card" data-language="python" onClick={() => window.open('https://github.com/DiegoCico/ValentinesINV-2.0', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                  </svg>
                </div>
                <h3>ValentinesINV-2.0</h3>
                <div className="project-tags">
                  <span className="tag">Python</span>
                </div>
                <p>A cute project I made to ask my girlfriend to be my valentines ◡̈</p>
              </div>
              <div className="project-card" data-language="java" onClick={() => window.open('https://github.com/DiegoCico/ImageCompression', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
                  </svg>
                </div>
                <h3>ImageCompression</h3>
                <div className="project-tags">
                  <span className="tag">Java</span>
                </div>
                <p>Efficient image compression tool utilizing seam carving for content-aware resizing, powered by linked lists and maps for optimized performance. Perfect for reducing file sizes while preserving critical image details.</p>
              </div>
              <div className="project-card" data-language="java,ai" onClick={() => window.open('https://github.com/DiegoCico/AutoHospitalSystem/tree/main', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                  </svg>
                </div>
                <h3>AutoHospitalManagement</h3>
                <div className="project-tags">
                  <span className="tag">Java</span>
                  <span className="tag">AI/ML</span>
                </div>
                <p>Simulates hospital room and patient management. It enables users to manage hospital rooms, admit and discharge patients, assign doctors, and maintain patient waitlists based on priority levels.</p>
              </div>
            </div>

            {/* Page 5 */}
            <div className={`projects-page ${currentPage === 5 ? 'active' : ''}`} id="projects-page-5">
              <div className="project-card" data-language="typescript,swift" onClick={() => window.open('https://github.com/DiegoCico/TwoPix-Swift', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"/>
                  </svg>
                </div>
                <h3>TwoPix</h3>
                <div className="project-tags">
                  <span className="tag">Swift</span>
                  <span className="tag">TypeScript</span>
                </div>
                <p>A private photo messaging app for two. Like Snapchat, but just for you and your favorite person — no feeds, no noise, just connection.</p>
              </div>
              <div className="project-card" data-language="python" onClick={() => window.open('https://github.com/DiegoCico/AutoJobApplier', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z"/>
                  </svg>
                </div>
                <h3>AutoJobApplier</h3>
                <div className="project-tags">
                  <span className="tag">Python</span>
                </div>
                <p>Automated job application bot for LinkedIn and Indeed, built with Python and Selenium. It logs into your accounts, searches for relevant roles, and automatically applies using features like "Easy Apply" when available—saving you hours of manual work.</p>
              </div>
              <div className="project-card" data-language="react,python,ai,typescript" onClick={() => window.open('https://github.com/DiegoCico/Neuro', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22V16H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V16H2V14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M5,16V20H19V16H5M6,9A1,1 0 0,1 7,10A1,1 0 0,1 6,11A1,1 0 0,1 5,10A1,1 0 0,1 6,9M18,9A1,1 0 0,1 19,10A1,1 0 0,1 18,11A1,1 0 0,1 17,10A1,1 0 0,1 18,9Z"/>
                  </svg>
                </div>
                <h3>Neuro</h3>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">Python</span>
                  <span className="tag">AI/ML</span>
                </div>
                <p>A professional networking platform designed to go beyond static resumes and create a more dynamic, intelligent, and engaging environment for connecting people, showcasing projects, and enabling recruiters to discover talent more effectively.</p>
              </div>
              <div className="project-card" data-language="react" onClick={() => window.open('https://github.com/DiegoCico/botrally', '_blank')}>
                <div className="project-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,11L6.5,6.5H17.5L19,11H5M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z"/>
                  </svg>
                </div>
                <h3>BotRally</h3>
                <div className="project-tags">
                  <span className="tag">React</span>
                </div>
                <p>Innovative educational racing game where players program autonomous racing cars using visual block-based programming (like Scratch) and compete against AI opponents or other players in real-time multiplayer races.</p>
              </div>
            </div>

            <button className="carousel-arrow right" onClick={showNextPage}>
              <span>›</span>
            </button>
          </div>

          {/* View All Projects Button */}
          <div className="view-all-container">
            <button className="view-all-projects-button" onClick={() => window.open('https://github.com/DiegoCico?tab=repositories', '_blank')}>
              View All Projects!
            </button>
          </div>
        </div>
      </section>

      {/* EXPERIENCE Section */}
      <section id="experience" className="section-content">
        <div className="section-header">
          <h1 className="section-title">EXPERIENCE</h1>
        </div>
        <div className="content-body">          
          <div className="timeline">
            {/* Top 3 Experiences - Always Visible */}
            <div className="timeline-item" onClick={() => showExperiencePopup('Amazon Web Services (AWS)', 'Starting July 2026', 'Software Development Engineer (Full-Time)', 'AWS AFX Generative AI services')}>
              <div className="timeline-date">2026</div>
              <div className="timeline-content">
                <h3>Software Development Engineer</h3>
                <p className="company">Amazon Web Services (AWS) - Future Role</p>
                <p>Post-graduation position focusing on cloud infrastructure and scalable systems.</p>
              </div>
              <div className="timeline-hover-effect"></div>
            </div>

            <div className="timeline-item" onClick={() => showExperiencePopup('Massachusetts National Guard', 'Sept 2025 - Dec 2025', 'Software Engineer (Contract)', 'Built a cloud-native inventory system for the Massachusetts National Guard with a multi-team Teamspace model, granular role permissions, a scalable DynamoDB PK/SK + GSI design, secure presigned S3 flows, and a React + TypeScript front end for fast item management and real-time visibility.')}>
              <div className="timeline-date">2025</div>
              <div className="timeline-content">
                <h3>Software Engineer (Contract)</h3>
                <p className="company">Massachusetts National Guard</p>
                <p>Built cloud-native inventory system with React + TypeScript frontend.</p>
              </div>
              <div className="timeline-hover-effect"></div>
            </div>

            <div className="timeline-item" onClick={() => showExperiencePopup('Supply Trace', 'Sept 2024 - Nov 2025', 'Technical Project Manager', 'Built data pipelines and analytical tools under Dr. Shawn to streamline supply chain operations and enhance infrastructure for faster, safer data loading. Managed a high-performance team of 3, ensured timely task completion, and led weekly meetings to align project goals.')}>
              <div className="timeline-date">2024-2025</div>
              <div className="timeline-content">
                <h3>Technical Project Manager</h3>
                <p className="company">Supply Trace</p>
                <p>Built data pipelines and managed high-performance team of 3.</p>
                <button 
                  className="supply-trace-button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('https://supplytrace.org', '_blank');
                  }}
                >
                  Visit Supply Trace
                </button>
              </div>
              <div className="timeline-hover-effect"></div>
            </div>

            {/* Expand Tree Button */}
            <div className="expand-tree-container">
              <button 
                className={`expand-tree-button ${expandedExperience ? 'expanded' : ''}`}
                onClick={() => setExpandedExperience(!expandedExperience)}
              >
                <span className="tree-icon">+</span>
                {expandedExperience ? 'Collapse Tree' : 'Expand Tree'}
                <span className={`arrow ${expandedExperience ? 'up' : 'down'}`}>▼</span>
              </button>
            </div>

            {/* Additional Experiences - Expandable */}
            <div className={`additional-experiences ${expandedExperience ? 'expanded' : ''}`}>
              <div className="timeline-item" onClick={() => showExperiencePopup('Amazon Web Services (AWS)', 'May 2025 - Aug 2025', 'Software Development Engineer Intern', 'Built a secure, scalable GenAI system with a React frontend and Lambda backend that automated contract processing, cutting time from hours to minutes and streamlining vendor onboarding.')}>
                <div className="timeline-date">2025</div>
                <div className="timeline-content">
                  <h3>SDE Intern (Summer 2025)</h3>
                  <p className="company">Amazon Web Services (AWS)</p>
                  <p>Built secure GenAI system automating contract processing.</p>
                </div>
                <div className="timeline-hover-effect"></div>
              </div>

              <div className="timeline-item" onClick={() => showExperiencePopup('Amazon Web Services (AWS)', 'May 2024 - Aug 2024', 'Software Development Engineer Intern', 'Extracted and processed data from over 2 million users using Productiv API, reducing processing time by 40%. Built a custom data pipeline in TypeScript and visualized insights in QuickSight, saving $15M.')}>
                <div className="timeline-date">2024</div>
                <div className="timeline-content">
                  <h3>SDE Intern (Summer 2024)</h3>
                  <p className="company">Amazon Web Services (AWS)</p>
                  <p>Built data pipeline processing 2M+ users, saving $15M.</p>
                </div>
                <div className="timeline-hover-effect"></div>
              </div>

              <div className="timeline-item" onClick={() => showExperiencePopup('Kid Teaches Kids', 'Jun 2021 - Sept 2023', 'Founder & CEO', 'Founded and scaled an online coding tutoring platform, delivering 1,000+ hours of personalized sessions to children aged 8-16.')}>
                <div className="timeline-date">2021-2023</div>
                <div className="timeline-content">
                  <h3>Founder & CEO</h3>
                  <p className="company">Kid Teaches Kids</p>
                  <p>Founded online coding platform, 1,000+ tutoring hours.</p>
                </div>
                <div className="timeline-hover-effect"></div>
              </div>

              <div className="timeline-item" onClick={() => showExperiencePopup('Code Ninjas', 'Jun 2021 - Aug 2023', 'Manager', 'Led a team of 15 instructors, mentoring kids in coding, revamping franchise performance, and delivering $30,000+ in monthly revenue.')}>
                <div className="timeline-date">2021-2023</div>
                <div className="timeline-content">
                  <h3>Manager</h3>
                  <p className="company">Code Ninjas</p>
                  <p>Led team of 15 instructors, $30,000+ monthly revenue.</p>
                </div>
                <div className="timeline-hover-effect"></div>
              </div>

              <div className="timeline-item" onClick={() => showExperiencePopup('Pinbank Brazil', 'Jun 2019 - Nov 2021', 'Assistant Software Engineer', 'Unpaid internship. Developed Android application projects using JAVA, XML, HTML, and CSS.')}>
                <div className="timeline-date">2019</div>
                <div className="timeline-content">
                  <h3>Assistant Software Engineer</h3>
                  <p className="company">Pinbank Brazil</p>
                  <p>Developed Android applications using Java, XML, HTML, CSS.</p>
                </div>
                <div className="timeline-hover-effect"></div>
              </div>
            </div>
          </div>

          {/* Experience Popup Modal */}
          <div id="experience-popup" className="experience-popup">
            <div className="popup-content">
              <span className="popup-close" onClick={() => closeExperiencePopup()}>&times;</span>
              <h2 id="popup-company"></h2>
              <p id="popup-date"></p>
              <h3 id="popup-role"></h3>
              <p id="popup-description"></p>
            </div>
          </div>
        </div>
      </section>

      {/* STACK Section */}
      <section id="stack" className="section-content">
        <div className="section-header">
          <h1 className="section-title">STACK</h1>
        </div>
        <div className="content-body">
          {/* Animated Tech Scroll */}
          <div className="tech-scroll-container">
            <div className="tech-scroll-track">
              <div className="tech-scroll">
                <SiJavascript className="tech-icon js" size={32} />
                <SiTypescript className="tech-icon ts" size={32} />
                <SiPython className="tech-icon py" size={32} />
                <FaJava className="tech-icon java" size={32} />

                <FaNodeJs className="tech-icon node" size={32} />
                <SiExpress className="tech-icon express" size={32} />
                <SiFlask className="tech-icon flask" size={32} />

                <SiReact className="tech-icon react" size={32} />
                <FaAws className="tech-icon aws" size={32} />
                <SiGooglecloud className="tech-icon gcp" size={32} />
                <FaMicrosoft className="tech-icon azure" size={32} />
                <SiFastapi className="tech-icon fastapi" size={32} />
                <SiDjango className="tech-icon django" size={32} />
                <SiMongodb className="tech-icon mongodb" size={32} />

                <SiVite className="tech-icon vite" size={32} />
                <SiDocker className="tech-icon docker" size={32} />
                <SiPostgresql className="tech-icon postgres" size={32} />
                <SiFirebase className="tech-icon firebase" size={32} />
                <SiGit className="tech-icon git" size={32} />
                <SiLinux className="tech-icon linux" size={32} />

                {/* duplicate once for seamless loop */}
                <SiJavascript className="tech-icon js" size={32} />
                <SiTypescript className="tech-icon ts" size={32} />
                <SiPython className="tech-icon py" size={32} />
                <FaJava className="tech-icon java" size={32} />
                <FaNodeJs className="tech-icon node" size={32} />
                <SiExpress className="tech-icon express" size={32} />
                <SiFlask className="tech-icon flask" size={32} />
                <SiReact className="tech-icon react" size={32} />
                <FaAws className="tech-icon aws" size={32} />
                <SiGooglecloud className="tech-icon gcp" size={32} />
                <FaMicrosoft className="tech-icon azure" size={32} />
                <SiFastapi className="tech-icon fastapi" size={32} />
                <SiDjango className="tech-icon django" size={32} />
                <SiMongodb className="tech-icon mongodb" size={32} />
                <SiVite className="tech-icon vite" size={32} />
                <SiDocker className="tech-icon docker" size={32} />
                <SiPostgresql className="tech-icon postgres" size={32} />
                <SiFirebase className="tech-icon firebase" size={32} />
                <SiGit className="tech-icon git" size={32} />
                <SiLinux className="tech-icon linux" size={32} />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContentSection;