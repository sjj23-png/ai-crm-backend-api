# docs/06-Application-Flow.md

# Complete Application Flow

This document explains how the application behaves from the moment a user opens the website.

---

# Startup Flow

Browser

↓

main.tsx

↓

App.tsx

↓

AppProviders

↓

Theme Initialization

↓

TanStack Query Initialization

↓

Router Initialization

↓

Protected Route Check

↓

Page Rendering

---

# Authentication Flow

Login Page

↓

React Hook Form

↓

Zod Validation

↓

useLogin()

↓

Auth Service

↓

Auth API

↓

Axios Client

↓

Backend

↓

JWT Response

↓

Storage Service

↓

Authentication Store

↓

Navigate Dashboard

---

# Registration Flow

Registration Form

↓

React Hook Form

↓

Zod Validation

↓

Logo Selection

↓

FormData

↓

Axios

↓

Backend

↓

Upload Middleware

↓

Storage Module

↓

Tenant Creation

↓

Owner Creation

↓

Response

↓

Redirect Login

---

# Protected Page Flow

Open Page

↓

Check Access Token

↓

Valid?

↓

Yes

↓

Render Page

↓

No

↓

Redirect Login

---

# API Flow

Component

↓

Hook

↓

Service

↓

API

↓

Axios

↓

Backend

↓

Response

↓

TanStack Query Cache

↓

Component Update

---

# File Upload Flow

User Selects File

↓

Browser File Object

↓

FormData

↓

Axios Multipart Request

↓

Express Route

↓

Multer Middleware

↓

Storage Service

↓

uploads/

↓

Database URL Saved

↓

Frontend Receives URL
