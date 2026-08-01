# docs/03-Project-Structure.md

# Project Structure

The repository is organized by responsibility rather than by file type.

---

# Frontend    inside D:\A1codes\Chatgptdevelopment\Projects\AI-CRM\apps\web\webs

src/

## app/

Application bootstrap.

Responsible for:

* Providers
* Router
* Layouts
* Global initialization

---

## features/

Contains complete business modules.

Example:

auth/

users/

companies/

leads/

Every feature owns:

* API
* Hooks
* Services
* Types
* Validation
* Pages (if feature-specific)

---

## design-system/

Reusable UI library.

Contains:

* Buttons
* Inputs
* Cards
* Tables
* Modals
* Typography
* Theme
* Design Tokens

No business logic belongs here.

---

## services/

Global infrastructure services.

Examples:

* Axios Client
* Storage Service
* Logger
* API Utilities

---

## hooks/

Reusable hooks shared across features.

---

## stores/

Global client state.

Example:

* Authentication
* Sidebar
* Theme

---

## validations/

Shared validation utilities.

---

## utils/

Pure helper functions.

No business logic.

---

## config/

Application configuration.

Example:

* Authentication
* Environment
* Routes
* Constants

---

# Backend

src/

## modules/

Every backend business module lives here.

Example:

auth/

tenant/

user/

company/

storage/

Each module contains:

* routes/
* controllers/
* services/
* repositories/
* dto/
* validations/
* middleware/
* types/
* constants/

---

## shared/

Common infrastructure shared across every module.

Contains:

* Errors
* Middleware
* Logger
* Response Helpers
* Utilities

---

## config/

Configuration files.

---

## prisma/

Database schema and migrations.

---

## uploads/

Temporary local file storage.

Future cloud storage will replace only the Storage Service while keeping the rest of the application unchanged.

---

# Dependency Direction

Frontend Components

↓

Feature Hooks

↓

Feature Services

↓

API Client

↓

Backend Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Prisma

↓

Database

No layer should bypass the next layer in the chain.
