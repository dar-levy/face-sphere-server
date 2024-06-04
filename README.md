## Introduction

This project is the backend of Facesphere, an imaginary users app.

This is the implementation of Facesphere in Node.js.

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Populate the Database

    node seed.js

### Run the Tests

You're almost done! Run the tests to make sure everything is working:

    npm test

All tests should pass.

### Start the Server

    node index.js

This will launch the Node server on port 3900. If that port is busy, you can set a different port in config/default.json.

Open up your browser and head over to:

http://localhost:3900/api/profiles

You should see the list of profiles. That confirms that you have set up everything successfully.

### Swagger API Documentation

This project includes Swagger for API documentation. To view and interact with the API documentation, navigate to:

http://localhost:3900/api-docs

### Profile Routes

The following are the profile routes available in this project:

- **GET /api/profiles**: Retrieve a paginated list of profiles. Query parameters: `pageNumber`, `pageSize`.
- **GET /api/profiles/:id**: Retrieve a profile by its ID.
- **POST /api/profiles**: Create a new profile. Requires authentication.
- **PUT /api/profiles/:id**: Update a profile by its ID. Requires authentication.
- **DELETE /api/profiles/:id**: Delete a profile by its ID. Requires authentication and admin authorization.

### (Optional) Environment Variables

If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

On Mac:

    export face_sphere_jwtPrivateKey=yourSecureKey

On Windows:

    set face_sphere_jwtPrivateKey=yourSecureKey

### Configuration

The configuration for this project is located in the config folder. The `default.json` file contains various configuration settings, including a flag called `requiresAuth`. This flag indicates whether authentication is required for accessing certain routes. The default setting for this flag is `true`.

Example config/default.json:

```json
{
  "jwtPrivateKey": "unsecureKey",
  "db": "mongodb://localhost/face-sphere",
  "port": "3900",
  "requiresAuth": true
}
```

Make sure to review and adjust the configuration settings as needed for your environment.

