<div align="center">

# 🚀 Hritik Singh — Developer Portfolio

**A modern, interactive full-stack portfolio website built with React, Three.js, Firebase, and Supabase.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r182-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.x-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)](.)

🌐 **Live Site:** [hritikdev.site](https://hritikdev.site)
&nbsp;·&nbsp;
💼 **LinkedIn:** [Hritik Singh](https://www.linkedin.com/in/hritik-singh-4b85783b2/)
&nbsp;·&nbsp;
🐙 **GitHub:** [@hritiksinghdev](https://github.com/hritiksinghdev)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Sections](#-sections)
- [Projects Showcased](#-projects-showcased)
- [Work Experience](#-work-experience)
- [Admin Panel](#-admin-panel)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)

---

## 🌟 Overview

This is the **official portfolio website** of Hritik Singh (Hritik Dev) — a Full Stack Developer based in India. The site is built as a performant React SPA (Single Page Application) with immersive 3D visuals, smooth animations, and a Firebase-backed contact system. A separate **Next.js** sub-project is also included as part of the repository.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎮 **3D Hero Section** | Interactive floating astronaut rendered with Three.js + React Three Fiber, with mouse-tracking camera rig |
| 🌍 **Interactive Globe** | WebGL globe built with `cobe` showing geographic presence |
| 🃏 **Scroll-Reveal Animations** | Custom `useScrollReveal` hook animates sections on viewport entry |
| 🖱️ **Parallax Background** | Multi-layer mountain parallax effect on scroll |
| 📬 **Contact Form + Firebase** | Form submissions stored in Firestore with secured rules |
| 🔐 **Admin Panel** | Protected admin route at `/admin` powered by Supabase Auth |
| ✉️ **Copy Email Button** | One-click email copy with visual feedback |
| 📱 **Fully Responsive** | Mobile-first design using `react-responsive` breakpoints |
| ✨ **Particle Effects** | Animated particle canvas on the Contact section |
| 🔄 **FlipWords Animation** | Typewriter-style animated word cycling in the hero |
| 🪐 **Orbiting Circles** | Decorative orbiting skill icons component |
| ⚡ **SEO-Optimized** | JSON-LD schema markup, semantic HTML, meta tags |

---

## 🛠️ Tech Stack

### Frontend

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### 3D & Animation

[![Three.js](https://img.shields.io/badge/Three.js-r182-black?logo=three.js)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/@react--three/fiber-9-white?logo=react)](https://docs.pmnd.rs/react-three-fiber)
[![React Three Drei](https://img.shields.io/badge/@react--three/drei-10-white?logo=react)](https://github.com/pmndrs/drei)
[![Motion](https://img.shields.io/badge/Motion-12-black?logo=framer)](https://motion.dev/)
[![COBE](https://img.shields.io/badge/cobe-0.6-3ECF8E)](https://cobe.vercel.app/)
[![Maath](https://img.shields.io/badge/maath-0.10-gray)](https://github.com/pmndrs/maath)

### Backend & Services

[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Firestore](https://img.shields.io/badge/Firestore-NoSQL-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/products/firestore)

### Sub-Project (Next.js App)

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 📁 Project Structure

```
hritik-singh-portfolio-main/
│
├── index.html                  # SPA entry point (with SEO semantic payload)
├── package.json                # Root dependencies
├── .env                        # Firebase environment variables
├── firestore.rules             # Firestore security rules
├── google0bb0d2c47b9d2b84.html # Google Search Console verification
│
├── src/
│   ├── main.jsx                # React app bootstrap
│   ├── App.jsx                 # Root component + admin route guard
│   ├── index.css               # Global styles
│   │
│   ├── sections/               # Page-level sections
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx            # Three.js astronaut scene
│   │   ├── About.jsx           # Globe, frameworks, copy-email grid
│   │   ├── Project.jsx         # Project showcase
│   │   ├── Experience.jsx      # Timeline of work experience
│   │   ├── Contact.jsx         # Firebase-backed contact form
│   │   └── Footer.jsx
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Astronaut.jsx       # 3D GLTF model
│   │   ├── Globe.jsx           # COBE WebGL globe
│   │   ├── Timeline.jsx        # Experience timeline
│   │   ├── Frameworks.jsx      # Skill logos carousel
│   │   ├── Particles.jsx       # Canvas particle effect
│   │   ├── FlipWords.jsx       # Animated word cycler
│   │   ├── ObitingCircles.jsx  # Orbiting skill icons
│   │   ├── ParrallaxBackground.jsx
│   │   ├── Card.jsx
│   │   ├── CopyEmailButton.jsx
│   │   ├── Alert.jsx
│   │   ├── Loader.jsx
│   │   └── ProjectDetails.jsx
│   │
│   ├── pages/
│   │   └── Admin.jsx           # Protected admin route
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js  # Intersection Observer hook
│   │
│   ├── constants/
│   │   └── index.js            # Projects, socials, experience data
│   │
│   └── lib/
│       └── firebase.js         # Firebase initialization
│
├── public/
│   ├── assets/                 # Images, SVGs, project screenshots
│   │   └── logos/              # 20+ tech stack logo assets
│   └── admin/                  # Static admin panel (Supabase-powered)
│       ├── index.html
│       ├── admin.js
│       └── supabaseClient.js
│
└── hritik-portfolio/           # Next.js sub-project
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    └── package.json
```

---

## 🗂️ Sections

```
┌─────────────────────────────────────────────────────┐
│  🧭 Navbar          — Fixed nav with smooth scroll   │
├─────────────────────────────────────────────────────┤
│  🚀 Hero            — 3D Astronaut + parallax bg     │
├─────────────────────────────────────────────────────┤
│  👤 About           — Globe · Skills grid · Email    │
├─────────────────────────────────────────────────────┤
│  💼 Projects        — 6 project cards with tags      │
├─────────────────────────────────────────────────────┤
│  🗓️  Experience      — Animated timeline              │
├─────────────────────────────────────────────────────┤
│  📬 Contact         — Firebase form + particles      │
└─────────────────────────────────────────────────────┘
```

---

## 🏗️ Projects Showcased

| # | Project | Stack | Type |
|---|---------|-------|------|
| 1 | **Education SaaS Platform** — Language institute booking & admin | C# · .NET · EF Core · Tailwind | Full Stack |
| 2 | **Tabb Migration** — Legacy Rails → TypeScript modernization | Next.js · NestJS · Prisma · PostgreSQL | Architecture |
| 3 | **Moonstone Admin Module** — Unified admin for Lunim & Tabb | Next.js · NestJS · Prisma · Prismic CMS | Full Stack |
| 4 | **NFT Marketplace UI** — Curated AI NFT curation platform | Next.js 14 · TypeScript · Tailwind · Shadcn/UI | Frontend |
| 5 | **Directory Search Utility** — High-performance file finder | C# · .NET Core · WinForms | Desktop App |

---

## 👔 Work Experience

```
2025–Present   Founder & Systems Architect     UrbanVista Services
               Next.js · Tailwind · Supabase · SEO
               Built full-stack digital visibility platform for local businesses

2025           Data Analytics Trainee
               Python · SQL · MongoDB · Power BI · Tableau · Excel

2026–Present   AI Workflow Builder
               Prompt Engineering · AI-assisted full-stack development pipelines
```

---

## 🔐 Admin Panel

The portfolio includes a protected admin panel available at `/admin`.

- **Authentication** — Powered by Supabase Auth
- **Access** — Read, update, and delete contact form submissions
- **Firestore Rules** — Public write-only for the contact form; authenticated-only reads

```
📩 Contact form  →  Firestore (public write)
                        ↓
🔐 Admin Panel   →  Supabase Auth → read/manage submissions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hritik2006singh-wq/hritik-singh-portfolio.git
cd hritik-singh-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit real credentials. Add `.env` to `.gitignore`.

---

## 🌐 Deployment

The site is deployed and live at **[hritikdev.site](https://hritikdev.site)**.

Recommended deployment platforms:

[![Vercel](https://img.shields.io/badge/Vercel-Recommended-black?logo=vercel)](https://vercel.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Supported-00C7B7?logo=netlify&logoColor=white)](https://netlify.com/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-Supported-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/products/hosting)

---

<div align="center">

**Built with ❤️ by Hritik Singh**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin)](https://www.linkedin.com/in/hritik-singh-4b85783b2/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?logo=github)](https://github.com/hritik2006singh-wq)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?logo=instagram&logoColor=white)](https://www.instagram.com/_singhhritik)

© 2026 Hritik Dev. All rights reserved.

</div>
