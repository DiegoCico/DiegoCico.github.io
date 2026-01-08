const ContentSection = () => {
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
                I am a student at <span className="highlight">Northeastern University</span> (Class of 2026), originally 
                from Brazil. My engineering focus lies in backend architecture, AI-driven automation, and building systems that scale.
              </p>
              <p>
                I am proud to be an <span className="highlight">incoming SDE Intern at Amazon Web Services (AWS)</span>, where I'll be contributing to 
                cloud infrastructure.
              </p>
              <p>
                Social impact is core to my identity—I founded <span className="highlight">The Hope Box</span> to support 
                underprivileged children in Brazil with educational materials.
              </p>
              
              <div className="action-buttons">
                <a href="#" className="action-button">View Resume</a>
                <a href="#" className="action-button">Schedule Coffee Chat</a>
                <a href="#" className="action-button">View LinkedIn</a>
              </div>
            </div>
            <div className="about-image">
              <div className="profile-placeholder">
                <div className="profile-icon">👨‍💻</div>
                <p>Diego Cicotoste</p>
              </div>
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
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>CS4550 - Web Development</h3>
              <p>Latest academic project completed 27 days ago</p>
              <span className="project-tech">React • Node.js • MongoDB</span>
            </div>
            <div className="project-card">
              <h3>Alexa Smart Home Automation</h3>
              <p>Custom Alexa skills for home automation and productivity</p>
              <span className="project-tech">Python • AWS Lambda • IoT</span>
            </div>
            <div className="project-card">
              <h3>Automated House Search Bot</h3>
              <p>AI-powered bot for finding and analyzing real estate listings</p>
              <span className="project-tech">Python • Web Scraping • ML</span>
            </div>
            <div className="project-card">
              <h3>Personal Productivity App</h3>
              <p>Mobile app for personal task management and automation</p>
              <span className="project-tech">React Native • Firebase</span>
            </div>
          </div>
          <p className="projects-summary">
            <span className="highlight">Total: 72 GitHub repositories</span> spanning web development, 
            automation, mobile apps, and AI projects.
          </p>
        </div>
      </section>

      {/* EXPERIENCE Section */}
      <section id="experience" className="section-content">
        <div className="section-header">
          <h1 className="section-title">EXPERIENCE</h1>
        </div>
        <div className="content-body">
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2026</div>
              <div className="timeline-content">
                <h3>Software Development Engineer</h3>
                <p className="company">Amazon Web Services (AWS) - Future Role</p>
                <p>Post-graduation position focusing on cloud infrastructure and scalable systems.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2024</div>
              <div className="timeline-content">
                <h3>SDE Intern</h3>
                <p className="company">Amazon Web Services (AWS) - Incoming</p>
                <p>Contributing to cloud infrastructure and backend systems.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2022-2026</div>
              <div className="timeline-content">
                <h3>Computer Science Student</h3>
                <p className="company">Northeastern University</p>
                <p>Focus on software engineering, algorithms, and system design. Class of 2026.</p>
              </div>
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
            <div className="tech-scroll">
              <div className="tech-scroll-item">🚀 JavaScript</div>
              <div className="tech-scroll-item">⚡ TypeScript</div>
              <div className="tech-scroll-item">🐍 Python</div>
              <div className="tech-scroll-item">☕ Java</div>
              <div className="tech-scroll-item">⚛️ React</div>
              <div className="tech-scroll-item">🟢 Node.js</div>
              <div className="tech-scroll-item">☁️ AWS</div>
              <div className="tech-scroll-item">🐳 Docker</div>
              <div className="tech-scroll-item">📱 React Native</div>
              <div className="tech-scroll-item">🔥 Express</div>
              <div className="tech-scroll-item">🎯 VS Code</div>
              <div className="tech-scroll-item">🔧 Git</div>
            </div>
          </div>
          
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Languages</h3>
              <div className="tech-items">
                <span className="tech-item">JavaScript</span>
                <span className="tech-item">TypeScript</span>
                <span className="tech-item">Python</span>
                <span className="tech-item">Java</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>Frontend</h3>
              <div className="tech-items">
                <span className="tech-item">React</span>
                <span className="tech-item">HTML5</span>
                <span className="tech-item">CSS3</span>
                <span className="tech-item">React Native</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>Backend & Cloud</h3>
              <div className="tech-items">
                <span className="tech-item">Node.js</span>
                <span className="tech-item">Express</span>
                <span className="tech-item">AWS Lambda</span>
                <span className="tech-item">S3</span>
                <span className="tech-item">EC2</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>Tools & Automation</h3>
              <div className="tech-items">
                <span className="tech-item">Git</span>
                <span className="tech-item">Docker</span>
                <span className="tech-item">VS Code</span>
                <span className="tech-item">Alexa Skills</span>
                <span className="tech-item">Home Assistant</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentSection;