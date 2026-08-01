# docs/08-Authentication-System.md

# Authentication System

The AI CRM authentication system is built using JWT Authentication, Refresh Tokens, Session Management, React Hook Form, Zod Validation, and TanStack Query.

The authentication module is designed to remain independent from every other business module.

---

# Authentication Architecture

Frontend

↓

Validation

↓

Auth Hook

↓

Auth Service

↓

API Layer

↓

Backend Route

↓

Controller

↓

Validation

↓

Service

↓

Repository

↓

Prisma

↓

Database

↓

JWT Generation

↓

HTTP Response

---

# Login Flow

User Opens Login Page

↓

Enters Email & Password

↓

React Hook Form collects values

↓

Zod validates input

↓

useLogin()

↓

AuthService.login()

↓

AuthApi.login()

↓

Axios POST Request

↓

Backend Authentication

↓

JWT Tokens Generated

↓

Frontend Storage Service

↓

Navigate Dashboard

---

# Registration Flow

Registration Form

↓

Organization Details

↓

Owner Details

↓

Company Logo

↓

FormData

↓

Multipart Request

↓

Upload Middleware

↓

Storage Service

↓

Tenant Created

↓

Owner User Created

↓

Response Returned

↓

Redirect Login

---

# Session Management

Access Token

* Used for API Authorization
* Sent with every authenticated request

Refresh Token

* Used to generate new Access Tokens
* Stored securely

Session

* Stored in database
* Can be revoked independently

---

# Authentication Components

Frontend

Login Page

Register Page

Forgot Password

Reset Password

Protected Route

Guest Route

Storage Service

Auth Store

---

Backend

Auth Routes

Auth Controller

Auth Service

Auth Repository

JWT Utility

Password Utility

Session Repository

---

# Authentication Principles

* Passwords are never stored as plain text.
* JWT Access Tokens are short-lived.
* Refresh Tokens support long sessions.
* Validation occurs before authentication.
* Authentication is independent of authorization.
