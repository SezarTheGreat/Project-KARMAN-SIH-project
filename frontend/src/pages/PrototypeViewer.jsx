import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrototypeViewer() {
  const [siteView, setSiteView] = useState('app'); // 'landing', 'login', 'app'
  const [activePage, setActivePage] = useState('dashboard'); // 'dashboard', 'analyzer', 'projects', 'roadmap', 'newsroom', 'telegram', 'builder', 'settings'
  const [newsFilter, setNewsFilter] = useState('All');
  const [selectedRole, setSelectedRole] = useState('AI / ML Engineer');
  const [droppedFile, setDroppedFile] = useState(null);

  // Sidebar Resizer Slider & Collapse States
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeBotChannel, setActiveBotChannel] = useState('whatsapp'); // 'whatsapp' | 'telegram'

  const handleResizerMouseDown = (e) => {
    e.preventDefault();
    const onMouseMove = (moveEvent) => {
      const newWidth = Math.min(420, Math.max(74, moveEvent.clientX));
      if (newWidth <= 95) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
        setSidebarWidth(newWidth);
      }
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Settings Toggles
  const [settings, setSettings] = useState({
    name: 'Arjun Mehta',
    role: 'AI / ML Engineer',
    roadmapAlerts: true,
    newsroomDigest: true,
    telegramSync: false
  });

  // Role Switcher Data
  const rolePresets = {
    'AI / ML Engineer': {
      readiness: '68%',
      matched: '7',
      strengthen: '4',
      rec: '3',
      nextTitle: 'Learn model deployment',
      nextDesc: 'Your profile shows strong ML fundamentals but no container deployment experience.',
      nextProj: 'Build an ML API using FastAPI and Docker'
    },
    'Full-Stack Developer': {
      readiness: '74%',
      matched: '8',
      strengthen: '3',
      rec: '2',
      nextTitle: 'Master microservice APIs & Redis caching',
      nextDesc: 'Strong React & Node.js skills; missing distributed caching and API gateway experience.',
      nextProj: 'Build an ETL Pipeline with PySpark and Airflow'
    },
    'Data Engineer': {
      readiness: '62%',
      matched: '6',
      strengthen: '5',
      rec: '4',
      nextTitle: 'Build distributed Apache Spark pipelines',
      nextDesc: 'Good SQL foundation; needs hands-on parquet streaming and Spark batch processing.',
      nextProj: 'Build an ETL Pipeline with PySpark and Airflow'
    }
  };

  const currentRole = rolePresets[selectedRole] || rolePresets['AI / ML Engineer'];

  // Telegram Messages State
  const [telegramMessages, setTelegramMessages] = useState([
    { sender: 'bot', text: 'Namaste 🙏 Tell me about a skill you already practice — even informally — and I\'ll match it to a certified trade.' },
    { sender: 'user', text: 'I\'ve been fixing two-wheelers for 6 years, no certificate.' },
    { sender: 'bot', text: 'That maps closely to NSQF Level 4 — Two & Three Wheeler Service Technician. Fast-track via RPL — no cost, ~2 weeks.' }
  ]);

  const sendTgReply = (text) => {
    setTelegramMessages((prev) => [...prev, { sender: 'user', text }]);
    setTimeout(() => {
      setTelegramMessages((prev) => [
        ...prev,
        { sender: 'bot', text: `Thanks! I've noted your request "${text}". Your RPL application has been prioritized.` }
      ]);
    }, 800);
  };

  // Schemes Data
  const schemesData = [
    { id: 1, name: 'PM-AJAY — Equipment grant', category: 'Equipment grant', desc: 'One-time support for tools and machinery, once a trade has been matched and verified through NSQF.', amount: 'Up to ₹50,000', status: 'Open', gold: true },
    { id: 2, name: 'Recognition of Prior Learning (RPL)', category: 'Certification', desc: 'Fast-track certification for artisans with two or more years of informal experience.', amount: 'No cost', status: 'Open', gold: false },
    { id: 3, name: 'PM-AJAY — Group enterprise assistance', category: 'Group support', desc: 'Support for artisan collectives of five or more registering under the same certified trade.', amount: 'Up to ₹2,00,000', status: 'Closing 30 Sept', gold: true }
  ];

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setDroppedFile(e.dataTransfer.files[0].name);
    }
  };

  return (
    <div className="font-sans text-[#162035] bg-[#EAE6DF] min-h-screen">
      
      {/* ============================================================= VIEW 1: LANDING PAGE ============================================================= */}
      {siteView === 'landing' && (
        <div id="view-landing" className="site-view active">
          <header className="site-header">
            <div className="site-header-inner">
              <div className="site-brand" onClick={() => setSiteView('landing')}>
                <span className="logo-badge">K</span> KARMAN
              </div>
              <nav className="site-nav">
                <a href="#features">Features</a>
                <a href="#how-it-works">How it works</a>
                <a href="#schemes">Schemes</a>
                <a href="#stories">Stories</a>
              </nav>
              <div className="site-header-cta">
                <button className="btn-ghost" onClick={() => setSiteView('login')}>Sign In</button>
                <button className="btn-navy-pill" onClick={() => setSiteView('login')}>Get Started →</button>
              </div>
            </div>
          </header>

          <section className="hero-section">
            <div>
              <span className="hero-eyebrow eyebrow">🎓 BUILT FOR SIH · SKILL-TO-CAREER MAPPING</span>
              <h1>Turn what you already know into a <em>career, not a guess.</em></h1>
              <p className="sub">KARMAN maps your informal skills and coursework to real NSQF trades and job-ready roles, then hands you a readiness score, a roadmap, and the exact next project to build.</p>
              <div className="hero-cta-row">
                <button className="btn-hero-primary" onClick={() => setSiteView('login')}>Start Your Roadmap →</button>
                <button className="btn-ghost" onClick={() => setSiteView('app')}>See a Live Demo</button>
              </div>
              <div className="hero-trust">
                <span>✓ FREE FOR STUDENTS</span><span>✓ RPL VERIFIED</span><span>✓ GOVT. SCHEME LINKED</span>
              </div>
            </div>

            <div className="hero-visual">
              <img src="/images/study_hero.jpg" alt="Student study illustration" className="hero-illustration-img" />
              <div className="hero-card-stack">
                <span className="eyebrow">CAREER READINESS SCORE</span>
                <h2 style={{ fontSize: '2.2rem', marginTop: '6px' }}>68%</h2>
                <div className="progress-track" style={{ marginTop: '14px' }}>
                  <span style={{ width: '68%' }}></span>
                </div>
                <div className="stat-mini-row">
                  <div className="stat-mini"><div className="num" style={{ color: 'var(--green-text)' }}>7</div><div className="lbl">Matched</div></div>
                  <div className="stat-mini"><div className="num" style={{ color: '#8c651f' }}>4</div><div className="lbl">To Grow</div></div>
                  <div className="stat-mini"><div className="num" style={{ color: 'var(--navy-dark)' }}>3</div><div className="lbl">Projects</div></div>
                </div>
              </div>
            </div>
          </section>

          <div className="logo-strip">
            <div className="logo-strip-item"><span>NSQF Aligned</span></div>
            <div className="logo-strip-item"><span>PMKVY Linked</span></div>
            <div className="logo-strip-item"><span>PM-AJAY Schemes</span></div>
            <div className="logo-strip-item"><span>Skill India</span></div>
            <div className="logo-strip-item"><span>Built for SIH 2026</span></div>
          </div>
        </div>
      )}

      {/* ============================================================= VIEW 2: LOGIN ============================================================= */}
      {siteView === 'login' && (
        <div id="view-login" className="site-view active">
          <div className="login-shell">
            <div className="login-card">
              <div className="site-brand"><span className="logo-badge">K</span> KARMAN</div>
              <p className="sub">Sign in to your career workspace</p>

              <form onSubmit={(e) => { e.preventDefault(); setSiteView('app'); }}>
                <div className="login-field">
                  <label htmlFor="login-email">Email</label>
                  <input id="login-email" type="email" defaultValue="you@example.com" required />
                </div>
                <div className="login-field">
                  <label htmlFor="login-pass">Password</label>
                  <input id="login-pass" type="password" defaultValue="••••••••" required />
                </div>
                <button type="submit" className="btn-login-submit">Sign In →</button>
              </form>

              <p className="login-footer-note">
                <a onClick={() => setSiteView('landing')}>← Back to home</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= VIEW 3: APP WORKSPACE ============================================================= */}
      {siteView === 'app' && (
        <div id="view-app" className="site-view active">
          <div className="dash-frame-wrapper">
            <div 
              className={`dashboard-3col ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
              style={{ '--sidebar-w': isSidebarCollapsed ? '74px' : `${sidebarWidth}px` }}
            >
              
              {/* 1. SIDEBAR WITH DRAGGABLE RESIZER SLIDER */}
              <aside className="dash-left-sidebar" style={{ width: '100%', position: 'relative' }}>
                <div 
                  className="sidebar-resizer" 
                  onMouseDown={handleResizerMouseDown}
                  onDoubleClick={() => { setSidebarWidth(240); setIsSidebarCollapsed(false); }}
                  title="Drag to resize sidebar width (Double click to reset)"
                />

                <div>
                  <div className="sidebar-brand-row">
                    <div className="sidebar-brand" onClick={() => setSiteView('landing')} style={{ cursor: 'pointer' }}>
                      <span className="logo-badge">K</span>
                      {!isSidebarCollapsed && <span>KARMAN</span>}
                    </div>
                    <button 
                      className="btn-sidebar-toggle" 
                      onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                      title="Toggle Sidebar Collapse"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        {isSidebarCollapsed ? <polyline points="9 18 15 12 9 6"/> : <polyline points="15 18 9 12 15 6"/>}
                      </svg>
                    </button>
                  </div>

                  <nav className="sidebar-menu">
                    <button className={`sidebar-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')}>
                      <span>Dashboard</span>
                    </button>
                    <button className={`sidebar-item ${activePage === 'analyzer' ? 'active' : ''}`} onClick={() => setActivePage('analyzer')}>
                      <span>Resume Analyzer</span>
                    </button>
                    <button className={`sidebar-item ${activePage === 'projects' ? 'active' : ''}`} onClick={() => setActivePage('projects')}>
                      <span>Project Lab</span>
                    </button>
                    <button className={`sidebar-item ${activePage === 'roadmap' ? 'active' : ''}`} onClick={() => setActivePage('roadmap')}>
                      <span>Career Roadmap</span>
                    </button>
                    <button className={`sidebar-item ${activePage === 'newsroom' ? 'active' : ''}`} onClick={() => setActivePage('newsroom')}>
                      <span>Scheme Newsroom</span>
                    </button>
                    <button className={`sidebar-item ${activePage === 'telegram' ? 'active' : ''}`} onClick={() => setActivePage('telegram')}>
                      <span>Bot Assistant</span>
                    </button>
                    <button className={`sidebar-item ${activePage === 'builder' ? 'active' : ''}`} onClick={() => setActivePage('builder')}>
                      <span>Resume Builder</span>
                    </button>
                    <button className={`sidebar-item ${activePage === 'settings' ? 'active' : ''}`} onClick={() => setActivePage('settings')}>
                      <span>Settings</span>
                    </button>
                  </nav>

                  {/* Direct Bot Links */}
                  {!isSidebarCollapsed && (
                    <div className="sidebar-channel-section">
                      <span className="lbl-tiny">Live Connected Bots</span>
                      <div className="sidebar-channel-links">
                        <a href="https://wa.me/15552037186?text=Namaste%20Project%20KARMAN" target="_blank" rel="noreferrer" className="channel-link-item wa" title="Open official WhatsApp Bot">
                          <span>WhatsApp Bot</span>
                          <span style={{ fontSize: '.68rem', background: '#E2F7EB', color: '#1EBE5D', padding: '2px 6px', borderRadius: '6px' }}>LIVE ↗</span>
                        </a>
                        <a href="https://t.me/KarmanSkillBot" target="_blank" rel="noreferrer" className="channel-link-item tg" title="Open official Telegram Bot">
                          <span>Telegram Bot</span>
                          <span style={{ fontSize: '.68rem', background: '#E6EEF7', color: '#1B88BD', padding: '2px 6px', borderRadius: '6px' }}>LIVE ↗</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="sidebar-logout">
                  <button className="sidebar-item" onClick={() => setSiteView('landing')}>
                    <span>Sign Out</span>
                  </button>
                </div>
              </aside>

              {/* 2. CENTER MAIN WORKSPACE */}
              <main className="dash-center-main">
                <div className="center-topbar">
                  <div className="search-input-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input placeholder="Search skills, projects, schemes..." />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePage}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    
                    {/* PAGE 1: DASHBOARD */}
                    {activePage === 'dashboard' && (
                      <div>
                        <div className="center-hero-banner">
                          <div>
                            <span className="eyebrow" style={{ color: '#2D3A54' }}>CAREER WORKSPACE</span>
                            <h2>Good Morning, Arjun</h2>
                            <p>Welcome back! Your career readiness score is <strong>{currentRole.readiness}</strong>.</p>
                            <button className="btn-banner" onClick={() => setActivePage('roadmap')}>View Career Roadmap →</button>
                          </div>
                          <img src="/images/study_hero.jpg" alt="Student artwork" className="hero-img-element" />
                        </div>

                        <div className="ov-grid" style={{ marginBottom: '28px' }}>
                          <div className="card" style={{ border: '2px solid var(--navy-dark)' }}>
                            <div className="role-row">
                              <div>
                                <span className="eyebrow">TARGET CAREER ROLE</span>
                                <h2>{selectedRole}</h2>
                              </div>
                              <select className="select-fake" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                                <option value="AI / ML Engineer">AI / ML Engineer</option>
                                <option value="Full-Stack Developer">Full-Stack Developer</option>
                                <option value="Data Engineer">Data Engineer</option>
                              </select>
                            </div>
                            <div className="readiness-row">
                              <span style={{ fontWeight: 600, fontSize: '.95rem' }}>Career Readiness Score</span>
                              <span className="pct">{currentRole.readiness}</span>
                            </div>
                            <div className="progress-track" style={{ marginTop: '9px' }}>
                              <span style={{ width: currentRole.readiness }}></span>
                            </div>
                            <div className="stat-mini-row">
                              <div className="stat-mini"><div className="num" style={{ color: 'var(--green-text)' }}>{currentRole.matched}</div><div className="lbl">Skills Matched</div></div>
                              <div className="stat-mini"><div className="num" style={{ color: '#8c651f' }}>{currentRole.strengthen}</div><div className="lbl">To Grow</div></div>
                              <div className="stat-mini"><div className="num" style={{ color: 'var(--navy-dark)' }}>{currentRole.rec}</div><div className="lbl">Projects Rec.</div></div>
                            </div>
                          </div>

                          <div className="next-move">
                            <span className="eyebrow">YOUR NEXT MOVE</span>
                            <h3>{currentRole.nextTitle}</h3>
                            <p>{currentRole.nextDesc}</p>
                            <div className="nested"><span className="eyebrow">Recommended project</span><span className="nt">{currentRole.nextProj}</span></div>
                            <button className="btn-yellow-pill" style={{ marginTop: '18px', alignSelf: 'flex-start' }} onClick={() => setActivePage('projects')}>Start Project Lab →</button>
                          </div>
                        </div>

                        {/* ROADMAP TIMELINE STAGE TRACK */}
                        <div className="table-card" style={{ marginBottom: '28px' }}>
                          <div className="table-head-row">
                            <h4 style={{ fontSize: '1.05rem' }}>Career Roadmap Timeline</h4>
                            <button className="btn-navy-pill" style={{ padding: '4px 12px', fontSize: '.75rem' }} onClick={() => setActivePage('roadmap')}>Full Roadmap →</button>
                          </div>
                          <div className="stage complete" style={{ marginBottom: '12px' }}>
                            <div className="rail-dot"><span className="d"></span><span className="ln"></span></div>
                            <div className="stage-card">
                              <span className="eyebrow" style={{ color: 'var(--green-text)' }}>✓ STAGE 1 · COMPLETED (4 WEEKS)</span>
                              <h3 style={{ fontSize: '1.1rem', marginTop: '2px' }}>Core Programming &amp; Database Foundation</h3>
                              <p style={{ fontSize: '.86rem', color: 'var(--ink-sub)', marginTop: '4px' }}>Python, SQL, Git &amp; Github workflows.</p>
                            </div>
                          </div>
                          <div className="stage progress">
                            <div className="rail-dot"><span className="d"></span><span className="ln"></span></div>
                            <div className="stage-card">
                              <span className="eyebrow" style={{ color: 'var(--navy-dark)' }}>● STAGE 2 · IN PROGRESS (EST. 6 WEEKS)</span>
                              <h3 style={{ fontSize: '1.1rem', marginTop: '2px' }}>Applied Machine Learning &amp; Algorithm Optimization</h3>
                              <p style={{ fontSize: '.86rem', color: 'var(--ink-sub)', marginTop: '4px' }}>Scikit-learn models, ML API Dockerization, Data Structures.</p>
                            </div>
                          </div>
                        </div>

                        {/* SCHEME NEWSROOM CARDS */}
                        <div className="embedded-newsroom">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                            <div>
                              <span className="eyebrow" style={{ color: 'var(--blue-text)' }}>SCHEME NEWSROOM</span>
                              <h2 style={{ fontSize: '1.5rem', marginTop: '2px' }}>Policy Guidelines &amp; Grants</h2>
                            </div>
                            <button className="btn-navy-pill" style={{ padding: '4px 12px', fontSize: '.75rem' }} onClick={() => setActivePage('newsroom')}>View All Schemes</button>
                          </div>
                          <div className="scheme-row gold">
                            <div className="info"><div className="name">PM-AJAY — Equipment grant</div><div className="desc">One-time support for tools and machinery once verified through NSQF.</div></div>
                            <div className="amount">Up to ₹50,000</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PAGE 2: RESUME ANALYZER */}
                    {activePage === 'analyzer' && (
                      <div>
                        <div style={{ background: 'var(--blue-badge)', border: '1.5px solid var(--navy-dark)', borderRadius: '16px', padding: '28px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                          <div>
                            <span className="eyebrow" style={{ color: 'var(--blue-text)', fontWeight: 600 }}>RESUME ANALYZER</span>
                            <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>Resume Skill Gap &amp; ATS Radar</h2>
                            <p style={{ color: 'var(--ink-sub)', fontSize: '.9rem', marginTop: '6px' }}>Upload your resume to map missing skills directly against target role specifications.</p>
                          </div>
                          <img src="/images/todo_sketch.jpg" alt="Task list illustration" style={{ width: '110px', height: '110px', objectFit: 'contain', borderRadius: '12px' }} />
                        </div>
                        <div
                          className="table-card dropzone"
                          style={{ borderStyle: 'dashed', textAlign: 'center', padding: '36px' }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleFileDrop}
                        >
                          <h4>Drop Your Resume File Here</h4>
                          <p style={{ fontSize: '.84rem', color: 'var(--ink-sub)', margin: '6px 0 16px' }}>PDF, DOCX formats supported · max 5MB.</p>
                          <button className="btn-navy-pill" onClick={() => document.getElementById('resume-upload').click()}>Upload Resume File</button>
                          <input type="file" id="resume-upload" accept=".pdf,.docx" style={{ display: 'none' }} onChange={(e) => e.target.files[0] && setDroppedFile(e.target.files[0].name)} />
                          {droppedFile && <div className="file-chip" style={{ marginTop: '14px' }}>✓ {droppedFile} — analyzing…</div>}
                        </div>
                      </div>
                    )}

                    {/* PAGE 3: PROJECT LAB */}
                    {activePage === 'projects' && (
                      <div>
                        <div style={{ background: 'var(--navy-dark)', color: '#fff', borderRadius: '16px', padding: '28px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                          <div>
                            <span className="eyebrow" style={{ color: 'var(--yellow-hero)' }}>HANDS-ON LAB</span>
                            <h2 style={{ fontSize: '1.8rem', marginTop: '4px', color: '#fff' }}>Applied Skill Projects &amp; Collaborative Pods</h2>
                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '.88rem', marginTop: '6px' }}>Join peer project pods to build real production-ready artifacts together.</p>
                          </div>
                          <img src="/images/team_table.jpg" alt="Team round table illustration" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '14px', border: '2px solid var(--yellow-hero)' }} />
                        </div>
                        <div className="table-card">
                          <h4>1. ML Model API with FastAPI &amp; Docker</h4>
                          <p style={{ fontSize: '.86rem', color: 'var(--ink-sub)', marginTop: '4px' }}>Build and containerize a REST API predicting model metrics.</p>
                          <button className="btn-navy-pill" style={{ marginTop: '12px' }}>Start Project Milestone →</button>
                        </div>
                      </div>
                    )}

                    {/* PAGE 4: ROADMAP */}
                    {activePage === 'roadmap' && (
                      <div>
                        <div style={{ background: 'var(--yellow-hero)', border: '2px solid var(--navy-dark)', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
                          <span className="eyebrow" style={{ color: 'var(--navy-dark)' }}>ROADMAP TIMELINE</span>
                          <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>Career Pathway</h2>
                        </div>
                        <div className="table-card">
                          <h4>Full Milestone Pathway</h4>
                          <p style={{ fontSize: '.86rem', color: 'var(--ink-sub)', marginTop: '4px' }}>Stage 1 ➔ Stage 2 ➔ Stage 3 ➔ Production Shipping</p>
                        </div>
                      </div>
                    )}

                    {/* PAGE 5: SCHEME NEWSROOM */}
                    {activePage === 'newsroom' && (
                      <div>
                        <div style={{ background: 'var(--navy-dark)', color: '#fff', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
                          <span className="eyebrow" style={{ color: 'var(--yellow-hero)' }}>POLICY NEWSROOM</span>
                          <h2 style={{ fontSize: '1.8rem', marginTop: '4px', color: '#fff' }}>Government Guidelines &amp; Grants</h2>
                        </div>
                        {schemesData.map((s) => (
                          <div key={s.id} className="scheme-row">
                            <div className="info"><div className="name">{s.name}</div><div className="desc">{s.desc}</div></div>
                            <div className="amount">{s.amount}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* PAGE 6: BOT ASSISTANT (WHATSAPP & TELEGRAM DUAL CHANNEL) */}
                    {activePage === 'telegram' && (
                      <div>
                        <div 
                          style={{ 
                            background: activeBotChannel === 'whatsapp' ? '#e2f7eb' : '#dcebfa', 
                            border: `1.5px solid ${activeBotChannel === 'whatsapp' ? '#25d366' : 'var(--blue-text)'}`, 
                            borderRadius: '16px', 
                            padding: '24px 28px', 
                            marginBottom: '20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            gap: '20px' 
                          }}
                        >
                          <div>
                            <span className="eyebrow" style={{ color: activeBotChannel === 'whatsapp' ? '#1ebe5d' : 'var(--blue-text)' }}>
                              MULTILINGUAL AI ASSISTANT
                            </span>
                            <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>
                              {activeBotChannel === 'whatsapp' ? 'WhatsApp AI Bot (+1-555-203-7186)' : 'Telegram AI Bot (@KarmanSkillBot)'}
                            </h2>
                            <p style={{ color: '#3a4763', marginTop: '6px', fontSize: '.9rem' }}>
                              Voice-first &amp; text check-ins for beneficiaries who would rather talk than type — synced live.
                            </p>
                          </div>
                          <img src="/images/cat_bot.jpg" alt="Bot mascot" style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '50%', border: '2px solid var(--navy-dark)', background: '#fff' }} />
                        </div>

                        {/* Channel Switcher Tabs */}
                        <div className="channel-switcher">
                          <button 
                            className={`channel-tab ${activeBotChannel === 'whatsapp' ? 'active whatsapp' : ''}`}
                            onClick={() => setActiveBotChannel('whatsapp')}
                          >
                            <span>WhatsApp Bot (+1-555-203-7186)</span>
                          </button>
                          <button 
                            className={`channel-tab ${activeBotChannel === 'telegram' ? 'active telegram' : ''}`}
                            onClick={() => setActiveBotChannel('telegram')}
                          >
                            <span>Telegram Bot (@KarmanSkillBot)</span>
                          </button>
                          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                            <a href="https://wa.me/15552037186?text=Namaste%20Project%20KARMAN" target="_blank" rel="noreferrer" className="btn-whatsapp-pill">
                              Open in WhatsApp ↗
                            </a>
                            <a href="https://t.me/KarmanSkillBot" target="_blank" rel="noreferrer" className="btn-telegram-pill">
                              Open in Telegram ↗
                            </a>
                          </div>
                        </div>

                        <div className="tg-shell">
                          <div className={`tg-header ${activeBotChannel === 'whatsapp' ? 'wa' : ''}`}>
                            <div className="tg-header-left">
                              <img src="/images/cat_bot.jpg" alt="Avatar" className="tg-avatar-img" />
                              <div>
                                <h5 style={{ fontSize: '.92rem', fontWeight: 700 }}>
                                  {activeBotChannel === 'whatsapp' ? 'WhatsApp Assistant' : 'KarmanSkillBot'}
                                </h5>
                                <span style={{ fontSize: '.72rem', color: activeBotChannel === 'whatsapp' ? '#1ebe5d' : 'var(--green-text)', fontWeight: 600 }}>
                                  ● online · replies in seconds
                                </span>
                              </div>
                            </div>
                            <span style={{ fontSize: '.74rem', background: '#fff', border: '1px solid var(--border-light)', padding: '3px 10px', borderRadius: '12px', fontFamily: 'var(--font-mono)' }}>
                              v3.2 Live
                            </span>
                          </div>
                          <div className="tg-body">
                            {telegramMessages.map((m, idx) => (
                              <div key={idx} className={`tg-msg ${m.sender === 'user' ? `user ${activeBotChannel === 'whatsapp' ? 'wa' : ''}` : 'bot'}`}>
                                {m.text}
                              </div>
                            ))}
                          </div>
                          <div className="tg-quick-replies">
                            <button onClick={() => sendTgReply('Start RPL application')}>Start RPL application</button>
                            <button onClick={() => sendTgReply('Find nearby center')}>Find nearby center</button>
                            <button onClick={() => sendTgReply('Talk to a human')}>Talk to a human</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PAGE 7: RESUME BUILDER */}
                    {activePage === 'builder' && (
                      <div>
                        <div style={{ background: '#fff', border: '1.5px solid var(--border-light)', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
                          <span className="eyebrow" style={{ color: 'var(--navy-dark)' }}>RESUME BUILDER</span>
                          <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>Build a resume the roadmap already knows</h2>
                        </div>
                        <div className="builder-layout">
                          <div>
                            <div className="builder-section"><span className="sec-label">01 · Auto-filled</span><h4 style={{ fontSize: '.95rem', marginTop: '2px' }}>Contact &amp; Summary</h4></div>
                            <div className="builder-section"><span className="sec-label">02 · From Roadmap</span><h4 style={{ fontSize: '.95rem', marginTop: '2px' }}>Skills Matched (7)</h4></div>
                            <button className="btn-navy-pill" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} onClick={() => alert('Exporting PDF…')}>Export as PDF →</button>
                          </div>
                          <div>
                            <div className="builder-preview">
                              <h3>Arjun Mehta</h3>
                              <span style={{ fontSize: '.74rem', color: 'var(--blue-text)', fontWeight: 600 }}>Target: AI / ML Engineer</span>
                              <div className="pv-line" style={{ marginTop: '14px' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PAGE 8: SETTINGS */}
                    {activePage === 'settings' && (
                      <div>
                        <div style={{ background: '#fff', border: '1.5px solid var(--border-light)', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
                          <span className="eyebrow" style={{ color: 'var(--navy-dark)' }}>SETTINGS</span>
                          <h2 style={{ fontSize: '1.8rem', marginTop: '4px' }}>Account Settings</h2>
                        </div>
                        <div className="settings-grid">
                          <div className="settings-row">
                            <div className="meta"><strong>Full name</strong><span>Shown on your resume and roadmap ticket</span></div>
                            <input className="field-input" style={{ maxWidth: '220px' }} value={settings.name} onChange={(e) => setSettings({ ...settings, name: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </main>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
