# Nail Salon Booking System

This is a full stack Nail Salon Booking System. It's built with a MERN stack (MongoDB, Express, React and Node.js) and offers a variety of services to clients, while also providing an administrative interface for managing services, appointments and other features as admin.


## Features

* Secure User Registration and Authentication
* Service Discovery: Users can explore various services offered by the salon.
* Appointment Booking: Users can book appointments for services, with real-time availability updates.
* Admin Interface: Administrators can manage services, view all appointments, and manage other site content.
* Favorites: Users can view previous work from other clients and save them to their favorites.
* Contact Form: Users can send messages which can be viewed by administrators.

## Dependencies

- Server-side: Express, Mongoose, jsonwebtoken, bcryptjs, Joi, multer, cors, dotenv
- Client-side: React, React-Router-Dom, React-Bootstrap, React-DatePicker, Axios, jwt-decode
- Development: Nodemon, Node-Sass, Concurrently, Typescript
- Testing: Jest, Testing-library

## Installation

1. Clone the repository.
2. Install server-side dependencies: npm install
3. Install client-side dependencies: cd client && npm install
4. to Start the server and client together: npm run dev

Note: you need to provide this details to the .env files:

server/.env:

NODE_ENV=''
JWT_SECRET=''
MONGODB_URI=''
SERVER_PORT=''

root folder/.env:

PORT=3000
REACT_APP_API_URL=http://localhost:5000/api


## Available Scripts

- `npm run server`: Runs the server.
- `npm run client`: Runs the client-side application.
- `npm run dev`: Runs both server and client together.
- `npm run build`: Builds the client-side application for production.

## Administrator Access

To access administrative features:

login with this details:

- Email: gitalcohen92@gmail.com
- Password: 12345678

## License

[MIT License](LICENSE)