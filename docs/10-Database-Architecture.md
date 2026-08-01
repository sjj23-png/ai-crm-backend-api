# docs/10-Database-Architecture.md

# Database Architecture

The backend uses MySQL with Prisma ORM.

The database is normalized and designed around a multi-tenant architecture.

---

# High-Level Entity Flow

Tenant

↓

Company

↓

Department

↓

Designation

↓

Team

↓

User

↓

Lead

↓

Contact

↓

Pipeline

↓

Stage

↓

Task

↓

Activity

↓

Communication

↓

Notification

↓

Audit Log

---

# Core Entities

Tenant

Represents an organization.

Owns every business resource.

---

User

Represents a system user.

Belongs to exactly one Tenant.

Assigned one Role.

---

Role

Defines access level.

Contains multiple Permissions.

---

Permission

Represents a single action.

Example

Lead.Create

Lead.Update

Lead.Delete

---

Lead

Potential customer.

Moves through Pipelines.

---

Contact

Represents an individual.

May belong to a Company.

---

Pipeline

Business workflow.

Contains multiple Stages.

---

Task

Assigned work.

Owned by Users.

---

Activity

Tracks every interaction.

---

# Database Principles

* Tenant isolation
* UUID/CUID identifiers
* Foreign key integrity
* Soft deletion where required
* Indexed searchable fields
* Transaction support
* Repository Pattern for all access
