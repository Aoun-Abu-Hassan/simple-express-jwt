# Authentication API


------------



This is a simple Node.js authentication API built with Express, bcrypt, and jsonwebtoken.


### Features
- User sign up with email and password
- User login with email and password
- Passwords are hashed with bcrypt
- JSON Web Tokens (JWT) are used for authentication
- API endpoints are protected with JWT authentication






### Getting started
##### Prerequisites
- Node.js




### Installation
1. Clone the repository: git clone https://github.com/Aoun-Abu-Hassan/jwt-authentication-api
2. Install dependencies: npm install
3. Start the server: npm start


------------



### API Endpoints

##### POST /api/sign-up
**Registers a new user.**

**Request body**
```
{
"email":"User's email address(string)"
"password": "User's password(string)"
}
```

**Response**
```
{
"message":"User created"
"userId": "Unique identifier for the user"
}
```

------------


##### POST /api/sign-in
**Logs in an existing user.**

**Request body**
```
{
"email":"User's email address(string)"
"password": "User's password(string)"
}
```

**Response**
```
{
"token":"JWT authentication token"
"userId": "Unique identifier for the user"
}
```

------------


##### POST /api/dashboard
**Protected route that requires a valid JWT authentication token to access.**

**Request headers**
```
{
"Authorization":"YOUR_JWT_TOKEN_GOES HERE"
}
```

**Response**
```
{
"message": "Authorized",
"data": {
        "email": "email",
        "userId": "userId"
    }
}
```

------------


### JWT Authentication
All protected API endpoints require a JSON Web Token (JWT) to be included in the `Authorization` header of the request.

**Example:**
`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJ1c2VySWQiOiI1ZjEwZGQ1ZmMzMTU2YzFhY2IzOGI3NzAiLCJpYXQiOjE1OTYyNTk3OTYsImV4cCI6MTU5NjI2MzE5Nn0.qWgfc3qy3H9K91V7cFbTmT4mTXZ2Q39FWmDTjKsRx8M`

To obtain a JWT, send a POST request to /api/sign-in with the user's email and password.

**Middleware**
This API uses middleware to protect routes with JWT authentication.

To add a middleware function to a route, pass it as an argument to the route handler.

For example, to protect a route with the isAuth middleware, add it as a second argument to the route handler:

```js
router.get('/dashboard', isAuth, (req, res) => {
  // Your protected route logic here
});
```


------------

### Docker
You can also use Docker Compose to build and run this project. Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to define the services that make up your app in a `docker-compose.yaml` file and run them all with a single command.

**docker-compose.yaml file :**
```
version: '3.8'
services:
  server:
    build: ./
    volumes:
      - ./config.json:/app/config.json:ro
    ports:
      - "3000:3000" # host_machine_port:container_port
  
```

**Run the following command to run the server :**
```
docker-compose up -d
```

### Error handling
**The API returns errors in JSON format.**

**Example:**

`
{
  "message": "Validation failed",
  "data": [
    {
      "param": "email",
      "msg": "Invalid email address"
    }
  ]
}
`


------------



### Support
For support and questions, please join our Discord support server: https://discord.gg/hUefUsCtTd

### Contributing
If you have any suggestions or improvements, feel free to create a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.