1) Create your mongo database and specify db url in /config/database.js
2) Run "npm i"
3) Run "npm run seed" to seed a database
4) Run "npm run start" to start a server

Endpoints:

POST /login:
Request:
body{
    username: ...,
    password: ...
}

Response:
{
    "success": ...,
    "user": {
        "_id": ...,
        "username": ...,
        "password": ...,
        "token": ...
    }
}


GET /:userId/tasks

Request:
headers{
    token: ...,
}

Response:
{
    "success": ...,
    "tasks": [
        {
            "_id": ...,
            "taskName": "...,
            "description": ...,
            "userId": ...,
            "dueDate": ...
        },
      ...
    ]
}


GET /:userId/tasks/:taskId

Request:
headers{
    token: ...,
}

Response:
{
    "success": ...,
    "user": {
        "_id": ...,
        "username": ...,
        "password": ...,
        "token": ...
    }
}


POST /:userId/tasks

Request:
headers{
    token: ...,
}

body{
    taskName: ...,
    description: ...,
    dueDate: ...
}

Response:
{
    "success": ...,
    "message": ...,
    "task": {
        "_id": ...,
        "taskName": ...,
        "description": ...,
        "userId": ...,
        "dueDate": ...,
    }
}

PUT /:userId/tasks/:taskId

Request:
headers{
    token: ...,
}

body{
    taskName: ...,
    description: ...,
    dueDate: ...
}

Response:
{
    "success": ...,
    "message": ...,
}


DELETE /:userId/tasks/:taskId

Request:
headers{
    token: ...,
}

Response:
{
    "success": ...,
    "message": ...,
}