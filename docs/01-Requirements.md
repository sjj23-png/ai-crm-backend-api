# docs/01-Requirements.md

# Project Requirements

## Functional Requirements

### Authentication & Onboarding

* **Organization Registration**: A self-service onboarding flow where a new organization signs up by providing Tenant details (name, code, email, phone, website, logo) and Owner details (ownerName, ownerEmail, password). This atomically registers the Tenant, creates a default Admin Role, and registers the Owner user.
* **Super Admin Portal**: System Administrators are registered/seeded directly in the database and have global access to view and manage all organizations/tenants.
* **Login**: Users authenticate with email and password to receive access and refresh tokens.
* **Logout**: Invalidate sessions and refresh tokens globally.
* **Refresh Token**: Refresh expired access tokens using a valid database-stored refresh token.
* **Forgot & Reset Password**
* **Email Verification**
* **Session Management**

---

### Tenant Management

* Tenant Creation (by Super Admin / Owner)
* Tenant Profile & Branding Settings
* Tenant Status Management (Active, Inactive, Suspended)

---

### User Management

* **User CRUD**: Tenant Owners and managers can add, update, and remove tenant users (team members) directly from their dashboard.
* User Profile
* Team Assignment
* Role Assignment
* Designation & Department Mapping
* Status Management (Active, Inactive, Suspended)

---

### RBAC

* Roles
* Permissions
* User Permissions
* Route Authorization
* API Authorization

---

### CRM

* Companies
* Contacts
* Leads
* Pipelines
* Stages
* Activities
* Tasks
* Communications
* Notes
* Tags

---

### Platform

* Dashboard
* Notifications
* Reports
* Audit Logs
* Settings
* File Upload
* Search
* Filters
* Export
* Import

---

## Non-Functional Requirements

* High performance
* Responsive UI
* Accessibility
* Secure authentication
* Modular architecture
* Strong validation
* Reusable components
* Scalable database
* Clean APIs
* Enterprise maintainability

---

## Future Scope

* AI Lead Scoring
* AI Chat Assistant
* AI Report Generation
* Workflow Automation
* Calendar Integration
* WhatsApp Integration
* Email Marketing
* Third-party Integrations
* Mobile Application
