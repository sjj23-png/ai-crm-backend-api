# docs/12-Frontend-Request-Lifecycle.md

# Frontend Request Lifecycle

This document explains how every user action travels through the frontend until it reaches the backend.

The same lifecycle is followed throughout the entire application to ensure consistency and maintainability.

---

# Complete Request Flow

User

↓

React Component

↓

React Hook Form

↓

Zod Validation

↓

Feature Hook

↓

Feature Service

↓

API Layer

↓

Axios Client

↓

Backend

---

# Layer Responsibilities

## React Component

Responsible only for rendering the user interface.

Should never contain

* API calls
* Business logic
* Database logic

The component collects user interaction and delegates work.

---

## React Hook Form

Collects

* Input values
* Form state
* Validation state
* Dirty state
* Submission state

---

## Zod Validation

Validates all user input before an API request is created.

If validation fails

↓

Display errors

↓

Stop request

---

## Feature Hook

Acts as the communication layer between UI and business logic.

Example

useLogin()

useRegister()

useCreateLead()

Hooks manage

Loading

Error

Success

Mutation

Caching

---

## Feature Service

Contains feature-specific business logic.

Examples

Transform request payload

Store authentication

Prepare multipart requests

Handle redirects

No UI code exists here.

---

## API Layer

Responsible only for HTTP communication.

Example

loginApi()

registerApi()

createLeadApi()

Uses Axios Client.

---

## Axios Client

Global HTTP client.

Responsible for

Base URL

Headers

Authorization

Interceptors

Timeouts

Automatic token refresh

---

# Response Flow

Backend

↓

Axios

↓

API Layer

↓

Feature Service

↓

Feature Hook

↓

React Component

↓

UI Updated

---

# Engineering Rules

* Components never call Axios.
* Components never know API URLs.
* Components never manage authentication.
* Business logic belongs inside services.
* Hooks connect UI and business logic.
