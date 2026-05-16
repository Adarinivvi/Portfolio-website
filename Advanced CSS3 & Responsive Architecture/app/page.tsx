/**
 * Portfolio Page
 * ==============
 * A showcase-quality frontend portfolio demonstrating expert-level
 * semantic HTML5, accessibility, responsive design, and modern CSS architecture.
 * 
 * Built with:
 * - Semantic HTML5 structure
 * - WCAG 2.2 AA accessibility compliance
 * - CSS Grid & Flexbox for responsive layouts
 * - CSS Custom Properties for theming
 * - Vanilla JavaScript for interactivity
 */

/* Icons as inline SVG components for accessibility */
const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const SunIcon = () => (
  <svg className="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
)

const MoonIcon = () => (
  <svg className="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

const ArrowUpRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
)

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
)

/* Project data */
const projects = [
  {
    title: 'Analytics Dashboard',
    description: 'A comprehensive analytics platform for tracking user behavior and business metrics with real-time data visualization and customizable reports.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    imageAlt: 'Dashboard analytics interface showing charts and metrics',
    tags: ['React', 'D3.js', 'Node.js'],
    github: '#',
    live: '#',
  },
  {
    title: 'E-Commerce Platform',
    description: 'A fully accessible e-commerce storefront with advanced filtering, shopping cart functionality, and seamless checkout experience.',
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&h=400&fit=crop',
    imageAlt: 'E-commerce product listing interface',
    tags: ['Next.js', 'Stripe', 'Sanity'],
    github: '#',
    live: '#',
  },
  {
    title: 'Design System',
    description: 'A comprehensive design system and component library built for scalability, featuring tokens, documentation, and accessibility-first components.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    imageAlt: 'Design system component library showcase',
    tags: ['React', 'Storybook', 'CSS Vars'],
    github: '#',
    live: '#',
  },
  {
    title: 'Task Manager',
    description: 'A productivity application for managing tasks and projects with drag-and-drop functionality, team collaboration, and progress tracking.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    imageAlt: 'Task management application interface',
    tags: ['TypeScript', 'React', 'PostgreSQL'],
    github: '#',
    live: '#',
  },
]

/* Experience data */
const experience = [
  {
    date: '2024 — Present',
    title: 'Senior Frontend Engineer, Accessibility',
    company: 'Acme Corp',
    companyUrl: '#',
    description: 'Build and maintain critical components used to construct the frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.',
    tags: ['JavaScript', 'TypeScript', 'React', 'Storybook'],
  },
  {
    date: '2022 — 2024',
    title: 'Frontend Developer',
    company: 'StartupX',
    companyUrl: '#',
    description: 'Developed and shipped highly interactive web applications for diverse clients using React, SCSS, and JavaScript. Collaborated with designers to implement pixel-perfect, responsive designs with a focus on performance optimization.',
    tags: ['React', 'SCSS', 'GraphQL', 'Webpack'],
  },
  {
    date: '2020 — 2022',
    title: 'UI Engineer',
    company: 'Digital Agency',
    companyUrl: '#',
    description: 'Worked on a variety of client projects, from small business websites to large-scale web applications. Focused on creating reusable component libraries and establishing coding standards across teams.',
    tags: ['HTML/CSS', 'JavaScript', 'Vue.js', 'Figma'],
  },
]

export default function PortfolioPage() {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header / Navigation */}
      <header className="site-header" role="banner">
        <div className="container header-inner">
          <a href="/" className="logo" aria-label="Alex Chen - Home">
            <span className="logo-text">Alex Chen</span>
            <span className="logo-subtitle">Frontend Developer</span>
          </a>

          <nav className="main-nav" role="navigation" aria-label="Main navigation">
            <button 
              className="nav-toggle" 
              aria-expanded="false" 
              aria-controls="nav-menu"
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            <ul id="nav-menu" className="nav-menu" role="menubar">
              <li role="none"><a href="#about" role="menuitem" className="nav-link active">About</a></li>
              <li role="none"><a href="#experience" role="menuitem" className="nav-link">Experience</a></li>
              <li role="none"><a href="#projects" role="menuitem" className="nav-link">Projects</a></li>
              <li role="none"><a href="#contact" role="menuitem" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          <button 
            className="theme-toggle" 
            aria-label="Toggle dark/light mode"
            title="Toggle theme"
          >
            <SunIcon />
            <MoonIcon />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="hero-greeting">Good evening</p>
              <h1 id="hero-heading" className="hero-title">
                I build accessible, pixel-perfect digital experiences for the web.
              </h1>
              <p className="hero-description">
                {"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">View My Work</a>
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
              </div>
            </div>

            <aside className="hero-sidebar" aria-label="Quick navigation">
              <nav className="section-nav">
                <a href="#about" className="section-nav-link active">
                  <span className="nav-indicator"></span>
                  <span>About</span>
                </a>
                <a href="#experience" className="section-nav-link">
                  <span className="nav-indicator"></span>
                  <span>Experience</span>
                </a>
                <a href="#projects" className="section-nav-link">
                  <span className="nav-indicator"></span>
                  <span>Projects</span>
                </a>
              </nav>

              <div className="social-links">
                <a href="https://github.com" className="social-link" aria-label="GitHub Profile" target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                </a>
                <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                </a>
                <a href="https://twitter.com" className="social-link" aria-label="Twitter Profile" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon />
                </a>
                <a href="mailto:hello@alexchen.dev" className="social-link" aria-label="Email">
                  <MailIcon />
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section" aria-labelledby="about-heading">
          <div className="container">
            <h2 id="about-heading" className="section-heading">
              <span className="section-number">01.</span>
              About Me
            </h2>
            <div className="about-grid">
              <div className="about-content">
                <p>
                  {"Currently, I'm a Senior Front-End Engineer at "}
                  <a href="#" className="text-link">Acme Corp</a>
                  {", specializing in accessibility. I contribute to the creation and maintenance of UI components that power the frontend, ensuring our platform meets web accessibility standards and best practices to deliver an inclusive user experience."}
                </p>
                <p>
                  {"In the past, I've had the opportunity to develop software across a variety of settings — from "}
                  <a href="#" className="text-link">advertising agencies</a>
                  {" and "}
                  <a href="#" className="text-link">large corporations</a>
                  {" to "}
                  <a href="#" className="text-link">start-ups</a>
                  {" and "}
                  <a href="#" className="text-link">small digital product studios</a>
                  {"."}
                </p>
                <p>
                  {"In my spare time, I'm usually climbing, reading, hanging out with my dog, or exploring new coffee shops around the city."}
                </p>
              </div>
              <div className="about-skills">
                <h3 className="skills-heading">Technologies I work with:</h3>
                <ul className="skills-list" role="list">
                  <li>JavaScript (ES6+)</li>
                  <li>TypeScript</li>
                  <li>React</li>
                  <li>CSS/Sass</li>
                  <li>Node.js</li>
                  <li>Accessibility (WCAG)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section" aria-labelledby="experience-heading">
          <div className="container">
            <h2 id="experience-heading" className="section-heading">
              <span className="section-number">02.</span>
              Experience
            </h2>
            <div className="experience-list">
              {experience.map((job, index) => (
                <article key={index} className="experience-item">
                  <header className="experience-header">
                    <span className="experience-date">{job.date}</span>
                    <div className="experience-info">
                      <h3 className="experience-title">
                        {job.title} · <a href={job.companyUrl} className="company-link">{job.company}</a>
                      </h3>
                      <p className="experience-description">{job.description}</p>
                      <ul className="tech-tags" role="list" aria-label="Technologies used">
                        {job.tags.map((tag, tagIndex) => (
                          <li key={tagIndex} className="tech-tag">{tag}</li>
                        ))}
                      </ul>
                    </div>
                  </header>
                </article>
              ))}
            </div>

            <a href="/resume.pdf" className="resume-link">
              View Full Resume
              <ArrowUpRightIcon />
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section" aria-labelledby="projects-heading">
          <div className="container">
            <h2 id="projects-heading" className="section-heading">
              <span className="section-number">03.</span>
              Selected Work
            </h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article key={index} className="project-card">
                  <div className="project-image">
                    <img 
                      src={project.image} 
                      alt={project.imageAlt} 
                      loading="lazy"
                    />
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">
                      <a href={project.live} className="project-link">{project.title}</a>
                    </h3>
                    <p className="project-description">{project.description}</p>
                    <ul className="tech-tags" role="list" aria-label="Technologies used">
                      {project.tags.map((tag, tagIndex) => (
                        <li key={tagIndex} className="tech-tag">{tag}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      <a href={project.github} className="project-action" aria-label={`View ${project.title} on GitHub`}>
                        <GithubIcon />
                      </a>
                      <a href={project.live} className="project-action" aria-label={`View live ${project.title}`}>
                        <ExternalLinkIcon />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <a href="/archive" className="archive-link">
              View Full Project Archive
              <ArrowRightIcon />
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section" aria-labelledby="contact-heading">
          <div className="container contact-container">
            <h2 id="contact-heading" className="section-heading section-heading--centered">
              <span className="section-number">04.</span>
              Get In Touch
            </h2>
            <p className="contact-description">
              {"If you would like to discuss a project or just say hi, I'm always down to chat. Feel free to reach out and I'll get back to you as soon as possible."}
            </p>
            
            <form className="contact-form" action="#" method="POST" noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    required
                    autoComplete="name"
                    aria-describedby="name-error"
                  />
                  <span id="name-error" className="form-error" role="alert" aria-live="polite"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    required
                    autoComplete="email"
                    aria-describedby="email-error"
                  />
                  <span id="email-error" className="form-error" role="alert" aria-live="polite"></span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-textarea" 
                  rows={5}
                  required
                  aria-describedby="message-error"
                ></textarea>
                <span id="message-error" className="form-error" role="alert" aria-live="polite"></span>
              </div>
              <button type="submit" className="btn btn-primary btn-submit">
                Send Message
                <SendIcon />
              </button>
            </form>

            <div className="contact-alternative">
              <p>Or reach out directly:</p>
              <a href="mailto:hello@alexchen.dev" className="email-link">hello@alexchen.dev</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="container footer-inner">
          <div className="footer-content">
            <p className="footer-text">
              Designed & Built by Alex Chen
            </p>
            <p className="footer-credits">
              Built with semantic HTML, CSS Grid/Flexbox, and vanilla JavaScript.
              <br />
              Accessibility-first. No frameworks.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <ul className="footer-links">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </nav>
          <p className="copyright">&copy; 2024 Alex Chen. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
