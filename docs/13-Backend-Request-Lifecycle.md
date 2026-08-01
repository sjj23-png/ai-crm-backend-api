# docs/13-Backend-Request-Lifecycle.md

# Backend Request Lifecycle

Every backend request follows the same sequence.

This guarantees predictable behavior across every module.

---

# Request Pipeline

HTTP Request

↓

Express Router

↓

Middleware

↓

Validation

↓

Controller

↓

Business Service

↓

Repository

↓

Prisma

↓

Database

↓

Repository

↓

Service

↓

Controller

↓

HTTP Response

---

# Router

Maps HTTP endpoints.

Never contains business logic.

---

# Middleware

Responsible for

Authentication

Authorization

Uploads

Logging

Rate Limiting

Validation

---

# Controller

Receives validated request.

Calls service.

Returns standardized response.

Controllers never use Prisma directly.

---

# Service

Contains business rules.

Examples

Register Tenant

Assign Lead

Generate Tokens

Create Notifications

Send Emails

---

# Repository

Responsible only for database communication.

Uses Prisma.

Contains

Create

Update

Delete

Find

Transactions

No business rules.

---

# Response

Every API returns a standardized structure.

Example

success

message

data

errors

metadata

---

# Engineering Rules

* Controllers are thin.
* Services own business logic.
* Repositories own database logic.
* Shared utilities belong in shared/.
* Every module follows the same architecture.
