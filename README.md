# Kanban_Board-App

## Introduction
- Kanban-Board-App API built using Node.js, Express, and MongoDB.
- Backend for  user registration, login, and managing sections and tasks .

## Features
- User registration and login with validation.
- JWT-based authentication.
- CRUD operations for tasks and sections.
- Validation of user input using express-validator.
- Middleware for authentication.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and task data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For user authentication.
- **Bcrypt.js**: For password hashing.
- **Express Validator**: Middleware for validating request data.

## MVC Structure
- **Models**: Define data structure and handle database interactions.
    - `user-model.js`: User schema.
    - `task-model`: Task schema.
    - `section-model`: Section schema.
  
- **Controllers**: Handle business logic and interact with models.
    - `users-cltr.js`: Functions for user registration, login, and account retrieval.
    - `task-cltr.js`: Functions for managing tasks.
    - `section-cltr.js`: Functions for managing sections.
  
- **Middlewares**: Functions executing during request-response cycle.
    - `authenticateUser.js`: Middleware for authenticating users.
    

---



## Technologies Used
- **React**: Front-end library for building user interfaces.
- **Redux**: State management library for managing application state.
- **React Router**: For routing and navigation.
- **Axios**: For making HTTP requests.
- **react-beautiful-dnd**:  drag-and-drop interface for React.
- **react-dnd-html5-backend**:  enabling drag-and-drop functionality.
- **validator.js**: For input validation.
- **Context API**: For managing authentication state.



