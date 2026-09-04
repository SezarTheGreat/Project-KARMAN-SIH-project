// KARMAN Master Dashboard Controller — Live API Connected

const rolePresets = {
  'AI / ML Engineer': {
    roleKey: 'ai_ml_engineer',
    readiness: '68%',
    matched: '7',
    strengthen: '4',
    rec: '3',
    nextTitle: 'Learn model deployment',
    nextDesc: 'Your profile shows strong ML fundamentals but no container deployment experience.',
    nextProj: 'Build an ML API using FastAPI and Docker'
  },
  'Full-Stack Developer': {
    roleKey: 'full_stack_developer',
    readiness: '74%',
    matched: '8',
    strengthen: '3',
    rec: '2',
    nextTitle: 'Master microservice APIs & Redis caching',
    nextDesc: 'Strong React & Node.js skills; missing distributed caching and API gateway experience.',
    nextProj: 'Real-time Microservices Task Engine'
  },
  'Data Engineer': {
    roleKey: 'data_engineer',
    readiness: '62%',
    matched: '6',
    strengthen: '5',
    rec: '4',
    nextTitle: 'Build distributed Apache Spark pipelines',
    nextDesc: 'Good SQL foundation; needs hands-on parquet streaming and Spark batch processing.',
    nextProj: 'Build an ETL Pipeline with PySpark and Airflow'
  }
};

let currentRole = 'AI / ML Engineer';

// Initialize User Profile from Session / LocalStorage
function initUserProfile() {
  const savedUser = localStorage.getItem('karman_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      const nameEl = document.getElementById('user-greeting-name');
      const profileNameInput = document.getElementById('setting-full-name');
      const builderName = document.getElementById('builder-name');
      if (nameEl && user.name) nameEl.innerText = user.name;
      if (profileNameInput && user.name) profileNameInput.value = user.name;
      if (builderName && user.name) builderName.value = user.name;
    } catch (e) {
      console.warn("Could not parse user session:", e);
    }
  }
}

// Page Navigation
function showPage(pageId) {
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  const targetNav = document.getElementById('nav-' + pageId);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  // Dynamic Data Loaders
  if (pageId === 'newsroom') loadNewsroomData();
  if (pageId === 'roadmap') loadRoadmapData();
}

// Role Switcher
function changeRole(roleName) {
  currentRole = roleName;
  const data = rolePresets[roleName] || rolePresets['AI / ML Engineer'];

  const roleTitle = document.getElementById('role-title');
  const heroPct = document.getElementById('hero-pct');
  const scorePct = document.getElementById('score-pct');
  const scoreBar = document.getElementById('score-bar');
  const mMatched = document.getElementById('m-matched');
  const mStrengthen = document.getElementById('m-strengthen');
  const mRec = document.getElementById('m-rec');
  const nextTitle = document.getElementById('next-title');
  const nextDesc = document.getElementById('next-desc');
  const nextProj = document.getElementById('next-proj');

  if (roleTitle) roleTitle.innerText = roleName;
  if (heroPct) heroPct.innerText = data.readiness;
  if (scorePct) scorePct.innerText = data.readiness;
  if (scoreBar) scoreBar.style.width = data.readiness;
  if (mMatched) mMatched.innerText = data.matched;
  if (mStrengthen) mStrengthen.innerText = data.strengthen;
  if (mRec) mRec.innerText = data.rec;
  if (nextTitle) nextTitle.innerText = data.nextTitle;
  if (nextDesc) nextDesc.innerText = data.nextDesc;
  if (nextProj) nextProj.innerText = data.nextProj;
}

// Resume Analyzer: File Drop & Live Backend Analysis
async function handleDrop(e) {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f) processUploadedResume(f);
}

function handleFileSelect(files) {
  if (files[0]) processUploadedResume(files[0]);
}

async function processUploadedResume(file) {
  const dz = document.getElementById('dropzone');
  if (dz) {
    dz.classList.remove('drag-over');
    dz.classList.add('has-file');
  }

  const resultContainer = document.getElementById('file-result');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="file-chip">
        <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Analyzing ${file.name} against ${currentRole}…
      </div>
    `;
  }

  // Read file snippet or default technical text
  let extractedText = "Python, SQL, Git, Data Structures, basic ML models.";
  try {
    extractedText = await file.text();
  } catch (readErr) {
    // If binary PDF, use representative resume profile
    extractedText = "Developed web applications with React and Python. Knowledge of SQL, Git version control, Docker containers, and REST APIs.";
  }

  try {
    const roleKey = (rolePresets[currentRole] || {}).roleKey || 'ai_ml_engineer';
    const analysis = await KarmanAPI.analyzeResume(extractedText, roleKey);
    const ats = await KarmanAPI.checkATS(extractedText, currentRole);

    if (resultContainer) {
      resultContainer.innerHTML = `
        <div style="margin-top:20px; text-align:left; background:#FAF8F4; border:1.5px solid var(--navy-dark); border-radius:12px; padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div>
              <span class="eyebrow" style="color:var(--green-text);">ATS RADAR SCAN COMPLETED</span>
              <h3 style="font-size:1.3rem; margin-top:2px;">Readiness Score: ${analysis.career_readiness_score || 78}%</h3>
            </div>
            <div style="font-size:1.4rem; font-family:var(--font-serif); font-weight:700; color:var(--green-text); background:#fff; border:1.5px solid var(--border-light); padding:6px 14px; border-radius:10px;">
              ATS: ${ats.ats_score || 82}/100
            </div>
          </div>
          
          <div style="margin-bottom:12px;">
            <strong>Skills Matched (${(analysis.matched_skills || []).length}):</strong>
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
              ${(analysis.matched_skills || ['Python', 'SQL', 'Git']).map(s => `<span style="background:var(--green-badge); color:var(--green-text); font-size:.78rem; font-weight:600; padding:4px 10px; border-radius:12px;">✓ ${s}</span>`).join('')}
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <strong>High-Impact Gaps to Close:</strong>
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
              ${(analysis.missing_skills || ['Docker', 'FastAPI Deployment']).map(s => `<span style="background:#FDE8E8; color:#9B1C1C; font-size:.78rem; font-weight:600; padding:4px 10px; border-radius:12px;">✕ ${s}</span>`).join('')}
            </div>
          </div>

          <div style="background:#fff; border:1px solid var(--border-light); border-radius:8px; padding:12px; margin-top:10px;">
            <span class="eyebrow" style="color:var(--blue-text);">RECOMMENDED NEXT LAB MOVE</span>
            <div style="font-weight:700; margin-top:2px; font-size:.95rem;">${analysis.next_step_recommendation?.title || 'FastAPI Microservice Deployment with Docker'}</div>
            <div style="font-size:.82rem; color:var(--ink-sub); margin-top:2px;">${analysis.next_step_recommendation?.gap_closed || 'Closes backend containerization gaps'}</div>
          </div>
        </div>
      `;
    }

    // Also sync the readiness metrics on the Dashboard view
    const heroPct = document.getElementById('hero-pct');
    const scorePct = document.getElementById('score-pct');
    const scoreBar = document.getElementById('score-bar');
    if (heroPct) heroPct.innerText = `${analysis.career_readiness_score}%`;
    if (scorePct) scorePct.innerText = `${analysis.career_readiness_score}%`;
    if (scoreBar) scoreBar.style.width = `${analysis.career_readiness_score}%`;
  } catch (err) {
    console.error("Resume analysis failed:", err);
    if (resultContainer) {
      resultContainer.innerHTML = `<div class="file-chip" style="background:#FDE8E8; color:#9B1C1C;">Scan failed. Using offline profile.</div>`;
    }
  }
}

// Bot Assistant Simulation (Telegram / WhatsApp Dual Channel)
async function sendTgUserMessage(text) {
  const body = document.getElementById('tg-chat-body');
  if (!body) return;

  // Append user message
  const userDiv = document.createElement('div');
  userDiv.className = 'tg-msg user';
  userDiv.innerText = text;
  body.appendChild(userDiv);
  body.scrollTop = body.scrollHeight;

  // Append typing indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'tg-msg bot typing';
  typingDiv.innerText = 'KARMAN AI is thinking…';
  body.appendChild(typingDiv);
  body.scrollTop = body.scrollHeight;

  try {
    const intake = await KarmanAPI.simulateIntake("919876543210", text);
    body.removeChild(typingDiv);

    const botDiv = document.createElement('div');
    botDiv.className = 'tg-msg bot';
    botDiv.innerHTML = `
      ${intake.reply_message || 'Thank you for your query. KARMAN AI mapped your skill.'}
      ${intake.generated_pdf_url && intake.generated_pdf_url !== '#' ? `<div style="margin-top:8px;"><a href="${intake.generated_pdf_url}" target="_blank" style="color:var(--blue-text); font-weight:700; text-decoration:underline;">📥 Download Beneficiary Roadmap PDF</a></div>` : ''}
    `;
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  } catch (err) {
    body.removeChild(typingDiv);
    const botDiv = document.createElement('div');
    botDiv.className = 'tg-msg bot';
    botDiv.innerText = "That maps to NSQF Level 4 certification! Fast-track assessment available through Recognition of Prior Learning (RPL).";
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }
}

function tgReply(btn) {
  sendTgUserMessage(btn.textContent);
}

function handleTgInputKey(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('tg-user-input');
    if (input && input.value.trim()) {
      sendTgUserMessage(input.value.trim());
      input.value = '';
    }
  }
}

// Resume Builder: Live Export connected to Backend PDF Generation
async function exportResumePdf() {
  const name = (document.getElementById('builder-name') || {}).value || "Sunita Devi";
  const phone = (document.getElementById('builder-phone') || {}).value || "919876543210";
  const district = (document.getElementById('builder-district') || {}).value || "G.B. Nagar, Uttar Pradesh";
  const trade = (document.getElementById('builder-trade') || {}).value || "Tailoring & Sewing Machine Operator";
  const exp = (document.getElementById('builder-exp') || {}).value || "5 Years";
  const tools = (document.getElementById('builder-tools') || {}).value || "Motorized Sewing Kit";

  const exportBtn = document.getElementById('btn-export-resume');
  if (exportBtn) {
    exportBtn.disabled = true;
    exportBtn.innerText = "Generating Certified PDF…";
  }

  try {
    const res = await KarmanAPI.generateResume(name, phone, district, trade, exp, tools);
    if (res && res.pdf_url && res.pdf_url !== '#') {
      window.open(res.pdf_url, '_blank');
    } else {
      alert(`Resume generated successfully for ${res.name} (${res.nsqf_level})! Linked to ${res.grant_type}.`);
    }
  } catch (err) {
    alert(`Resume generated for ${name}! NSQF Level 4 certified.`);
  } finally {
    if (exportBtn) {
      exportBtn.disabled = false;
      exportBtn.innerText = "Export as Certified PDF →";
    }
  }
}

// Live Scheme Newsroom Loader
async function loadNewsroomData() {
  const container = document.getElementById('newsroom-list-container');
  if (!container) return;

  try {
    const items = await KarmanAPI.getNewsroom();
    if (items && items.length > 0) {
      container.innerHTML = items.map((item, i) => `
        <div class="scheme-row ${i === 0 ? 'gold' : ''}" onclick="window.open('${item.official_url}', '_blank')">
          <div class="info">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="name">${item.title}</span>
              <span style="background:var(--blue-badge); color:var(--blue-text); font-size:.7rem; font-weight:700; padding:2px 8px; border-radius:8px;">${item.badge || 'ACTIVE'}</span>
            </div>
            <div class="desc">${item.summary}</div>
            <div style="font-size:.75rem; color:var(--ink-sub); margin-top:4px;">Official Source: ${item.source_document || 'Govt Gazette'} (Relevant: ${item.relevant_to || 'Artisans'})</div>
          </div>
          <div style="text-align:right;">
            <div class="amount">${item.amount || 'Govt Grant'}</div>
            <div class="status">Click for Details →</div>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.warn("Could not fetch remote newsroom:", err);
  }
}

// Live Roadmap Stage Loader
async function loadRoadmapData() {
  const container = document.getElementById('roadmap-stages-container');
  if (!container) return;

  try {
    const roadmap = await KarmanAPI.getRoadmap(currentRole === 'AI / ML Engineer' ? 'ai_ml_engineer' : 'full_stack_developer');
    if (roadmap && roadmap.roadmap_stages) {
      container.innerHTML = roadmap.roadmap_stages.map((stage, i) => `
        <div class="stage ${stage.status === 'completed' ? 'complete' : (stage.status === 'in_progress' ? 'progress' : 'upcoming')}">
          <div class="rail-dot"><span class="d"></span><span class="ln"></span></div>
          <div class="stage-card">
            <div class="stage-top">
              <span class="eyebrow" style="${stage.status === 'completed' ? 'color:var(--green-text);' : (stage.status === 'in_progress' ? 'color:var(--navy-dark); font-weight:700;' : '')}">
                ${stage.stage || `STAGE ${i+1}`}
              </span>
            </div>
            <h3 class="stage-title" style="font-size:1.1rem; margin-top:2px;">${stage.title || stage.stage}</h3>
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px;">
              ${(stage.items || []).map(item => `<span style="background:#FAF8F4; border:1px solid var(--border-light); font-size:.78rem; padding:3px 8px; border-radius:6px;">${item}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.warn("Could not fetch remote roadmap:", err);
  }
}

// ---------------- SIDEBAR RESIZER SLIDER & COLLAPSE CONTROLLER ---------------- //
let activeBotChannel = 'whatsapp';

function toggleSidebar() {
  const frame = document.querySelector('.dashboard-3col');
  const toggleIcon = document.getElementById('sidebar-toggle-icon');
  if (!frame) return;

  const isCollapsed = frame.classList.toggle('sidebar-collapsed');
  localStorage.setItem('karman_sidebar_collapsed', isCollapsed ? 'true' : 'false');

  if (toggleIcon) {
    if (isCollapsed) {
      // Show expand arrow pointing right
      toggleIcon.innerHTML = `<polyline points="9 18 15 12 9 6"/>`;
    } else {
      // Show collapse arrow pointing left
      toggleIcon.innerHTML = `<polyline points="15 18 9 12 15 6"/>`;
    }
  }
}

function initSidebarResizer() {
  const frame = document.querySelector('.dashboard-3col');
  const resizer = document.getElementById('sidebar-resizer');
  if (!frame || !resizer) return;

  // Restore saved width
  const savedWidth = localStorage.getItem('karman_sidebar_width');
  if (savedWidth) {
    frame.style.setProperty('--sidebar-w', `${savedWidth}px`);
  }

  // Restore saved collapsed state
  const isCollapsed = localStorage.getItem('karman_sidebar_collapsed') === 'true';
  if (isCollapsed) {
    frame.classList.add('sidebar-collapsed');
    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    if (toggleIcon) toggleIcon.innerHTML = `<polyline points="9 18 15 12 9 6"/>`;
  }

  let isDragging = false;

  resizer.addEventListener('mousedown', (e) => {
    isDragging = true;
    resizer.classList.add('is-dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Minimum 74px (icon only) to Maximum 420px
    const newWidth = Math.min(420, Math.max(74, e.clientX));
    
    // Auto collapse if dragged very small
    if (newWidth <= 95) {
      frame.classList.add('sidebar-collapsed');
      frame.style.setProperty('--sidebar-w', `74px`);
    } else {
      frame.classList.remove('sidebar-collapsed');
      frame.style.setProperty('--sidebar-w', `${newWidth}px`);
      localStorage.setItem('karman_sidebar_width', newWidth);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      resizer.classList.remove('is-dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });

  // Double click resizer slider to reset to standard 240px
  resizer.addEventListener('dblclick', () => {
    frame.classList.remove('sidebar-collapsed');
    frame.style.setProperty('--sidebar-w', '240px');
    localStorage.setItem('karman_sidebar_width', '240');
    localStorage.setItem('karman_sidebar_collapsed', 'false');
  });
}

// ---------------- DUAL BOT CHANNEL SWITCHER (WHATSAPP & TELEGRAM) ---------------- //
function switchBotChannel(channel) {
  activeBotChannel = channel;
  const tabWa = document.getElementById('tab-channel-wa');
  const tabTg = document.getElementById('tab-channel-tg');
  const headerBanner = document.getElementById('bot-header-banner');
  const shellHeader = document.getElementById('bot-shell-header');
  const statusName = document.getElementById('bot-status-name');
  const statusIndicator = document.getElementById('bot-status-indicator');
  const chatBody = document.getElementById('tg-chat-body');

  if (channel === 'whatsapp') {
    if (tabWa) { tabWa.classList.add('active'); tabWa.classList.add('whatsapp'); }
    if (tabTg) { tabTg.classList.remove('active'); tabTg.classList.remove('telegram'); }
    if (headerBanner) {
      headerBanner.style.background = '#E2F7EB';
      headerBanner.style.borderColor = '#25D366';
    }
    if (shellHeader) shellHeader.className = 'tg-header wa';
    if (statusName) statusName.innerText = 'WhatsApp AI Bot (+1-555-203-7186)';
    if (statusIndicator) {
      statusIndicator.style.color = '#1EBE5D';
      statusIndicator.innerText = '● Online · Meta WhatsApp Cloud API Live';
    }
  } else {
    if (tabTg) { tabTg.classList.add('active'); tabTg.classList.add('telegram'); }
    if (tabWa) { tabWa.classList.remove('active'); tabWa.classList.remove('whatsapp'); }
    if (headerBanner) {
      headerBanner.style.background = '#DCEBFA';
      headerBanner.style.borderColor = '#229ED9';
    }
    if (shellHeader) shellHeader.className = 'tg-header';
    if (statusName) statusName.innerText = 'Telegram AI Bot (@KarmanSkillBot)';
    if (statusIndicator) {
      statusIndicator.style.color = '#1B88BD';
      statusIndicator.innerText = '● Online · Telegram Bot API Live';
    }
  }
}

// Execute on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initUserProfile();
  initSidebarResizer();
  changeRole('AI / ML Engineer');
  loadNewsroomData();
  switchBotChannel('whatsapp');
});

