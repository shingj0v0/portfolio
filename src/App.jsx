import { useState, useEffect } from 'react'
import { Mail, ArrowRight, ExternalLink, Layout, Database, Smartphone, Folder, Edit2, LogOut, Check } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import './App.css'

const DEFAULT_DATA = {
  name: '신경진',
  heroSubtitle: '훌륭한 품질의 사용자 경험을 구축하고 디자인하는 프론트엔드 개발자입니다.',
  aboutP1: '안녕하세요! 제 이름은 신경진입니다. 저는 웹 상에서 살아 숨 쉬는 것들을 만드는 것을 즐깁니다. 웹 개발에 대한 제 관심은 예전 나만의 커스텀 테마를 편집하던 때부터 시작되었고, HTML과 CSS를 직접 다루며 많은 것을 배웠습니다.',
  aboutP2: '오늘날 저는 접근성이 뛰어나고 포용적인 제품과 디지털 경험을 만드는 데 주력하고 있습니다. 항상 새로운 기술을 배우며 발전하고 있습니다.',
  skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'HTML5/CSS3', 'Git/GitHub', 'Figma'],
  projects: [
    {
      title: '인터랙티브 웹 포트폴리오',
      description: 'React와 Vite를 사용하여 제작된 고성능 개인 포트폴리오 웹사이트입니다.',
      tags: ['React', 'Vite', 'CSS', 'Vercel'],
      link: '#',
      github: '#'
    },
    {
      title: '쇼핑몰 대시보드',
      description: '판매 관리 및 통계를 한눈에 볼 수 있는 관리자 화면입니다.',
      tags: ['React', 'Redux', 'Chart.js'],
      link: '#',
      github: '#'
    },
    {
      title: '할 일 관리 앱',
      description: '실시간 업데이트와 드래그 앤 드롭 인터페이스를 갖춘 협업 툴입니다.',
      tags: ['React', 'Firebase', 'Tailwind'],
      link: '#',
      github: '#'
    }
  ],
  contactDesc: '현재 새로운 기회를 적극적으로 찾고 있지는 않지만, 제 메일함은 언제나 열려 있습니다. 질문이 있으시거나 그냥 인사를 나누고 싶으시다면 언제든 연락주세요!',
  contactEmail: 'shingj05@example.com'
}

function App() {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState(DEFAULT_DATA)
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Modals state
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginId, setLoginId] = useState('')
  const [loginPw, setLoginPw] = useState('')
  const [loginError, setLoginError] = useState('')

  const [editSection, setEditSection] = useState(null)
  const [editFormData, setEditFormData] = useState(null)

  useEffect(() => {
    // Load saved data if exists
    const savedData = localStorage.getItem('portfolioData')
    if (savedData) {
      try {
        setData(JSON.parse(savedData))
      } catch (e) {
        console.error('Failed to parse saved data', e)
      }
    }
    
    // Check if previously logged in (persisting admin session for convenience)
    if (localStorage.getItem('isAdmin') === 'true') {
      setIsAdmin(true)
    }

    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    // only save to local storage if it's already mounted to prevent overwriting with default initially
    if (mounted) {
      localStorage.setItem('portfolioData', JSON.stringify(data))
    }
  }, [data, mounted])

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginId === 'shingj05' && loginPw === 'shin3354') {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      setShowLoginModal(false)
      setLoginError('')
      setLoginId('')
      setLoginPw('')
    } else {
      setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
    localStorage.removeItem('isAdmin')
  }

  const openEditModal = (sectionName) => {
    setEditSection(sectionName)
    if (sectionName === 'hero') {
      setEditFormData({ name: data.name, heroSubtitle: data.heroSubtitle })
    } else if (sectionName === 'about') {
      setEditFormData({ aboutP1: data.aboutP1, aboutP2: data.aboutP2, skills: data.skills.join(', ') })
    } else if (sectionName === 'projects') {
      // JSON format for easier editing of arrays
      setEditFormData({ projectsJson: JSON.stringify(data.projects, null, 2) })
    } else if (sectionName === 'contact') {
      setEditFormData({ contactDesc: data.contactDesc, contactEmail: data.contactEmail })
    }
  }

  const saveEdit = () => {
    if (editSection === 'hero') {
      setData({ ...data, name: editFormData.name, heroSubtitle: editFormData.heroSubtitle })
    } else if (editSection === 'about') {
      const skillsArray = editFormData.skills.split(',').map(s => s.trim()).filter(s => s)
      setData({ ...data, aboutP1: editFormData.aboutP1, aboutP2: editFormData.aboutP2, skills: skillsArray })
    } else if (editSection === 'projects') {
      try {
        const parsedProjects = JSON.parse(editFormData.projectsJson)
        setData({ ...data, projects: parsedProjects })
      } catch (e) {
        alert('잘못된 JSON 형식입니다. 수정 후 다시 시도해주세요.')
        return
      }
    } else if (editSection === 'contact') {
      setData({ ...data, contactDesc: editFormData.contactDesc, contactEmail: editFormData.contactEmail })
    }
    setEditSection(null)
  }

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <div 
            className="logo gradient-text admin-login-trigger" 
            onDoubleClick={() => !isAdmin && setShowLoginModal(true)}
            title="더블 클릭하여 관리자 로그인"
          >
            {data.name}의 포트폴리오
          </div>
          <div className="nav-links">
            <a href="#about" className="nav-link">소개</a>
            <a href="#projects" className="nav-link">프로젝트</a>
            <a href="#contact" className="nav-link">연락처</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero container" style={{position: 'relative'}}>
          {isAdmin && (
            <button className="edit-btn" onClick={() => openEditModal('hero')}>
              <Edit2 size={14} /> 히어로 수정
            </button>
          )}
          <div className="hero-glow"></div>
          <div className={`hero-content ${mounted ? 'fade-in' : ''}`}>
            <h1 className="hero-title">
              안녕하세요, <span className="gradient-text">{data.name}</span>입니다.<br />
              웹의 한계를 넘어갑니다.
            </h1>
            <p className="hero-subtitle delay-1">
              {data.heroSubtitle}
            </p>
            <div className={`hero-buttons delay-2 ${mounted ? 'fade-in' : ''}`}>
              <a href="#projects" className="btn btn-primary">
                프로젝트 보기 <ArrowRight className="icon-sm" />
              </a>
              <a href="#contact" className="btn btn-outline">
                연락하기
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section container" style={{position: 'relative'}}>
          {isAdmin && (
            <button className="edit-btn" onClick={() => openEditModal('about')}>
              <Edit2 size={14} /> 소개 수정
            </button>
          )}
          <h2 className="section-title">자기 소개</h2>
          
          <div className="about-grid">
            <div className="about-text">
              <p>{data.aboutP1}</p>
              <p>{data.aboutP2}</p>
              
              <div className="skill-tags">
                {data.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="about-card">
              <div className="about-stats">
                <div className="stat-item">
                  <h4>프론트엔드</h4>
                  <Layout className="icon-sm" style={{color: 'var(--primary)', marginBottom: '0.5rem', width: '24px', height: '24px'}} />
                  <p>UI / UX</p>
                </div>
                <div className="stat-item">
                  <h4>백엔드</h4>
                  <Database className="icon-sm" style={{color: 'var(--secondary)', marginBottom: '0.5rem', width: '24px', height: '24px'}} />
                  <p>APIs</p>
                </div>
                <div className="stat-item">
                  <h4>모바일</h4>
                  <Smartphone className="icon-sm" style={{color: 'var(--accent)', marginBottom: '0.5rem', width: '24px', height: '24px'}} />
                  <p>반응형</p>
                </div>
              </div>
              <p style={{marginTop: '2rem', color: 'var(--text-secondary)'}}>
                최신 기술을 배우는 것을 즐기며 끊임없이 발전하는 개발자입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section container" style={{position: 'relative'}}>
          {isAdmin && (
            <button className="edit-btn" onClick={() => openEditModal('projects')}>
              <Edit2 size={14} /> 프로젝트 목록 수정
            </button>
          )}
          <h2 className="section-title">주요 프로젝트</h2>
          
          <div className="projects-grid">
            {data.projects.map((project, index) => (
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
                      <FiGithub className="icon-sm" /> 코드 보기
                    </a>
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="icon-sm" /> 라이브 데모
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section container" style={{position: 'relative'}}>
          {isAdmin && (
            <button className="edit-btn" onClick={() => openEditModal('contact')}>
              <Edit2 size={14} /> 연락처 수정
            </button>
          )}
          <h2 className="section-title">연락하기</h2>
          
          <div className="contact-container">
            <p className="contact-text">
              {data.contactDesc}
            </p>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">
                <FiGithub size={24} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FiLinkedin size={24} />
              </a>
              <a href={`mailto:${data.contactEmail}`} className="social-link" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
            
            <a href={`mailto:${data.contactEmail}`} className="btn btn-primary">
              메일 보내기
            </a>
          </div>
        </section>
      </main>
      
      <footer>
        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
          <p>&copy; {new Date().getFullYear()} {data.name}. Built with React & Vite.</p>
          {!isAdmin && (
            <span style={{fontSize: '10px', cursor: 'pointer', opacity: 0.2}} onClick={() => setShowLoginModal(true)}>
              Admin
            </span>
          )}
        </div>
      </footer>

      {/* Admin Toolbar */}
      {isAdmin && (
        <div className="admin-toolbar fade-in">
          <span>관리자 모드 활성화됨</span>
          <button onClick={handleLogout} style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <LogOut size={14} /> 로그아웃
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">포트폴리오 관리자 로그인</h3>
            {loginError && <p style={{color: 'var(--accent)', marginBottom: '1rem', fontSize: '0.9rem'}}>{loginError}</p>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>아이디</label>
                <input 
                  type="text" 
                  value={loginId} 
                  onChange={e => setLoginId(e.target.value)} 
                  autoFocus 
                  placeholder="아이디 입력"
                />
              </div>
              <div className="form-group">
                <label>비밀번호</label>
                <input 
                  type="password" 
                  value={loginPw} 
                  onChange={e => setLoginPw(e.target.value)} 
                  placeholder="비밀번호 입력"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowLoginModal(false)}>취소</button>
                <button type="submit" className="btn btn-primary">로그인</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editSection && (
        <div className="modal-overlay" onClick={() => setEditSection(null)}>
          <div className={`modal-content ${editSection === 'projects' ? 'large' : ''}`} onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">섹션 수정 ({editSection})</h3>
            
            {editSection === 'hero' && (
              <>
                <div className="form-group">
                  <label>이름</label>
                  <input 
                    type="text" 
                    value={editFormData.name} 
                    onChange={e => setEditFormData({...editFormData, name: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>서브 타이틀</label>
                  <textarea 
                    value={editFormData.heroSubtitle} 
                    onChange={e => setEditFormData({...editFormData, heroSubtitle: e.target.value})} 
                  />
                </div>
              </>
            )}

            {editSection === 'about' && (
              <>
                <div className="form-group">
                  <label>소개 문단 1</label>
                  <textarea 
                    value={editFormData.aboutP1} 
                    onChange={e => setEditFormData({...editFormData, aboutP1: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>소개 문단 2</label>
                  <textarea 
                    value={editFormData.aboutP2} 
                    onChange={e => setEditFormData({...editFormData, aboutP2: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>스킬 태그 (쉼표로 구분)</label>
                  <input 
                    type="text" 
                    value={editFormData.skills} 
                    onChange={e => setEditFormData({...editFormData, skills: e.target.value})} 
                  />
                </div>
              </>
            )}

            {editSection === 'projects' && (
              <>
                <div className="form-group">
                  <label>프로젝트 데이터 (JSON 배열)</label>
                  <textarea 
                    style={{minHeight: '400px', fontFamily: 'monospace', fontSize: '0.9rem'}}
                    value={editFormData.projectsJson} 
                    onChange={e => setEditFormData({...editFormData, projectsJson: e.target.value})} 
                  />
                </div>
              </>
            )}

            {editSection === 'contact' && (
              <>
                <div className="form-group">
                  <label>연락처 설명문</label>
                  <textarea 
                    value={editFormData.contactDesc} 
                    onChange={e => setEditFormData({...editFormData, contactDesc: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>이메일 주소</label>
                  <input 
                    type="email" 
                    value={editFormData.contactEmail} 
                    onChange={e => setEditFormData({...editFormData, contactEmail: e.target.value})} 
                  />
                </div>
              </>
            )}

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setEditSection(null)}>취소</button>
              <button className="btn btn-primary" onClick={saveEdit}>
                <Check size={16} /> 저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
