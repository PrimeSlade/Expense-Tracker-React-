# Expense Tracker Application

This is a full-stack expense tracker application built with React (frontend) and Node.js with Express and MongoDB (backend). The application allows users to track their expenses, manage their budget, and view detailed statistics.

## Features

- **User Authentication**: Sign up, log in, and log out functionality with JWT (JSON Web Tokens) for secure authentication.
- **Expense Management**: Add, delete, and view expenses with detailed notes and categories.
- **Budget Tracking**: Update and track your budget in real-time.
- **Statistics**: View detailed statistics and progress bars for each expense category.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Vite, React Router, FontAwesome, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, Bcrypt, JWT
- **Styling**: CSS

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas or a local MongoDB instance.
- Git (optional, for cloning the repository).

### Installation

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies for both frontend and backend**:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

Here’s the complete corrected Markdown:

````markdown
### 3. **Set up environment variables**

- Create a `.env` file in the `backend` directory with the following content:

  ```env
  MONGO_URL=<your-mongodb-connection-string>
  JWT_SECRET=<your-secret-key>
  PORT=5000
  ```
````

- Replace `<your-mongodb-connection-string>` with your actual MongoDB connection string.
- Replace `<your-secret-key>` with a secure random string for JWT signing.

For more details on MongoDB connection strings, refer to the [MongoDB documentation](https://www.mongodb.com/docs/manual/reference/connection-string/).

4. **Start the backend server**:

   ```bash
   cd backend
   node server.js
   ```

5. **Start the frontend development server**:

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**:

   Open your browser and navigate to `http://localhost:5173` to view the application.

## Full Installation Commands

### Frontend (run in `/frontend`):

```bash
npm install react react-dom react-router-dom axios @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @mui/material @emotion/react @emotion/styled

npm install -D vite @vitejs/plugin-react eslint eslint-plugin-react eslint-plugin-react-hooks postcss autoprefixer
```

### Backend (run in `/backend`):

```bash
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
npm install -D nodemon  # Optional
```

## Project Structure

### Frontend

- **`src/`**: Contains all the React components, styles, and main application logic.
  - **`App.jsx`**: Main application component with routing.
  - **`NavBar/`**: Contains the navigation bar and login/signup components.
  - **`Body/`**: Contains the main content, including expense lists, budget display, and statistics.

### Backend

- **`server.js`**: The main server file that sets up the Express server, connects to MongoDB, and defines the API routes.

## API Endpoints

- **POST `/users`**: Create a new user.
- **POST `/login`**: Authenticate a user and return a JWT.
- **GET `/profile`**: Get the authenticated user's profile and expenses.
- **POST `/add-expense`**: Add a new expense for the authenticated user.
- **PUT `/update-amount/:id`**: Update the user's budget amount.
- **DELETE `/delete-expense/:expenseId`**: Delete an expense for the authenticated user.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- Thanks to [FontAwesome](https://fontawesome.com/) for providing the icons used in this project.
- Thanks to [MongoDB](https://www.mongodb.com/) for providing the database solution.
- Thanks to [Vite](https://vitejs.dev/) for the fast development environment.

---
