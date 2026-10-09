# StudentOS Partners

**A campus ambassador and student partnership platform built with React, Vite, FastAPI, Firebase Authentication, and Google Cloud Firestore.**

StudentOS Partners is part of the StudentOS ecosystem. It is designed to support the campus ambassador program by providing a student application workflow, authentication, application review tools for administrators, and a partner dashboard.

> **Project status:** This README describes the intended structure and features based on the project details available. Verify the actual repository files, endpoints, and feature completeness before publishing.

## Overview

The platform connects students interested in representing StudentOS with the team managing the ambassador program. Students can submit an application and, where implemented, access their application status and partner dashboard. Authorized administrators can review applications and manage application decisions.

## Technology Stack

### Frontend
- **React.js** — UI components and pages
- **Vite** — Development server and production build
- **React Router DOM** — Client-side navigation
- **CSS3** — Styling and responsive layouts
- **Firebase Web SDK** — Frontend Firebase integration
- **Firebase Authentication** — User sign-in and identity

### Backend
- **Python** — Backend language
- **FastAPI** — REST API framework
- **Pydantic** — Request validation
- **Uvicorn** — ASGI server
- **Firebase Admin SDK** — Server-side Firebase integration and token verification
- **Google Auth / Firestore REST API** — Authenticated database access

### Data and access control
- **Firebase Authentication** for user identity
- **Google Cloud Firestore** for application and ambassador data
- **Firebase ID tokens** for authenticated frontend-to-backend requests
- **Backend authorization checks** for administrator-only actions

## Features

### Student-facing
- Program landing page and role selection
- Firebase-based login/authentication
- Ambassador application form
- Application-status workflow, where implemented
- Partner dashboard for ambassador information
- Referral link display and copy functionality, where implemented

### Administrator-facing
- Admin dashboard for reviewing applications
- Viewing application details
- Approving or rejecting applications
- Creating or updating ambassador records as part of approval, where implemented
- Server-side admin authorization checks

### Application information
The application flow may collect details such as name, email, phone, college, course, city, academic year, social profile links, and motivation for applying. Confirm the form fields and backend schema match before publishing this list as a guarantee.

## Architecture

```text
Student / Administrator
          |
          v
   React + Vite Frontend
          |
          +---- Firebase Authentication
          |          |
          |          v
          |     Firebase ID Token
          |
          v
      FastAPI REST API
          |
          +---- Verify identity and permissions
          |
          v
   Google Cloud Firestore
          |
          +---- Applications
          +---- Ambassador profiles
```

The frontend communicates with the FastAPI backend over HTTP. Authenticated requests should include a Firebase ID token. The backend validates the token, checks permissions for protected actions, validates request data, and interacts with Firestore.

## Repository Structure

The exact tree depends on the current repository. A typical layout for this project is:

```text
studentos-partners/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── firebase.js
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── index.html
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── services/
│   │   ├── auth/
│   │   └── firebase/
│   ├── requirements.txt
│   └── .env.example
├── .gitignore
└── README.md
```

Treat this as an illustrative structure, not a guarantee that every path already exists.

## API

The backend is organized around FastAPI routes. Depending on the current implementation, application, admin, and partner endpoints may include operations such as:

- Submitting an application
- Retrieving the signed-in user's application
- Listing applications for administrators
- Retrieving an individual application
- Approving or rejecting an application
- Retrieving a partner profile
- Checking API health

For exact endpoint paths, HTTP methods, request schemas, and authorization requirements, inspect the current FastAPI route definitions and its OpenAPI documentation at `/docs` while the backend is running. Do not assume an endpoint is implemented merely because it is listed here.

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.10+ (use the version supported by the project's dependencies)
- A Firebase project with Authentication configured
- A Google Cloud Firestore database
- A service account for backend access, stored securely outside version control

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/studentos-partners.git
cd studentos-partners
```

Adjust the folder paths below to match the actual repository structure.

### 2. Configure the frontend

Install frontend dependencies in the frontend directory:

```bash
npm install
```

Create a local `.env` file based on `.env.example`. Configure the Firebase web settings and backend API URL. For a Vite app, client-side variables typically use the `VITE_` prefix.

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Only use variable names that match the actual frontend code. Never put service-account private keys in frontend variables.

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

### 3. Configure the backend

Create and activate a Python virtual environment, then install dependencies:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install backend requirements from the backend directory:

```bash
pip install -r requirements.txt
```

Create a local `.env` file using the backend `.env.example`. Configure the Firebase project ID, credential path or supported credential mechanism, and administrator configuration according to the actual backend settings.

Keep the Firebase service-account JSON outside the public repository. Prefer deployment-platform secret/environment configuration for production.

Run the API from the directory where the `app` package is importable:

```bash
uvicorn app.main:app --reload
```

The local API is commonly available at `http://127.0.0.1:8000`. If enabled, interactive API documentation is available at `http://127.0.0.1:8000/docs`.

## Environment Variables

Environment variable names must match the code. Typical examples include:

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Frontend base URL for the backend API |
| `VITE_FIREBASE_*` | Firebase web configuration used by the frontend |
| `FIREBASE_PROJECT_ID` | Firebase/Google Cloud project identifier |
| `FIREBASE_CREDENTIALS_PATH` | Path to backend service-account credentials, if the code uses a file |
| `ADMIN_EMAIL` | Administrator configuration, if supported by the backend |

Add safe placeholders to `.env.example`; do not put real credentials in it.

## Security Checklist

Before making the repository public or deploying to production:

- [ ] Remove `.env` files and all private credentials from Git history if they were committed.
- [ ] Never commit Firebase service-account JSON files or private keys.
- [ ] Rotate any credential that was accidentally exposed.
- [ ] Verify Firebase ID tokens on the backend for protected endpoints.
- [ ] Enforce admin permissions on the backend, not only in the frontend.
- [ ] Restrict production CORS to trusted frontend origins.
- [ ] Avoid logging tokens, private user data, or unnecessary personal information.
- [ ] Validate and sanitize incoming data.
- [ ] Review Firestore security rules and service-account permissions.
- [ ] Configure production environment variables in the hosting provider.
- [ ] Test the production build and all important user flows.
- [ ] Enable GitHub secret scanning and push protection where available.

## Testing Before Release

At minimum, manually verify:

- [ ] A student can sign in and sign out.
- [ ] An application can be submitted with valid data.
- [ ] Invalid application data returns a useful error.
- [ ] A user cannot access another user's private application.
- [ ] A non-admin user cannot access admin endpoints.
- [ ] Admin approval and rejection work correctly.
- [ ] Partner profile and referral features work end to end, if included.
- [ ] The frontend uses the deployed API URL in production.
- [ ] CORS permits the deployed frontend and rejects untrusted origins.

## Roadmap Ideas

Potential future improvements:

- Dedicated partner profile, resources, and program-conditions pages
- Application filtering and search for administrators
- Referral attribution and ambassador analytics
- Email notifications for application decisions
- Automated tests for API authorization and workflows
- Accessibility and responsive-design improvements
- Structured logging and production monitoring

## Contributing

Contributions and suggestions are welcome. Before opening a pull request, describe the change, test the affected flows, and ensure no secrets or personal data are included.

## License

No license has been specified yet. Add a `LICENSE` file before presenting this project as open source. Without a license, others generally do not receive explicit permission to reuse, modify, or distribute the code.

---

**Built for the StudentOS ecosystem with React, FastAPI, Firebase Authentication, and Google Cloud Firestore.**
