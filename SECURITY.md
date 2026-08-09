# 🔒 Security Policy — Schema View

**Schema View** is committed to providing an enterprise-grade, secure environment for database design, ERD visualization, and interactive SQL execution. We take security vulnerabilities seriously and work proactively to resolve any security concerns.

[![Security - Enterprise](https://img.shields.io/badge/Security-Enterprise_Grade-059669?style=for-the-badge&logo=shield&logoColor=white)](SECURITY.md)
[![Firebase Security](https://img.shields.io/badge/Auth-Firebase_JWT-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/docs/auth)
[![PostgreSQL TLS](https://img.shields.io/badge/Database-PostgreSQL_TLS-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## 🛡️ Supported Versions

We actively maintain and provide security updates for the following versions of **Schema View**:

| Version | Supported | Security Patch SLA | Status |
| :--- | :---: | :---: | :---: |
| **`1.x.x`** (Latest / Main) | :white_check_mark: | Critical: < 48 hours | Active Support |
| **`0.x.x`** (Beta Builds) | :x: | N/A | End of Life (EOL) |

If you are using a version older than `1.0.0`, please upgrade to the latest release to ensure you have all security patches.

---

## 🔐 Core Security Controls & Safeguards

### 1. Authentication & Session Management
- **Firebase Authentication**: Session tokens are signed via Firebase Auth JWT.
- **Route Authorization**: Serverless API route handlers (`/api/query`, `/api/database/*`) strictly validate Authorization headers (`Bearer <FIREBASE_ID_TOKEN>`) before processing requests.
- **User Isolation**: Firestore Security Rules ensure each user can only read and write their own databases and canvas states.

### 2. SQL Injection & Database Execution Safety
- **Prepared Statements**: All dynamic SQL queries executed via the backend `node-postgres` driver utilize parameterized queries and connection pooling to eliminate SQL injection vectors.
- **Query Sandboxing**: The Web SQL Terminal supports strict **Read-Only Mode** to prevent accidental or malicious `DROP`, `TRUNCATE`, or destructive data mutations when inspecting production schemas.

### 3. Secrets & Credential Protection
- **Environment Variables**: Sensitive connection strings (`POSTGRES_PASSWORD`, `POSTGRES_HOST`, `NEXT_PUBLIC_FIREBASE_API_KEY`) are loaded strictly from server-side environment variables (`.env.local`) and are never exposed to client-side bundles.
- **TLS/SSL Encryption**: All network traffic between client browsers, API route handlers, and PostgreSQL instances is encrypted using TLS 1.3 / SSL.

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability within **Schema View**, please report it to us responsibly. **Do not create public GitHub issues for security vulnerabilities.**

### How to Report

1. **Private Vulnerability Report (Preferred)**: Submit a report via [GitHub Private Vulnerability Reporting](https://github.com/yourusername/schema-view/security/advisories/new).
2. **Email Disclosure**: Send an encrypted email to `security@schemaview.com` with the following details:
   - Type of vulnerability (e.g., Auth Bypass, SQL Injection, XSS, CSRF).
   - Step-by-step instructions or Proof of Concept (PoC) script to reproduce the issue.
   - Affected routes or components (e.g., `/api/query`, React Flow canvas, Firebase sync listeners).
   - Potential impact of the vulnerability.

### Disclosure Timeline & SLA

| Phase | Target Timeline |
| :--- | :--- |
| **Initial Acknowledgment** | Within **24 hours** of report receipt |
| **Triage & Risk Assessment** | Within **48 hours** |
| **Fix & Patch Deployment** | Within **7 days** (Critical) or **14 days** (Medium/Low) |
| **Public Advisory / Credit** | Upon release of security patch |

---

## 📋 Security Best Practices for Self-Hosting

When deploying **Schema View** in containerized environments (Docker, Vercel, or Kubernetes), ensure you follow these hardening guidelines:

1. **Use Strong Database Credentials**: Set a secure superuser/app password for your PostgreSQL database (`POSTGRES_PASSWORD`).
2. **Enable Network Isolation**: Restrict database access so PostgreSQL (port `5432`) is accessible only by the application server API containers, not exposed publicly.
3. **Configure Environment Secrets**: Store production environment variables in encrypted secret managers (e.g., Vercel Environment Secrets, AWS Secrets Manager, GitHub Secrets).
4. **Regular Dependency Audits**: Run `npm audit` periodically to inspect and update third-party dependencies.

---

## 📄 Disclosure Policy & Hall of Fame

We are grateful to security researchers who help keep **Schema View** safe. Upon verification and resolution of a valid security report:
- We will acknowledge your contribution in our Release Notes and Security Hall of Fame (unless you request anonymity).
- We follow Coordinated Vulnerability Disclosure (CVD) principles.

---

<div align="center">

The Schema View Team

</div>
