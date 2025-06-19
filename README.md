# Hospital Management System

A simple Hospital Management System project built to learn about databases and CRUD operations using MongoDB as the database, Node.js and Express as the backend, and HTML, CSS, and JavaScript as the frontend. This project demonstrates how to register patients, view patient details, and visualize patient statistics in a hospital setting.

## Screenshots

### Main Dashboard

![Main Dashboard](./Screenshot%201.png)

### Patient Registration Form

![Patient Registration Form](./Screenshot%202.png)

### Patient Details Section

![Patient Details](./Screenshot%203.png)

## Features

- Patient registration with details like name, age, gender, contact, medical history, and assigned doctor
- View patient details by searching with patient name
- Dashboard with statistics and charts (age and gender distribution)
- Responsive and modern UI using HTML, CSS, and Chart.js
- Backend API for CRUD operations using Node.js, Express, and MongoDB

## Folder Structure

```
Hospital Management System/
  ├── client/
  │   ├── index.html                # Dashboard (Overview)
  │   ├── patient.html              # Patient Registration Form
  │   ├── patient-details.html      # Patient Details Lookup
  │   ├── script.js                 # Frontend JavaScript logic
  │   └── styles.css                # Stylesheet
  ├── server/
  │   ├── server.js                 # Express backend server
  │   ├── package.json              # Backend dependencies
  │   └── package-lock.json         # Dependency lock file
  ├── Screenshot 1.png              # Main dashboard screenshot
  ├── Screenshot 2.png              # Patient registration screenshot
  ├── Screenshot 3.png              # Patient details screenshot
  └── README.md                     # Project documentation
```

## How to Run the Project

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- [MongoDB](https://www.mongodb.com/) installed and running locally or a MongoDB Atlas connection string

### 1. Clone the Repository

```bash
git clone https://github.com/harshalself/Hospital-Management-System.git
cd "Hospital Management System"
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder with the following content:

```
MONGO_URI=<your-mongodb-connection-string>
```

Start the backend server:

```bash
npm run dev
```

The backend will run on [http://localhost:5000](http://localhost:5000).

### 3. Open the Frontend

You can open the HTML files in the `client` folder directly in your browser:

- `index.html` for the dashboard
- `patient.html` for patient registration
- `patient-details.html` for patient lookup

> **Note:** For full functionality, keep the backend server running and ensure CORS is enabled (already set in the code).

## Contributing

Contributions are welcome! If you have suggestions, bug fixes, or improvements, feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

**This project is for educational purposes to demonstrate CRUD operations and full-stack development with MongoDB, Node.js, Express, and vanilla frontend technologies.**
