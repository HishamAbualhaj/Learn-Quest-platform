# LearnQuest v1.0.0

LearnQuest is an innovative e-learning platform developed as a graduation project. The platform provides educational services with two main actors: Admin, and User. It offers a modern, responsive, and user-friendly interface to enhance online learning experiences.

### use these to enter admin

admin@gmail.com
admin123

## Current local development

To use the running hosted backend, keep the backend URLs already configured in
`.env` and run `npm run dev`. Do not override them with localhost URLs unless
you are also running the API on your machine.

For an entirely local API, keep database credentials in the root `.env` (see
`back-end/sql/README.md`) and add these overrides to the ignored `.env.local`:

```dotenv
NEXT_PUBLIC_BACKEND_URL_DEVELOPMENT=http://127.0.0.1:3002
NEXT_PUBLIC_BACKEND_WEBSOCKET_DEVELOPMENT=ws://127.0.0.1:3002
BACKEND_URL=http://localhost:3002
FRONTEND_URL=http://localhost:3000
```

For that local API setup, start `npm run dev:backend`, then `npm run dev` in a second
terminal. Keep both running and open `http://localhost:3000`. Restart the
frontend after changing backend URL overrides, since proxy rewrites are loaded
at startup. The API command loads `.env`
and then `.env.local` and requires Node.js 22.9 or newer.

External image URLs load directly; uploaded filenames use `/backend/uploads/`.
For a local API, Google login uses `http://localhost:3002/oauth2callback`.

## Tech Stack

### Front-End

- **Framework:** React (with Vite)
- **Styling:** TailwindCSS
- **Icons:** FontAwesome
- **Routing:** React Router
- **Data fetching:** TanStack Query

### Back-End

- **Runtime:** Node.js
- **Database:** MySQL
- **Additional Tools:** MySQL2 for database integration
- **Email service:** Mailer

## Features

- Dark mode switch for UX
- User-friendly interface for learners
- Role-based access control for admin, and users
- Fast and efficient back-end API using Node.js
- Fully responsive design built with TailwindCSS
- Login with google apis
- Chat for both admin and user
- Blog with comments section

## Getting Started

### Prerequisites

- Node.js installed
- MySQL server set up

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/HishamAbualhaj/Learn-Quest-platform.git
   cd Learn-Quest-platform
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Configure the database:**
   - Create a MySQL database.
   - Create database scheme using `createTables.js`
   - Update database configuration in the back-end server file `db.js`

### **Setting up database:**

1. **Open MySQL Command Line:**
   ```bash
   mysql -u root -p
   ```
2. **Create the database:**
   ```bash
   CREATE DATABASE learnquest;
   ```
3. **Create tables for database:**
   ```bash
   cd back-end/db;
   ```
   ```bash
   node createTables.js;
   ```
4. **Run the back end server:**
   ```bash
   cd back-end
   ```
   ```
   node server.js
   ```

#### Run the development server

```
npm run dev
```

### Front-End Scripts

- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`

## Project Structure

```
📂 LEARNQUEST
back-end/
├── 📡 api/
│   ├── 🔐 auth/         # Authentication logic (login, signup, etc.)
│   ├── 📚 course/       # Endpoints and logic related to course management
│   ├── 📊 dashboard/    # Admin dashboard routes
│   ├── 🛠️ system/       # System-level APIs and helpers
│   └── 👤 user/         # User management and profile endpoints
├── ⚙️ config/           # Configuration files (DB, environment)
├── 🎮 controllers/      # Request/response controllers
├── 🧱 middleware/       # Authentication and other middleware
├── 🧬 models/           # MYSQL data models
├── 🔁 services/         # Business logic and helpers
├── 📁 uploads/          # Uploaded files (images, course materials)
├── 🧰 utils/            # Utility functions
├── 🚀 server.js         # Entry point for the backend server
│
├── 📂 public
├── 📂 src
│ ├── 📂 assets
│ ├── 📂 components
| ├── 📂 config
| ├── 📂 context
│ ├── 📂 global
│ ├── 📂 hooks
│ ├── 📂 layouts
│ ├── 📂 pages
│ ├── 📂 routes
│ ├── 📄 App.jsx
│ ├── 📄 index.css
│ ├── 📄 main.jsx
├── 📄 .gitignore
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 postcss.config.js
├── 📄 README.md
├── 📄 tailwind.config.js
└── 📄 vite.config.js
```

## Future Enhancements

- Add real-time notifications
- Enable type safety for react
- Security improvements for back end
- Improve Landing page UI

## Contributors

- **Hesham Abualhaj**: UI/UX, Front-End Development and Back-end Development.

## Contact

For any questions, feel free to reach out at **hishamraid0@gmail.com**.
