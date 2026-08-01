# docs/14-API-Standards.md

# API Standards

All APIs follow a common structure to simplify frontend integration and backend maintenance.

---

# Request Rules

* JSON for standard requests.
* multipart/form-data for file uploads.
* Authentication through JWT.
* RESTful endpoint naming.

---

# Success Response

Example

{
"success": true,
"message": "...",
"data": {}
}

---

# Error Response

Example

{
"success": false,
"message": "...",
"errors": []
}

---

# HTTP Status Codes

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# Pagination

Supports

page

limit

search

sort

order

filters

---

# File Upload

Request

multipart/form-data

↓

Multer

↓

Storage Module

↓

URL Stored

↓

Returned to Client

---

# API Naming

GET

/api/users

POST

/api/users

PUT

/api/users/:id

DELETE

/api/users/:id

Maintain the same convention across all modules.
