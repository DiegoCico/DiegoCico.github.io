import { useEffect, useState } from 'react';

const SECTIONS = ['terminal', 'about', 'projects', 'experience', 'stack'];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('terminal');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 2) {
        setActiveSection(SECTIONS[SECTIONS.length - 1]);
        return;
      }

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar');
      if (
        sidebar &&
        !sidebar.contains(e.target as Node) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });

    history.replaceState(null, '', `#${sectionId}`);
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">DiegoCico</div>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`sidebar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {SECTIONS.map((section) => (
          <button
            key={section}
            className={`nav-item ${
              activeSection === section ? 'active' : ''
            }`}
            onClick={() => handleNavClick(section)}
            type="button"
          >
            {section === 'terminal'
              ? 'HOME'
              : section.toUpperCase()}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
