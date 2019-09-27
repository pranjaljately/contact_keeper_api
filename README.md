# Contact Keeper

> A full stack contact manager created using MongoDB, Express, React and Node.js. Part of the "Modern React Front To Back" Udemy course.

## Usage

Install dependencies

```bash
npm install
npm run clientInstall
```

### Mongo connection setup

Edit your /config/default.json file to include the correct MongoDB URI

### Run Server

```bash
npm run dev     # Express & React :3000 & :5000 
npm run server & npm run client # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```

# API

A Node/Express REST API for contacts using JWT authentication. 

## Getting Started

```
  Open the config/default.json file and add your mongoURI and your jwtSecret
```

# API Usage & Endpoints

## Register a User [POST /api/users]

- Request: Add user and request JSON web token

  - Headers

        Content-type: application/json

  - Body

            {
              "name": "",
              "email": "",
              "password": ""
            }

- Response: 200 (application/json)

  - Body

          {
            "token": ""
          }

## Login with a User [POST /api/auth]

- Request: Login with credentials to recieve a JSON web token

  - Headers

        Content-type: application/json

  - Body

            {
              "email": "",
              "password": ""
            }

- Response: 200 (application/json)

  - Body

          {
            "token": ""
          }

## Get Contacts [GET /api/contacts]

- Request: Get all contacts of a specific user

  - Headers

        x-auth-token: YOUR_JWT

* Response: 200 (application/json)

  - Body

          {
            "contacts": []
          }

## Add New Contact [POST /api/contacts]

- Request: Add a new contact

  - Headers

        x-auth-token: YOUR_JWT
        Content-type: application/json

  - Body

            {
              "name": "",
              "email": "",
              "phone": "",
              "type": "" [personal or professional]
            }

- Response: 200 (application/json)

  - Body

          {
            "contact": {}
          }

## Update Contact [PUT /api/contacts/:id]

- Request: Update existing contact

  - Parameters

    - id: (number) - An unique identifier of the contact.

  - Headers

        x-auth-token: YOUR_JWT
        Content-type: application/json

  - Body

            {
              "name": "",
              "email": "",
              "phone": "",
              "type": "" [personal or professional]
            }

- Response: 200 (application/json)

  - Body

          {
            "contact": {}
          }

## Delete Contact [DELETE /api/contacts/:id]

- Request: Delete existing contact

  - Parameters

    - id: (number) - An unique identifier of the contact.

  - Headers

        x-auth-token: YOUR_JWT

* Response: 200 (application/json)

  - Body

          {
            "msg": "Contact deleted"
          }
