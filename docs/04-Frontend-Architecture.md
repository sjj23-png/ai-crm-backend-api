# docs/04-Frontend-Architecture.md

# Frontend Architecture

The frontend follows a layered, feature-based architecture where every layer has a single responsibility.

The objective is to keep business logic independent from UI, make every feature reusable, and support long-term scalability.

---

# Frontend Flow

Application Start

↓

main.tsx

↓

App.tsx

↓

AppProviders

↓

Theme Provider

↓

TanStack Query Provider

↓

Browser Router

↓

App Router

↓

Layouts

↓

Feature Pages

↓

Components

↓

Hooks

↓

Services

↓

API

↓

Backend

---

# Layer Responsibilities

## 1. App Layer

Location

src/app

Responsible for:

* Application bootstrap
* Providers
* Router
* Layouts
* Global initialization

No business logic should exist here.

---

## 2. Feature Layer

Location

src/features

Every business module owns its implementation.

Example

auth/

users/

companies/

leads/

tasks/

Each feature contains

* API
* Hooks
* Services
* Types
* Validations
* Pages
* Components (if feature-specific)

Features never directly depend on other features.

---

## 3. Design System

Location

src/design-system

Contains reusable UI components.

Examples

Button

Input

Card

Modal

Table

Typography

Theme

Tokens

Business logic is never written here.

---

## 4. Services

Location

src/services

Contains reusable infrastructure services.

Examples

Axios Client

Storage Service

Logger

API Utilities

---

## 5. Hooks

Reusable application logic shared across multiple modules.

---

## 6. Stores

Global client state.

Examples

Authentication

Sidebar

Theme

Notifications

---

## 7. Config

Contains application configuration.

Environment

Routes

Authentication

Constants

---

# Design Principles

* Components render UI only.
* Hooks manage state and actions.
* Services communicate with APIs.
* API layer performs HTTP requests.
* Feature modules remain independent.
* Shared code belongs outside features.
