# docs/05-Backend-Architecture.md

# Backend Architecture

The backend follows a layered enterprise architecture using the Repository Pattern.

Every request passes through a fixed sequence of layers.

---

# Complete Request Flow

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

Service

↓

Repository

↓

Prisma ORM

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

# Layer Responsibilities

## Router

Maps HTTP endpoints.

Never contains business logic.

---

## Middleware

Responsible for

Authentication

Authorization

Uploads

Rate Limiting

Validation (when applicable)

Logging

---

## Controller

Receives validated requests.

Calls the appropriate service.

Formats responses.

Controllers never access the database.

---

## Service

Contains business logic.

Examples

Registration

Authentication

Lead Assignment

Pipeline Movement

Notification Rules

Services never know HTTP details.

---

## Repository

Only layer allowed to communicate with Prisma.

Responsible for

Create

Update

Delete

Queries

Transactions

No business rules should exist here.

---

## Prisma

Database abstraction layer.

Handles SQL generation.

---

# Module Structure

Every backend module follows

routes/

controllers/

services/

repositories/

dto/

middleware/

constants/

types/

validations/

---

# Architecture Principles

Controllers are thin.

Business logic stays inside services.

Repositories contain database operations only.

Modules remain independent.

Cross-cutting utilities belong inside shared/.
