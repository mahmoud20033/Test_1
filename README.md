# Inventory Management Backend System

This is a Node.js backend application built with Express.js and MongoDB for managing inventory systems. The application implements role-based access control with different user types including Clients, Workers, Supervisors, and Suppliers.

## Features

- Role-based access control (RBAC)
- RESTful API endpoints
- MongoDB integration with Mongoose
- JWT authentication
- CORS enabled for frontend integration
- Modular architecture with Controllers, Routers, and Schemas

## Prerequisites

- Node.js v14 or higher
- MongoDB database
- npm package manager

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8080
   ```
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

All API endpoints are prefixed with `/api`:

- `/api/client` - Client management
- `/api/worker` - Worker management
- `/api/supplier` - Supplier management
- `/api/storeSupervisor` - Store supervisor management
- `/api/workerSupervisor` - Worker supervisor management
- `/api/rawMaterialStore` - Raw material store management
- `/api/scrapStore` - Scrap store management
- `/api/users` - User management

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- dotenv for environment management
- body-parser for request parsing
- cors for cross-origin resource sharing

## License

This project is licensed under the ISC License."# back" 
