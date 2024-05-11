# CCTV management app

Easily track and manage your CCTV cameras.

![cctv image](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXFmeGRraHF3OWh3OXBteGNjcDNoM2UwbmJiOWRqbDl6dWZ4ZGM3byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pG9kMKdbJfQttjTkpb/giphy.gif)

## :bulb:Idea

The `CCTV management app` is a simple management CCTV app, designed for organizations, groups, or companies to manage their CCTV cameras and provide daily reporting on the installed CCTV. Users with specific roles can register the CCTV they oversee in the system and create reports based on the events captured by the CCTV cameras daily.

## 📜Contents

- CCTV management app contents
  - [🔍Stacks](#stacks)
  - [🛠️Installation](#️installation)
  - [:books: API Docs](#books-api-docs)

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

4. Create .env file called `app.env` and fill the following:

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

5. Create .env file called `db.env` and fill the following:

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

## :stars: Features

- Authentication and Authorization
- User management (CRUD)
- CCTV management (CRUD), pagination, filtering
- Report management (CRUD), pagination, filtering
- Detailed validations

## :books: API docs

- :book: **API Contents**

  - **User Section API**
    - [User login](#user-login-post-apiuserslogin)
    - [Add new user](#add-new-user-post-apiusers)
    - [Get list users](#get-list-users-get-apiusers)
    - [Edit user](#edit-user-patch-apiusersid)
    - [Delete user](#delete-user-delete-apiusersid)
  - **CCTV Section API**

    - [Add new CCTV](#add-new-cctv-post-apicctv-docs)
    - [Get and search CCTVs](#get-and-search-cctvs-get-apicctvreqquery)
    - [Get specific CCTV](#get-specific-cctv-get-apicctvcctv_id)
    - [Edit CCTV data](#edit-cctv-data-patch-apicctv)
    - [Delete CCTV](#delete-cctv-data-delete-apicctvcctv_id)

  - **Report Section API**
    - [Create new report](#add-new-report-post-apireports)
    - [Get and search reports on specific CCTV](#find-reports-on-specific-cctv-get-apireportsallcctvid)
    - [Get specific report](#find-specific-report-get-apireportsid)
    - [Edit report](#edit-specific-report-patch-apireportsid)
    - [Delete report](#delete-specific-report-patch-apireportsid)

By default, this app created one user superadmin.
The credetianls is based on value in your `app.env`

```
ADMIN_USER
ADMIN_PASS
```

## ROLES ENUM

- `superadmin`
- `admin`
- `maintainer`

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
// Need Authenticate and Only admin can add new User
requestHeaders = {Authorization: <superAdminToken>}

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
      - cannot create user more than 1 role "superadmin"
      - optional by default: "maintainer"
      - if provided, validate ENUM ("superadmin", "admin", "maintainer")
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

#### **Get list users (GET /api/users)**

```js
// Need Authenticate and only superadmin can get list users
requestHeaders = {Authorization: <superAdminToken>}

response = {
  message: "", // success message
  data: [
      {
          id: "",
          name: "",
          username: "",
          password: "",
          role: "",
          createdAt: "",
          updatedAt: "",
      },
      ...
  ]
};
```

#### **Edit user (PATCH /api/users/:id)**

```js
// Need Authenticate and Only admin can add new User
requestHeaders = {Authorization: <superAdminToken>}

requestBody = {
  name: String,
  /*
  validation:
      - optional
  */
  username: String,
  /*
  validation:
      - optional
      - unique
  */
  password: String,
  /*
  validation:
      - optional
      - minimum length 6
      - must contains uppercase, lettercase, digit and special characters
  */
  role: String,
  /*
  validation:
      - optional
      - cannot create user more than 1 role "superadmin"
      - optional by default: "maintainer"
      - if provided, validate ENUM ("superadmin", "admin", "maintainer")
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

#### **Delete user (DELETE /api/users/:id)**

```js
// Need Authenticate and Only admin can add new User
requestHeaders = {Authorization: <superAdminToken>}

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
// Need Authenticate and Only superadmin || admin role can register new CCTV
requestHeaders = {Authorization: <superAdminToken> || <adminToken>}

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
      - optional by default: "inactive"
      - if provided, validate ENUM ("active", "inactive")
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
requestHeaders = {Authorization: <allToken>}

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
  'active', 'inactive'
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

#### **Get specific CCTV (GET /api/cctv/:id)**

```js
// Need Authenticate and All user role can get and search CCTVs
requestHeaders = {Authorization: <allToken>}

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

#### **Edit CCTV data (PATCH /api/cctv/:id)**

```js
// Need Authenticate and Only superadmin || admin role can edit CCTV data
requestHeaders = {Authorization: <superAdminToken> || <adminToken>}

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
      - optional by default: "inactive"
      - if provided, validate ENUM ("active", "inactive")
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
  - Can only delete when CCTV's status is `inactive`

```js
// Need Authenticate and Only superadmin || admin role can delete CCTV data
requestHeaders = {Authorization: <superAdminToken> || <adminToken>}

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

## **Reports API**

#### **Add new report (POST /api/reports)**

```js
// Need Authenticate and superadmin || admin || maintainer role can register new Report
requestHeaders = {Authorization: <superAdminToken> || <adminToken> || <maintainerToken>}

requestBody = {
  description: String,
  /*
  validation:
      - optional
  */
  status: String,
  /*
  validation:
      - need to validated with this ENUM:
        ('investigate', 'suspicious, 'criminal_detected', 'clear')
      - by default: "investigate"
  */
};

response = {
  message: "", // success message
  data: {
    id: "",
    description: "",
    status: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
  },
};
```

#### **Find reports on specific CCTV (GET /api/reports/all/:cctvId)**

- user role `superadmin` or `admin` it will get all user reports
- user role `maintainer` it will get only owned reports

```js
requestHeaders = {Authorization: <allToken>}

  // all request query OPTIONAL
requestQuery = {
  userId: String,
  /*
  Filter based on owner
  */
  status: String,
  /*
  Filter based on status
  ('investigate', 'suspicious, 'criminal_detected', 'clear')
  */
  date: String,
  /*
  Filter based on exact date with format (DDDD-MM-YY)
  ex: ?date=2024-05-11
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
          description: "",
          status: "",
          owner: "",
          createdAt: "",
          updatedAt: "",
      },
      ...
  ]
};
```

#### **Find specific report (GET /api/reports/:id)**

```js
requestHeaders = {Authorization: <superAdminToken> || <adminToken> || <maintainerToken>}

response = {
  message: "", // success message
  data: {
    id: "",
    description: "",
    status: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
  },
};
```

#### **Edit specific report (PATCH /api/reports/:id)**

```js
// Need authenticate and only report owner can edit
requestHeaders = {Authorization: <reportOwnerToken>}

requestBody = {
  description: String,
  /*
  validation:
      - optional
  */
  status: String,
  /*
  validation:
      - need to validated with this ENUM:
        ('investigate', 'suspicious, 'criminal_detected', 'clear')
      - by default: "investigate"
  */
};

response = {
  message: "", // success message
  data: {
    id: "",
    description: "",
    status: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
  },
};
```

#### **Delete specific report (PATCH /api/reports/:id)**

```js
// Need authenticate and only report owner can delete
requestHeaders = {Authorization: <reportOwnerToken>}

response = {
  message: "", // success message
  data: {
    id: "",
    description: "",
    status: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
  },
};
```
