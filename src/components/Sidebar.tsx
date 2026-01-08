import { useState, useEffect } from 'react';

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const [activeSection, setActiveSection] = useState('terminal');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['terminal', 'about', 'projects', 'experience', 'stack'];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sidebar">
      <div className="logo">D.CICO</div>
      
      <nav>
        <a href="#terminal" className={`nav-item ${activeSection === 'terminal' ? 'active' : ''}`}>HOME</a>
        <a href="#about" className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}>ABOUT</a>
        <a href="#projects" className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}>PROJECTS</a>
        <a href="#experience" className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`}>EXPERIENCE</a>
        <a href="#stack" className={`nav-item ${activeSection === 'stack' ? 'active' : ''}`}>STACK</a>
      </nav>

      <div className="social-links">
        <a href="#" className="social-link">📁</a>
        <a href="#" className="social-link">🔗</a>
      </div>
    </div>
  );
};

export default Sidebar;