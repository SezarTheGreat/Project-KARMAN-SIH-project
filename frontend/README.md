# 🚀 Project KARMAN — Frontend Web & Dashboard

> **Empowering Rural Artisans & Engineering Students with AI-driven Career Roadmaps, Intake Simulators & Multi-Channel Chatbots**

[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📌 Overview

**Project KARMAN** provides an accessible, bilingual career acceleration and intake workflow platform designed for the **Smart India Hackathon (SIH)**. The frontend delivers a split-demographic experience:

1. **Student Hub**: AI ATS Resume Analyzer, Dynamic Resume Builder, Skill-Gap heatmaps, and personalized Roadmap generation with exportable PDF milestones.
2. **Worker & Artisan Studio**: Multi-lingual voice intake, scheme eligibility radar (PM-Vishwakarma, Mudra, etc.), local artisan newsroom, and instant job discovery.
3. **Omni-Channel Connectors**: Integrated direct bridges to WhatsApp & Telegram automated intake bots.

---

## ✨ Key Frontend Features

### 🎛️ 1. Dynamic Draggable & Collapsible Sidebar
- **Smooth Drag Resizing**: Left sidebar resizes smoothly between `74px` and `420px` via a dedicated resizer handle (`#sidebar-resizer`).
- **Double-Click Reset**: Instant reset back to standard width (`280px`).
- **1-Click Collapse / Expand**: Toggle button (`#btn-sidebar-toggle`) collapses the sidebar into an icon-only rail (`74px`), with state remembered via `localStorage`.

### 🤖 2. In-App Dual Bot Channels & Direct Deep Links
- **WhatsApp Cloud Bridge**: Direct launch to [`+1-555-203-7186`](https://wa.me/15552037186?text=Namaste%20Project%20KARMAN) with pre-filled handshake payload.
- **Telegram Bot Bridge**: Instant connect to [`@projectkarmancareerguidancebot`](https://t.me/projectkarmancareerguidancebot).
- **Dual In-App Tabs**: Switch between WhatsApp and Telegram channel simulations with color-coded UI badges.

### ⚡ 3. Real Backend API Integration
Pre-configured to automatically query local FastAPI (`http://localhost:8000`) and fallback to production cloud (`https://sih-work.onrender.com`):
- `/api/student/analyze-resume` — Multi-point ATS scoring & grammar checks
- `/api/ats-checker` — Keyword density & formatting validation
- `/api/generate-resume` — Dynamic HTML-to-PDF resume generation
- `/api/student/career-roadmap` — Step-by-step role-transition roadmap with milestones
- `/api/simulate-intake` — Live voice-to-structured artisan intake
- `/api/worker/newsroom` — Real-time government scheme updates

---

## 🛠️ Tech Stack & Architecture

- **Build Tool**: Vite 4.4
- **UI Library**: React 18 with React Router DOM v6
- **Styling**: Tailwind CSS 3.3 + Custom CSS variables (`--sidebar-w`)
- **Icons**: Lucide React
- **Motion & Transitions**: Framer Motion
- **Design System**:
  - 🌻 Sunflower Gold: `#F4C542`
  - 🌌 Midnight Navy: `#162035`
  - 📜 Paper Cream: `#FBF8F1`
  - 🟢 WhatsApp Green: `#25D366`
  - 🔵 Telegram Blue: `#229ED9`

---

## 📂 Directory Structure

```plaintext
frontend/
├── public/
│   ├── images/              # Illustration assets (study_hero, cat_bot, team_table, todo_sketch)
│   ├── dashboard.html       # Standalone multi-feature dashboard
│   ├── index.html           # Standalone landing page
│   ├── login.html           # Standalone login
│   ├── register.html        # Standalone registration
│   ├── styles.css           # Global stylesheet with responsive variables
│   ├── dashboard.js         # Core dashboard interactions & endpoint drivers
│   └── api.js               # Dual-endpoint API fetch helper
├── src/
│   ├── components/          # Reusable UI cards, Modals, Navbars
│   │   ├── ApplicantCard.jsx
│   │   ├── KPICards.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RAGTraceModal.jsx
│   │   ├── SimulateIntakeModal.jsx
│   │   └── StudentNavbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication session state
│   ├── pages/               # Route views
│   │   ├── ATSChecker.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── PrototypeViewer.jsx  # Unified prototype with sidebar sliders & bot switchers
│   │   ├── Register.jsx
│   │   ├── ResumeBuilder.jsx
│   │   ├── Schemes.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentRoadmap.jsx
│   │   └── WorkerDashboard.jsx
│   ├── App.jsx              # App root & route definitions
│   ├── index.css            # Tailwind directives & theme definitions
│   └── main.jsx             # React entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Creates an optimized, tree-shaken production bundle inside `dist/`.

### Preview Build
```bash
npm run preview
```

---

## 🔗 Environment & API Endpoints

The frontend automatically communicates with the backend on `http://localhost:8000`. To point to a custom deployment, set in your `.env`:

```env
VITE_API_URL=https://sih-work.onrender.com
VITE_WHATSAPP_BOT_URL=https://wa.me/15552037186
VITE_TELEGRAM_BOT_URL=https://t.me/projectkarmancareerguidancebot
```

---

## 👥 Authors & Acknowledgments

- **Project KARMAN Team** — Smart India Hackathon
- Designed with high-contrast accessibility standards and rural bandwidth optimization.
