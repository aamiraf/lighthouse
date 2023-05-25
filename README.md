# Device Management API

This Node.js application provides an API for managing devices in a manufacturing facility. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on devices.

## Features

- Get all devices: Retrieve a list of all devices along with their attributes.
- Get a specific device: Fetch detailed information about a specific device by ID.
- Add a new device: Create a new device and store it in the database.
- Update a device: Modify the attributes of an existing device.
- Delete a device: Remove a device from the system.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aamiraf/lighthouse.git
   ```
2. Start the server:

    ```bash
    npm install
    npm run start:dev
    ```

The API server will be running at http://localhost:4000.

## API Endpoints

- GET /devices: Retrieve a list of all devices.
- GET /devices/{id}: Get detailed information about a specific device.
- POST /devices: Add a new device with followin attributes in body.
    ```bash
     "name": "<device-name>",
     "ipAddress": "<device-ipaddress>",
     "manufacturerType": "<device-manufacturer>",
     "online": true/ false,
     "factoryName": "<factory-name>"
    ```
- PUT /devices/{id}: Update the attributes of a device with any of one following attribute in body.
    ```bash
     "name": "<device-name>",
     "ipAddress": "<device-ipaddress>",
     "manufacturerType": "<device-manufacturer>",
     "online": true/ false,
     "factoryName": "<factory-name>".
- DELETE /devices/{id}: Delete a device.

## Modeling Choice 

1. Using Node.js: Node.js is a popular JavaScript runtime that allows you to build scalable and efficient server-side applications. It provides a non-blocking, event-driven architecture that makes it well-suited for building APIs and handling concurrent requests. Node.js has a vast ecosystem of libraries and packages, making it easy to integrate with other tools and frameworks.

2. Using TypeScript: TypeScript is a typed superset of JavaScript that adds static types to the language. By using TypeScript, you gain the benefits of type checking during development, which helps catch errors and provides better code quality. TypeScript also enhances code editor tooling with autocompletion, code navigation, and refactoring support. It is especially useful for larger projects or teams, as it improves code maintainability and collaboration.

3. Using Mongoose: Mongoose is an Object Data Modeling (ODM) library for MongoDB. It provides a simple and elegant way to interact with MongoDB, defining schemas, models, and performing database operations. Mongoose simplifies database interactions, offers data validation, and provides middleware hooks for extending functionality. It also integrates well with TypeScript, providing type definitions and enhanced code completion.

4. Using MongoDB Atlas: MongoDB Atlas is a fully-managed cloud database service for MongoDB. It offers a scalable and reliable solution for hosting MongoDB databases without the need for infrastructure management. By using MongoDB Atlas, you can take advantage of automated backups, high availability, and horizontal scaling. It provides an easy setup process and seamless integration with Mongoose, allowing you to focus on developing your application rather than managing the database infrastructure.

5. These approaches were chosen for their combined benefits of flexibility, scalability, productivity, and ease of development. Node.js provides a fast and efficient runtime for building server-side applications, TypeScript enhances code quality and development experience, Mongoose simplifies MongoDB interactions, and MongoDB Atlas offers a reliable and managed database solution.

6. By adopting these approaches, you can build a robust and maintainable device management API that leverages the strengths of each technology to deliver a high-quality solution.