# 🏟️ Stadium Safety & Management Platform (IPL 2026 Edition)

Welcome to the **Stadium Safety & Application Platform**, a next-generation continuous smart stadium experience built for the biggest events in sports. 

Currently themed for the **IPL 2026 Finals** at the spectacular **Narendra Modi Stadium**, this platform delivers an ultra-smooth, premium user interface designed to bridge the gap between backend infrastructure and real-time fan engagement.

## 🚀 The Vision
The platform aims to completely remove friction from the matchday experience. By intelligently aggregating stadium data, attendees can visualize live crowd density, place food orders ahead of time, check optimal pickup windows, and manage their experience effortlessly right from their seats.

### 🌟 Key Features
* **Live Dashboard:** Real-time event tracking including live scores, possession metrics, atmospheric decibels, and weather updates.
* **Intelligent Heatmaps:** Understand crowd density and pinpoint the fastest routes for exits, food courts, and less congested zones.
* **Smart Concierge Ordering:** Browse interactive menus and pre-order food directly to vendors. Specially curated for Gujarat, the menus feature authentic offerings like *Khaman Dhokla, Fafda, Jalebi, and local Gujarati Thalis*.
* **Predictive AI:** View the most optimal pickup windows strictly avoiding peak lines and agonizing waits.
* **Dynamic Profiles:** Access your unique Guest ID, dietary preferences, digital seat assignments, and track all your historic in-stadium orders dynamically.

## 💻 The Architecture & Tech Stack

This project leverages a modern Monorepo architecture focusing heavily on full-stack Type-safety, beautiful user aesthetics, and blazing-fast local delivery. 

<div align="center">
  <img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind,nodejs,express,postgres,npm" alt="Tech Stack" />
</div>

* **Frontend Ecosystem:** React 19 with rigorous TypeScript typing.
* **Build Tooling:** Vite for lightning-quick client builds.
* **Styling & UI:** Tailwind CSS V4 combined with Radix UI components for strict accessibility and beautiful dark modes.
* **Data Visualization:** Recharts for AI-driven density mapping and busy-time charting.
* **Routing:** Wouter for ultra-lightweight client-side transitions.
* **Backend:** Express API instance running on Node.js.
* **Database Management:** Drizzle ORM integrated tightly with PostgreSQL.
* **Schema Validation:** Zod for bulletproof server-to-client type integrity.
* **Package Manager:** NPM Workspaces mapping local APIs seamlessly to the frontend.

## 🛠️ Getting Started Locally

### Prerequisites
Ensure you have `Node.js` (v20+) currently installed.

### Installation & Run Steps

1. **Clone and Install everything:**
   ```bash
   git clone https://github.com/GayatriParimiDev/Stadium-Safety-Application.git
   cd Stadium-Safety-Application
   npm install
   ```

2. **Launch the Platform:**
   Start both the backend API server and frontend core simultaneously from the root directory:
   ```bash
   npm run dev
   ```

3. **Navigate to LocalHost:**
   Load your terminal's output link (usually `http://localhost:5173`) to view the application in action. 

---
*Crafted carefully to reshape the Ultimate Stadium Fan Experience.*
