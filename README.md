# Karnataka State Nadaf / Pinjar Sangha Website

This is a local clone of the Nadafpinjar.com website with additional functional forms.

## 🚀 Quick Start

### Running the Website Locally

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

3. **Stop the server:**
   Press `Ctrl+C` in the terminal

## 📋 Available Forms

The following forms have been added and are fully functional:

### 1. **ರಾಜ್ಯಕ್ಕೆ ನೇರ ಮೊತ್ತ ವರ್ಗಾವಣೆ** (Direct State Money Transfer)
- **URL:** http://localhost:3000/donationdirectstate.html
- **Menu:** ರಸೀದಿಗಳು → ರಾಜ್ಯಕ್ಕೆ ನೇರವಾಗಿ
- Form for direct donations to the state unit

### 2. **ತಾಲೂಕಿನಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆಯಾದ ಮೊತ್ತ** (Taluk to State Transfer)
- **URL:** http://localhost:3000/donationtaluktostate.html
- **Menu:** ರಸೀದಿಗಳು → ತಾಲೂಕಿನಿಂದ ರಾಜ್ಯಕ್ಕೆ
- Form for taluk-level donations transferred to state

### 3. **ಜಿಲ್ಲೆಯಿಂದ ರಾಜ್ಯಕ್ಕೆ ವರ್ಗಾವಣೆಯಾದ ಮೊತ್ತ** (District to State Transfer)
- **URL:** http://localhost:3000/donationdistricttostate.html
- **Menu:** ರಸೀದಿಗಳು → ಜಿಲ್ಲೆಯಿಂದ ರಾಜ್ಯಕ್ಕೆ
- Form for district-level donations transferred to state

### 4. **ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯಾಗಿ ಅರ್ಜಿ 2026-27** (Free Education Application)
- **URL:** http://localhost:3000/freeedu.html
- **Menu:** ಅರ್ಜಿಗಳು → ಉಚಿತ ಶಿಕ್ಷಣ ಸೌಲಭ್ಯ
- Application form for free education facility

### 5. **ಜನಗಣತಿ (CENSUS)**
- **URL:** http://localhost:3000/Census.html
- **Menu:** ಅರ್ಜಿಗಳು → ಜನಗಣತಿ (Census)
- Census data collection form

## 📁 Project Structure

```
project-root/
│
├── src/                          # Application source code
│   ├── app/                      # Main application layer
│   │   ├── frontend/             # Next.js/React frontend codebase
│   │   │   ├── routes/
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   ├── providers/
│   │   │   └── middleware/
│   │   └── backend/              # Python ASGI backend services (FastAPI)
│   │       ├── routes/
│   │       ├── middleware/
│   │       ├── websocket/
│   │       └── server.py
│   │
│   ├── features/                 # Modular domain features
│   │   ├── auth/                 # Traditional credentials authentication
│   │   │   ├── frontend/
│   │   │   ├── backend/
│   │   │   ├── api/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   ├── models/
│   │   │   ├── hooks/
│   │   │   ├── components/
│   │   │   └── tests/
│   │   ├── users/                # User management
│   │   ├── face-auth/            # Face recognition & liveness detection
│   │   │   ├── frontend/
│   │   │   ├── backend/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── embeddings/
│   │   │   ├── liveness/
│   │   │   ├── recognition/
│   │   │   └── tests/
│   │   ├── geolocation/          # Geo-fencing & mapping
│   │   ├── dashboard/            # Administrative portal
│   │   ├── attendance/           # Punch-in logs & scheduling
│   │   ├── notifications/        # SMS, Email & push logs
│   │   ├── analytics/            # Attendance metrics graphs
│   │   └── reports/              # Export CSV/PDF receipts
│   │
│   ├── shared/                   # Shared reusable utilities & components
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── types/
│   │   ├── validators/
│   │   └── assets/
│   │
│   ├── core/                     # Platform core modules
│   │   ├── config/               # Pydantic Settings env configuration
│   │   ├── database/             # SQLAlchemy / Motor ODM engines
│   │   ├── security/             # JWT keys & password crypt encryption
│   │   ├── cache/                # Redis key cache layer
│   │   ├── queue/                # Celery background tasks queue
│   │   ├── logging/              # Structured logger
│   │   └── exceptions/           # Global exception handler
│   │
│   ├── services/                 # Infrastructure integration services
│   │   ├── email/
│   │   ├── sms/
│   │   ├── storage/
│   │   ├── payment/              # Razorpay checkout flows
│   │   └── third-party/
│   │
│   ├── ai/                       # AI models & RAG pipelines
│   │   ├── models/
│   │   ├── embeddings/
│   │   ├── vector-db/
│   │   ├── training/
│   │   ├── prompts/
│   │   ├── rag/
│   │   └── agents/
│   │
│   ├── tests/                    # Global test suite
│   │   ├── unit/
│   │   ├── integration/
│   │   ├── e2e/
│   │   ├── performance/
│   │   └── security/
│   │
│   └── main.py                   # Server startup run entrypoint script
│
├── database/                     # DB seeds and schemas migrations
│   ├── migrations/
│   ├── seeders/
│   ├── schemas/
│   ├── indexes/
│   └── backups/
│
├── infrastructure/               # DevOps infrastructure config
│   ├── docker/
│   ├── nginx/
│   ├── kubernetes/
│   ├── terraform/
│   └── monitoring/
│
├── scripts/                      # Helper & maintenance scripts
├── docs/                         # Developer manuals & architecture docs
├── .github/                      # CI/CD workflows
│   └── workflows/
│
├── .env                          # Local app configurations
├── docker-compose.yml            # Docker deployment configuration
├── requirements.txt              # Python requirements list
├── package.json                  # Legacy frontend packages
├── nadafpinjar/                  # Legacy/Current deployed static website files
└── README.md
```

## 🛠️ Available Commands

- **`npm start`** - Start the local development server
- **`npm run clone`** - Re-scrape the website from nadafpinjar.com

## ⚙️ Technical Details

- **Server:** Node.js HTTP server
- **Port:** 3000
- **Base Directory:** ./nadafpinjar
- **Supported File Types:** HTML, CSS, JS, Images (PNG, JPG, GIF, SVG), Fonts (WOFF, WOFF2, TTF, EOT)

## 📝 Form Features

All forms include:
- ✅ Kannada language support
- ✅ Responsive design
- ✅ Form validation
- ✅ Dropdown menus for districts and taluks
- ✅ Mobile number validation
- ✅ Aadhar number validation (12 digits)
- ✅ Professional styling with blue theme
- ✅ Submit and Cancel buttons

## 🔗 Navigation

All forms are accessible through the main navigation menu:
- **ಅರ್ಜಿಗಳು** (Applications) - Contains education and census forms
- **ರಸೀದಿಗಳು** (Receipts) - Contains donation/transfer forms

## 📌 Notes

- This is a **demo version** - form submissions are not sent to any backend
- Forms show an alert message on submission
- All data is validated on the client-side
- The server serves static files only

## 🌐 Original Website

Original website: https://nadafpinjar.com

## 📧 Contact

For any issues or questions, please contact the Karnataka State Nadaf / Pinjar Sangha administration.

---

© 2026 Karnataka State Nadaf / Pinjar Sangha (R). All Rights Reserved.
