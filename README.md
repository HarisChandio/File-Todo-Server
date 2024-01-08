# Express Todo API Documentation

This documentation provides information about a simple Express.js API for managing todos.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Get all todos](#get-all-todos)
  - [Get a specific todo](#get-a-specific-todo)
  - [Create a new todo](#create-a-new-todo)
  - [Update a todo](#update-a-todo)
  - [Delete a todo](#delete-a-todo)
- [Running the Server](#running-the-server)

## Installation
Clone the repository and install the dependencies using:

```bash
npm install
Usage
To run the server, use the following command:

bash
Copy code
npm start
Endpoints
Get all todos
http
Copy code
GET /todos
Response
json
Copy code
[
  {
    "id": 1,
    "title": "Sample Todo",
    "description": "This is a sample todo."
  },
  // ...
]
Get a specific todo
http
Copy code
GET /todos/:id
Response
json
Copy code
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo."
}
Create a new todo
http
Copy code
POST /todos
Request
json
Copy code
{
  "title": "New Todo",
  "description": "This is a new todo."
}
Response
json
Copy code
{
  "id": 2,
  "title": "New Todo",
  "description": "This is a new todo."
}
Update a todo
http
Copy code
PUT /todos/:id
Request
json
Copy code
{
  "title": "Updated Todo",
  "description": "This todo has been updated."
}
Response
json
Copy code
{
  "id": 1,
  "title": "Updated Todo",
  "description": "This todo has been updated."
}
Delete a todo
http
Copy code
DELETE /todos/:id
Response
json
Copy code
{
  "message": "Deleted successfully"
}
Running the Server
The server is configured to run on port 3000. You can access the API at http://localhost:3000.
