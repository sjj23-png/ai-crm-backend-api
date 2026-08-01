# docs/09-RBAC-System.md

# Role Based Access Control (RBAC)

The CRM uses a tenant-aware RBAC system.

Every organization owns its own users, roles, and permissions.

---

# Permission Hierarchy

Tenant

↓

Roles

↓

Permissions

↓

Users

↓

Protected APIs

---

# Database Relationships

Tenant

↓

Role

↓

RolePermission

↓

Permission

↓

User

↓

UserPermission

---

# Authorization Flow

Authenticated User

↓

JWT Verified

↓

Load User

↓

Load Tenant

↓

Load Role

↓

Load Permissions

↓

Permission Middleware

↓

Allow / Deny Request

---

# Types of Permissions

Module Access

Create

Read

Update

Delete

Export

Import

Approve

Assign

Manage

---

# Authorization Middleware

Every protected API follows

Authentication

↓

Tenant Validation

↓

Permission Validation

↓

Business Logic

---

# Advantages

* Independent tenant security
* Fine-grained permissions
* Easy role customization
* Enterprise scalability
* Future policy-based access support
