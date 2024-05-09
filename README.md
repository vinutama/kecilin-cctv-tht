# Kecilin CCTV management app

CCTV management app is to maintain our cctv to be more trackable

![cctv image](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXFmeGRraHF3OWh3OXBteGNjcDNoM2UwbmJiOWRqbDl6dWZ4ZGM3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pG9kMKdbJfQttjTkpb/giphy.gif)

## 📜Contents

- Kecilin CCTV management app contents
  - [🔍Stacks](#stacks)
  - [🛠️Installation](#️installation)
  - [:books: API Docs](#api-docs)

## 🔍Stacks

Application Stacks:

- Makefile
- Express
- Node JS
- Mongo DB
- Mongoose ODM
- Docker
- Docker Compose

## 🛠️Installation

To run this app, follow this steps:

1. Make sure you have Makefile, Docker and Docker Compose installed and configured on your system.

2. Clone this repository:

   ```bash
   git clone https://github.com/vinutama/kecilin-cctv-tht.git
   ```

3. Navigate to the project directory:

   ```bash
   cd kecilin-cctv-tht
   ```

4. Create .Env file called `app.env` and fill the following:

   ```env
    DB_NAME=You desired database name
    DB_HOST=Database hosting on docker container
    DB_USER=Database root user name
    DB_PASSWORD=Database root user password
    DB_PORT=Database Port

    BCRYPT_SALT=Your desired bcrypt salt
    JWT_SECRET=Your JWR secret

    ADMIN_USER=Default created admin username
    ADMIN_PASS=Default created admin password
    (must contains lower case, upper case, number and special character)
   ```

5. Create .Env file called `db.env` and fill the following:

   ```env
    MONGO_INITDB_ROOT_USERNAME=Default DB Admin user MongoDB
    MONGO_INITDB_ROOT_PASSWORD=Default DB Admin password MongoDB
    MONGO_INITDB_DATABASE=Initialize database name that want to be created

    INIT_DB_USER=Must same with DB_USER defined on `app.env`
    INIT_DB_PASSWORD=Must same with DB_PASSWORD defined on `app.env`
   ```

6. Open your terminal and run:

   ```bash
   make fresh-start
   ```

   if you want to make sure to see the logs from the server run:

   ```bash
   make logs-web
   ```

   Wait server's container connected to MongoDB container

7. You are good to go! open the http://localhost:3000.

## :books: API docs

- **API Contents**
  - [User login](#user-login-post-apiuserslogin)
  - [Add new user](#add-new-user-post-apiusers)
  - [Add new CCTV](#add-new-cctv-post-apicctv-docs)
  - [Get and search CCTVs](#get-and-search-cctvs-get-apicctvreqquery)
  - [Get specific CCTV](#get-specific-cctv-get-apicctvcctv_id)
  - [Edit CCTV data](#edit-cctv-data-patch-apicctv)
  - [Delete CCTV](#delete-cctv-data-delete-apicctvcctv_id)

Kecilin CCTV Management App API docs:

By default, this app created one user admin.
The credetianls is from your `app.env`

```
ADMIN_USER
ADMIN_PASS
```

## **Users API**

#### **User login (POST /api/users/login)**

```js
requestBody = {
  username: String,
  /*
      validation:
          - required
  */
  password: String,
  /*
     validation:
          - required
          - minimum length 6
          - must contains uppercase, lettercase, digit and special characters
  */
};

response = {
  message: "", // success message
  data: {
    accessToken: "",
    id: "",
    username: "",
    role: "",
  },
};
```

#### **Add new user (POST /api/users)**

```js
// Need Authenticate and Only Admin can add new User
requestHeaders = {Authorization: <adminToken>}

requestBody = {
  name: String,
  /*
  validation:
      - required
  */
  username: String,
  /*
  validation:
      - required
      - unique
  */
  password: String,
  /*
  validation:
      - required
      - minimum length 6
      - must contains uppercase, lettercase, digit and special characters
  */
  role: String,
  /*
  validation:
      - optional by default: "User"
      - if provided, validate ENUM ("Admin", "Maintainer", "User")
  */
};

response = {
  message: "", // success message
  data: {
    accessToken: "",
    id: "",
    username: "",
    role: "",
  },
};
```

## **CCTV API**

#### **Add new CCTV (POST /api/cctv)**

```js
// Need Authenticate and Only Admin role can register new CCTV
requestHeaders = {Authorization: <adminToken>}

requestBody = {
  model: String,
  /*
  validation:
      - required
  */
  area: String,
  /*
  validation:
      - required
  */
  ipAddress: String,
  /*
  validation:
      - required
      - unique
      - must IPv4 format
  */
  status: String,
  /*
  validation:
      - optional by default: "Inactive"
      - if provided, validate ENUM ("Active", "Inactive")
  */
  notes: String,
  /*
  validation:
      - optional
  */
};

response = {
  message: "", // success message
  data: {
    id: "",
    model: "",
    area: "",
    ipAddress: "",
    status: "",
    notes: ""
    createdAt: "",
    updatedAt: "",
  },
};
```

#### **Get and search CCTVs (GET /api/cctv?<req.query>)**

```js
// Need Authenticate and All user role can get and search CCTVs
requestHeaders = {Authorization: <adminToken> || <maintainerToken> || <userToken>}

  // all request query OPTIONAL
requestQuery = {
  model: String,
  /*
  Filter based on model name (case-insensitive)
  */
  area: String,
  /*
  Filter based on area (case-insensitive)
  */
  ipAddress: String,
  /*
  Filter based on IP address (case-insensitive)
  */
  status: String,
  /*
  Filter based on status (case-sensitive)
  'Active', 'Inactive'
  */
  sort: String,
  /*
  Will set data sorted by createdAt
  'asc', 'desc
  By default is 'desc'
  */
  limit: Number,
  /*
  Will set limit returned row per page
  By default: 5
  */
  offset: Number,
  /*
  Will move to the page X
  By default: 1
  */
};

response = {
  message: "", // success message
  data: [
      {
          id: "",
          model: "",
          area: "",
          ipAddress: "",
          status: "",
          notes: ""
          createdAt: "",
          updatedAt: "",
      },
      ...
  ]
};
```

#### **Get specific CCTV (GET /api/cctv/:cctv_id)**

```js
// Need Authenticate and All user role can get and search CCTVs
requestHeaders = {Authorization: <adminToken> || <maintainerToken> || <userToken>}

response = {
  message: "", // success message
  data: {
      id: "",
      model: "",
      area: "",
      ipAddress: "",
      status: "",
      notes: ""
      createdAt: "",
      updatedAt: "",
  },
};
```

#### **Edit CCTV data (PATCH /api/cctv)**

```js
// Need Authenticate and Only Admin role can edit CCTV data
requestHeaders = {Authorization: <adminToken>}

  // All request body is OPTIONAL
requestBody = {
  model: String,
  /*
  validation:
      - required
  */
  area: String,
  /*
  validation:
      - required
      - unique
  */
  ipAddress: String,
  /*
  validation:
      - required
      - unique
      - must IPv4 format
  */
  status: String,
  /*
  validation:
      - optional by default: "Inactive"
      - if provided, validate ENUM ("Active", "Inactive")
  */
  notes: String,
  /*
  validation:
      - optional
  */
};

response = {
  message: "", // success message
  data: {
    id: "",
    model: "",
    area: "",
    ipAddress: "",
    status: "",
    notes: ""
    createdAt: "",
    updatedAt: "",
  },
};
```

#### **Delete CCTV data (DELETE /api/cctv/:cctv_id)**

- Validation rules:
  - Id must be exist
  - Can only delete when CCTV's status is Inactive

```js
// Need Authenticate and Only Admin role can delete CCTV data
requestHeaders = {Authorization: <adminToken>}

response = {
  message: "", // success message
  data: {
    id: "",
    model: "",
    area: "",
    ipAddress: "",
    status: "",
    notes: ""
    createdAt: "",
    updatedAt: "",
  },
};
```
