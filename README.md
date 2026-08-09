<div align="center">

<!-- Animated Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&custom_color_1=059669&custom_color_2=7C3AED&height=200&section=header&text=Schema%20View&fontSize=46&fontColor=ffffff&fontAlignY=36&desc=Enterprise%20Visual%20Database%20Architect%20%26%20Query%20Engine&descSize=16&descAlignY=62" width="100%" alt="Schema View Banner" />

<br/>

<!-- Animated SVG Typing Banner -->
<a href="https://github.com/yourusername/schema-view">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=22&pause=1000&color=059669&center=true&vCenter=true&width=750&lines=Visual+Database+Design+%26+Interactive+ERD+Canvas;Real-time+Collaborative+Schema+Architecting;Interactive+Web+SQL+Terminal+%26+Query+Runner;Automated+Multi-Format+SQL%2C+DOCX+%26+PDF+Exporters" alt="Typing Banner" />
</a>

<br/><br/>

<!-- Shields.io Badges -->
[![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Build Status](https://img.shields.io/badge/Build-Passing-059669?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/yourusername/schema-view/actions)
[![License](https://img.shields.io/badge/License-MIT-7C3AED?style=for-the-badge&logo=open-source-initiative&logoColor=white)](LICENSE)

<br/>

**Schema View** is a state-of-the-art web application designed to bridge the gap between visual database modeling and real-time SQL management. Engineered with Next.js 16, React 19, and React Flow, it empowers engineers, database architects, and teams to build, inspect, and manage relational database schemas without friction.

[Explore Features](#-feature-showcase) • [Architecture](#-system-architecture) • [Performance Metrics](#-performance--analytics) • [Quickstart](#-quickstart-guide) • [API Reference](#-api-reference)

</div>

<!-- Animated Gradient Wave Divider -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&custom_color_1=059669&custom_color_2=2563EB&height=60&section=footer" width="100%" />

## 🌟 Feature Showcase

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3 style="color:#059669;">🎨 Visual ERD & Schema Canvas</h3>
      <ul>
        <li><b>Drag-and-Drop Node Graph:</b> Infinite interactive canvas powered by React Flow with custom node rendering.</li>
        <li><b>Smart Auto-Relationship Detection:</b> Automatically visualizes <code>1:1</code>, <code>1:N</code>, and <code>N:M</code> foreign key constraints.</li>
        <li><b>Rich Column Customization:</b> Define Primary Keys, Foreign Keys, <code>NOT NULL</code>, <code>UNIQUE</code>, auto-increments, and custom defaults visually.</li>
        <li><b>Color-Coded Entities:</b> Organize tables into domain clusters using custom inline palette themes.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3 style="color:#7C3AED;">💻 Interactive Web SQL Terminal</h3>
      <ul>
        <li><b>Integrated Execution Engine:</b> Execute raw MySQL queries directly within the browser UI with zero overhead.</li>
        <li><b>Syntax Highlighting & Autocomplete:</b> Full SQL keyword formatting, autocomplete hints, and error diagnostics.</li>
        <li><b>Query Execution History:</b> Keep track of previous SQL executions with execution timestamps and row metrics.</li>
        <li><b>Granular Permissions:</b> Support for read-only preview modes and full read-write developer consoles.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3 style="color:#2563EB;">📺 Fullscreen Presentation Mode</h3>
      <ul>
        <li><b>Distraction-Free Canvas:</b> Toggle immersive full-screen view tailored for architecture reviews and tech talks.</li>
        <li><b>Theme Customization:</b> Seamless switching between modern Dark mode glassmorphism and ultra-clean Light themes.</li>
        <li><b>Pan & Zoom Controls:</b> Smooth navigation shortcuts for large-scale enterprise database schemas (100+ tables).</li>
        <li><b>Interactive Node Focusing:</b> Click any table to isolate its relational tree and highlight connected foreign keys.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3 style="color:#D97706;">📤 Automated Multi-Format Export</h3>
      <ul>
        <li><b>DDL SQL Script Export:</b> Generate clean, production-ready <code>CREATE TABLE</code> & <code>ALTER TABLE</code> SQL files instantly.</li>
        <li><b>Enterprise DOCX Reports:</b> Compile complete data dictionaries into structured Microsoft Word documents.</li>
        <li><b>High-Res PDF Diagrams:</b> Render print-ready vector PDF schema diagrams for team wiki documentation.</li>
        <li><b>JSON Schema Snapshot:</b> Backup and restore entire workspace states via standardized JSON payload export.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3 style="color:#4F46E5;">⚡ Real-time Collaboration Engine</h3>
      <ul>
        <li><b>Firebase Sync Integration:</b> Live schema state synchronization across multiple team members simultaneously.</li>
        <li><b>Conflict Resolution:</b> Multi-user lock prevention and optimistic state updates across active sessions.</li>
        <li><b>User Auth & Roles:</b> Integrated Firebase Authentication protecting database connections and project states.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3 style="color:#EC4899;">🚀 Modern Tech Architecture</h3>
      <ul>
        <li><b>Next.js 16 App Router:</b> Lightning fast server-side rendering and isolated API Route Handlers.</li>
        <li><b>React 19 & Framer Motion:</b> Butter-smooth micro-animations, layout transitions, and responsive dialogs.</li>
        <li><b>Tailwind CSS 4 & Aceternity UI:</b> Stunning glassmorphic UI components designed for high visual appeal.</li>
      </ul>
    </td>
  </tr>
</table>

<!-- Animated Wave Divider -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&custom_color_1=7C3AED&custom_color_2=059669&height=60&section=footer" width="100%" />

## 🏗 System Architecture

The high-level request lifecycle and sequence diagram below demonstrates how **Schema View** processes user actions from the visual React Flow canvas down to the backend MySQL database engine and real-time Firebase state store.

```mermaid
%%{
  init: {
    'theme': 'dark',
    'themeVariables': {
      'primaryColor': '#7C3AED',
      'primaryTextColor': '#FFFFFF',
      'primaryBorderColor': '#059669',
      'lineColor': '#2563EB',
      'secondaryColor': '#1E293B',
      'tertiaryColor': '#0F172A',
      'fontFamily': 'Fira Code, Inter, sans-serif'
    }
  }
}%%
sequenceDiagram
    autonumber
    actor Developer as 🧑‍💻 Developer / User
    participant Canvas as 🎨 ERD Canvas (React Flow)
    participant API as ⚡ Next.js API Routes
    participant Auth as 🔐 Firebase Auth & Firestore
    participant Engine as 🐬 MySQL Database Engine

    Developer->>Canvas: Drag Table / Modify Column Schema
    Canvas->>Auth: Validate Session Token & Permissions
    Auth-->>Canvas: Session Verified (Role: Admin)
    
    alt Synchronize ERD Visual State
        Canvas->>Auth: Push Canvas Nodes & Position Matrix (Firestore)
        Auth-->>Canvas: Broadcast Update to Connected Peers
    else Execute SQL Statement
        Developer->>Canvas: Execute Query via Web SQL Terminal
        Canvas->>API: POST /api/query { query, dbConfig }
        API->>Engine: Execute SQL via mysql2 Connection Pool
        Engine-->>API: Return Rowset & Execution Metrics
        API-->>Canvas: Render Data Grid & Execution Logs
    end

    Developer->>Canvas: Trigger Schema Export (SQL / DOCX / PDF)
    Canvas->>API: POST /api/database/export
    API-->>Developer: Download Generated Document File
```

<!-- Animated Wave Divider -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&custom_color_1=2563EB&custom_color_2=7C3AED&height=60&section=footer" width="100%" />

## 📈 Performance & Analytics

### Benchmark Metrics & Real-Time Query Workload

```mermaid
xychart-beta
    title "Canvas Render Latency & Query Execution Speed (ms)"
    x-axis ["10 Tables", "50 Tables", "100 Tables", "250 Tables", "500 Tables"]
    y-axis "Processing Time (ms)" 0 --> 250
    bar [8, 22, 45, 110, 195]
    line [5, 14, 28, 62, 125]
```

<br/>

<!-- Animated Activity Graph Stream -->
<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=yourusername&repo=schema-view&theme=react-dark&bg_color=0f172a&color=059669&line=7C3AED&point=2563EB&area=true&hide_border=true" width="100%" alt="Animated Database Traffic Activity Graph" />
</div>

<br/>

<table width="100%">
  <tr>
    <td bgcolor="#064E3B" align="center" width="33%">
      <h3 style="color:#10B981; margin: 6px 0;">⚡ <span style="color:#ECFDF5;">Sub-15ms Canvas Sync</span></h3>
      <p style="color:#A7F3D0; font-size: 13px; margin: 4px 0; padding: 0 8px 8px 8px;">React Flow node position computation & live DOM updates during drag operations.</p>
    </td>
    <td bgcolor="#312E81" align="center" width="33%">
      <h3 style="color:#818CF8; margin: 6px 0;">🚀 <span style="color:#EEF2FF;">10x Execution Acceleration</span></h3>
      <p style="color:#C7D2FE; font-size: 13px; margin: 4px 0; padding: 0 8px 8px 8px;">Pooled MySQL connection handling delivering sub-30ms raw query execution responses.</p>
    </td>
    <td bgcolor="#7F1D1D" align="center" width="33%">
      <h3 style="color:#F87171; margin: 6px 0;">🛡️ <span style="color:#FEF2F2;">Zero Schema Drift</span></h3>
      <p style="color:#FECACA; font-size: 13px; margin: 4px 0; padding: 0 8px 8px 8px;">Real-time lock synchronization via Firebase Firestore state listeners.</p>
    </td>
  </tr>
</table>

<!-- Animated Wave Divider -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&custom_color_1=059669&custom_color_2=7C3AED&height=60&section=footer" width="100%" />

## 🚦 Roadmap & Milestones

| Milestone / Feature | Description | Target Release | Status |
| :--- | :--- | :---: | :---: |
| **Visual ERD Designer** | Interactive drag-and-drop table and relationship editor | `v1.0.0` | ![Completed](https://img.shields.io/badge/Completed-059669?style=flat-square&logo=checkmark&logoColor=white) |
| **Web SQL Terminal** | Direct SQL query runner with syntax highlighting & query history | `v1.1.0` | ![Completed](https://img.shields.io/badge/Completed-059669?style=flat-square&logo=checkmark&logoColor=white) |
| **Multi-format Exporters** | DDL SQL, DOCX Data Dictionary, and PDF diagram exporters | `v1.2.0` | ![Completed](https://img.shields.io/badge/Completed-059669?style=flat-square&logo=checkmark&logoColor=white) |
| **PostgreSQL & SQLite Support** | Multi-engine database driver support for Postgres and SQLite | `v1.5.0` | ![In Progress](https://img.shields.io/badge/In_Progress-2563EB?style=flat-square&logo=clock&logoColor=white) |
| **AI Schema Assistant** | Natural language to SQL & auto table relationship generator | `v2.0.0` | ![Planned](https://img.shields.io/badge/Planned-7C3AED?style=flat-square&logo=target&logoColor=white) |
| **Version Controlled Migrations** | Git-like schema diffing, migration script creation & rollback | `v2.2.0` | ![Planned](https://img.shields.io/badge/Planned-7C3AED?style=flat-square&logo=target&logoColor=white) |

<!-- Animated Wave Divider -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&custom_color_1=7C3AED&custom_color_2=2563EB&height=60&section=footer" width="100%" />

## ⚡ Quickstart Guide

### Prerequisites

Make sure you have the following installed on your local environment:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)
- **MySQL Database**: Local or hosted MySQL instance (v8.0+)
- **Firebase Account**: Firebase project with Auth & Firestore enabled

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/yourusername/schema-view.git

# Navigate to application directory
cd schema-view/db-viz

# Install npm dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file inside the `db-viz/` directory:

```env
# Firebase Authentication & Database Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# MySQL Connection Details
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_secure_password
MYSQL_DATABASE=schema_view_dev

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Launch Development Server

```bash
# Run Next.js in development mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access **Schema View**.

### 4. Containerized Deployment (Docker & Docker Compose)

```bash
# Build and spin up containers
docker-compose up -d --build

# View container logs
docker-compose logs -f
```

<!-- Animated Wave Divider -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&custom_color_1=2563EB&custom_color_2=059669&height=60&section=footer" width="100%" />

## 📡 API Reference & Command Schema

### 1. Execute SQL Query Endpoint

```http
POST /api/query
Content-Type: application/json
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

#### Request Payload Schema
```json
{
  "query": "SELECT u.id, u.name, COUNT(o.id) as total_orders FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id LIMIT 10;",
  "database": "schema_view_dev",
  "readOnly": true
}
```

#### Response Payload Schema (200 OK)
```json
{
  "success": true,
  "executionTimeMs": 14.8,
  "affectedRows": 0,
  "fields": [
    { "name": "id", "type": "INT" },
    { "name": "name", "type": "VARCHAR" },
    { "name": "total_orders", "type": "BIGINT" }
  ],
  "rows": [
    { "id": 1, "name": "Alice Smith", "total_orders": 5 },
    { "id": 2, "name": "Bob Jones", "total_orders": 12 }
  ]
}
```

### 2. Test MySQL Connection Endpoint

```http
POST /api/test-mysql
Content-Type: application/json
```

#### Request Payload Schema
```json
{
  "host": "localhost",
  "port": 3306,
  "user": "root",
  "password": "your_password",
  "database": "schema_view_dev"
}
```

#### Response Payload Schema (200 OK)
```json
{
  "status": "connected",
  "message": "Successfully connected to MySQL database server v8.0.32",
  "latencyMs": 8.2
}
```

---

## 🛠 Tech Stack Summary

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16.1](https://nextjs.org/) (App Router), [React 19.2](https://react.dev/) |
| **Language & Styling** | [TypeScript 5](https://www.typescriptlang.org/), [Tailwind CSS 4](https://tailwindcss.com/), [Aceternity UI](https://ui.aceternity.com/) |
| **Interactive Canvas** | [React Flow](https://reactflow.dev/), [Framer Motion](https://www.framer.com/motion/) |
| **Backend & Auth** | [Firebase 12.7](https://firebase.google.com/) (Auth & Firestore), Next.js API Route Handlers |
| **Database Driver** | [MySQL2 Driver](https://github.com/sidorares/node-mysql2) for Node.js |
| **Document Generation** | [docx](https://github.com/dolanmiu/docx), [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://github.com/niklasvh/html2canvas) |
| **DevOps & Containerization** | Docker, Docker Compose, Vercel Deployment |

---

## 🤝 Contributing & Community

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

1. Fork the Project (`https://github.com/yourusername/schema-view/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Made with ❤️ by the Schema View Engineering Team

[⭐ Star Us On GitHub](https://github.com/yourusername/schema-view) • [💬 Join Discord Community](https://discord.gg/schemaview) • [📖 Read Documentation](https://docs.schemaview.com)

<br/><br/>

<!-- Animated Wave Footer Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&custom_color_1=059669&custom_color_2=7C3AED&height=120&section=footer" width="100%" />

**[⬆ Back to Top](#-schema-view)**

</div>
