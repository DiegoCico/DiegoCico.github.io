import { useState, useEffect } from 'react';

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const [activeSection, setActiveSection] = useState('terminal');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && !sidebar.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
    // Prevent default anchor behavior
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">DiegoCico</div>
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <nav className={`sidebar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <a 
          href="#terminal" 
          className={`nav-item ${activeSection === 'terminal' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('terminal');
          }}
        >
          HOME
        </a>
        <a 
          href="#about" 
          className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('about');
          }}
        >
          ABOUT
        </a>
        <a 
          href="#projects" 
          className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('projects');
          }}
        >
          PROJECTS
        </a>
        <a 
          href="#experience" 
          className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('experience');
          }}
        >
          EXPERIENCE
        </a>
        <a 
          href="#stack" 
          className={`nav-item ${activeSection === 'stack' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('stack');
          }}
        >
          STACK
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;