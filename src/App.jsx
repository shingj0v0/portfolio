import { useState, useEffect } from 'react'
import { Mail, ArrowRight, ExternalLink, Layout, Database, Smartphone, Folder } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import './App.css'

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with Next.js, Stripe integration, and a custom CMS dashboard.',
      tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
      link: '#',
      github: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool featuring real-time updates and drag-and-drop interfaces.',
      tags: ['React', 'Firebase', 'Tailwind', 'Redux'],
      link: '#',
      github: '#'
    },
    {
      title: 'AI Image Generator',
      description: 'Web application leveraging OpenAI API to generate and share custom images.',
      tags: ['React', 'OpenAI', 'Express', 'PostgreSQL'],
      link: '#',
      github: '#'
    }
  ]

  const skills = [
    'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 
    'Node.js', 'Express', 'HTML5/CSS3', 'Tailwind CSS',
    'Git/GitHub', 'RESTful APIs', 'GraphQL', 'Figma'
  ]

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo gradient-text">Portfolio</div>
          <div className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero container">
          <div className="hero-glow"></div>
          <div className={`hero-content ${mounted ? 'fade-in' : ''}`}>
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Your Name</span>.<br />
              I build things for the web.
            </h1>
            <p className="hero-subtitle delay-1">
              I'm a software engineer specializing in building (and occasionally designing) exceptional, high-quality digital experiences.
            </p>
            <div className={`hero-buttons delay-2 ${mounted ? 'fade-in' : ''}`}>
              <a href="#projects" className="btn btn-primary">
                View My Work <ArrowRight className="icon-sm" />
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact Me
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section container">
          <h2 className="section-title">About Me</h2>
          
          <div className="about-grid">
            <div className="about-text">
              <p>
                Hello! My name is [Your Name] and I enjoy creating things that live on the internet. 
                My interest in web development started back in 2012 when I decided to try editing custom Tumblr 
                themes &mdash; turns out hacking together HTML & CSS taught me a lot about HTML & CSS!
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of working at an advertising agency, 
                a start-up, a huge corporation, and a student-led design studio. My main focus these days 
                is building accessible, inclusive products and digital experiences for a variety of clients.
              </p>
              
              <div className="skill-tags">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="about-card">
              <div className="about-stats">
                <div className="stat-item">
                  <h4>Frontend</h4>
                  <Layout className="icon-sm" style={{color: 'var(--primary)', marginBottom: '0.5rem', width: '24px', height: '24px'}} />
                  <p>UI / UX</p>
                </div>
                <div className="stat-item">
                  <h4>Backend</h4>
                  <Database className="icon-sm" style={{color: 'var(--secondary)', marginBottom: '0.5rem', width: '24px', height: '24px'}} />
                  <p>APIs</p>
                </div>
                <div className="stat-item">
                  <h4>Mobile</h4>
                  <Smartphone className="icon-sm" style={{color: 'var(--accent)', marginBottom: '0.5rem', width: '24px', height: '24px'}} />
                  <p>Responsive</p>
                </div>
              </div>
              <p style={{marginTop: '2rem', color: 'var(--text-secondary)'}}>
                I am constantly learning new technologies and currently exploring Web3 and AI integrations in modern web applications.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section container">
          <h2 className="section-title">Featured Projects</h2>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-img">
                  <Folder className="project-img-icon" size={48} />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <p>{project.description}</p>
                  
                  <div className="project-links">
                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      <FiGithub className="icon-sm" /> Code
                    </a>
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="icon-sm" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section container">
          <h2 className="section-title">Get In Touch</h2>
          
          <div className="contact-container">
            <p className="contact-text">
              Although I'm not currently looking for any new opportunities, my inbox is always open. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">
                <FiGithub size={24} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FiLinkedin size={24} />
              </a>
              <a href="mailto:hello@example.com" className="social-link" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
            
            <a href="mailto:hello@example.com" className="btn btn-primary">
              Say Hello
            </a>
          </div>
        </section>
      </main>
      
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Your Name. Built with React & Vite.</p>
        </div>
      </footer>
    </>
  )
}

export default App
