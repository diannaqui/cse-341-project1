# Project 1 - cse-341

## Purpose

This project will provide an API for storing and retrieving information about contacts. These contacts will be stored in a MongoDB database and all interaction will happen through the API.

## Requirements

- The database stores the following for each contact: firstName, lastName, email, favoriteColor, and birthday.
- Node project successfully connects to MongoDB.
- API routes perform GET, POST, PUT, and DELETE.
- API Documentation using Swagger.
- API is published to Render and can be called from external sources.

## Initial Module List

- controllers/contacts.js - Contains the functions of the different endpoints.
- database.js - Contains the connection to the contacts API using MongoDB.
- routes/contacts.js - Call endpoints.

## Setup

- `npm i` Install the necessary dependencies mentioned in the package.json if they are not installed.
- `npm start` Connects to database using localhost 3000

## Other commands

- `npm run swagger` Creates the documentation using SWAGGER
