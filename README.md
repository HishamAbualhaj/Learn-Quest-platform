# LearnQuest
LearnQuest is an innovative e-learning platform developed as a graduation project. The platform provides educational services with two main actors: Admin, and User. It offers a modern, responsive, and user-friendly interface to enhance online learning experiences.

## Tech Stack

### Front-End
- **Framework:** React (with Vite)
- **Styling:** TailwindCSS
- **Icons:** FontAwesome
- **Routing:** React Router

### Back-End
- **Runtime:** Node.js
- **Database:** MySQL
- **Additional Tools:** MySQL2 for database integration

## Features
- User-friendly interface for learners
- Role-based access control for admins, teachers, and users
- Fast and efficient back-end API using Node.js
- Fully responsive design built with TailwindCSS

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
This folder structure will be modified soon !
learnquest/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── index.css
├── package.json
└── tailwind.config.js
```

## Future Enhancements
- Add real-time notifications
- Enhance user progress tracking
- Improve analytics for teachers and admins

## Contributors
- **Hesham Abualhaj**: UI/UX, Front-End Development and Back-end Development.

## License
This project is licensed under [MIT License](LICENSE).

## Contact
For any questions, feel free to reach out at **hishamraid0@gmail.com**.
