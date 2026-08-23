# Implementation Plan - Organization & Owner Onboarding Registration

We will update the backend registration flow to support the standard SaaS onboarding schema sent by the frontend's sign-up page. When a user registers, the system will create a `Tenant` (Organization), an `Admin Role`, an `Owner User`, and a `UserProfile` in a single transaction.

## Proposed Changes

### Auth Module

---

#### [MODIFY] [register.dto.ts](file:///d:/A1codes/Chatgptdevelopment/Projects/AI-CRM/modules/auth/dto/register.dto.ts)

- Update `RegisterSchema` validation rules to parse the complete organization and owner onboarding payload:
  - Organization fields: `name`, `code` (optional), `email`, `phone` (optional), `website` (optional).
  - Owner fields: `ownerName`, `ownerEmail`, `password`, `confirmPassword`.
  - Refinement rule to verify that `password === confirmPassword`.

#### [MODIFY] [auth.repository.ts](file:///d:/A1codes/Chatgptdevelopment/Projects/AI-CRM/modules/auth/repositories/auth.repository.ts)

- Add helpers `findTenantByCode(code: string)` and `findTenantByEmail(email: string)` to verify uniqueness.
- Add `registerTenantAndOwner` using a database transaction (`prisma.$transaction`) to atomically create the `Tenant`, the default `ADMIN` `Role`, the owner `User`, and the corresponding `UserProfile`.

#### [MODIFY] [auth.service.ts](file:///d:/A1codes/Chatgptdevelopment/Projects/AI-CRM/modules/auth/services/auth.service.ts)

- Update `register(data: RegisterDto, file?: Express.Multer.File)`:
  - Parse inputs against the updated `RegisterSchema`.
  - Check if the owner's email, tenant's code, or tenant's email is already registered, throwing descriptive errors.
  - Compute a secure password hash.
  - Determine `logoUrl` from `file` if uploaded (`/uploads/tenant-logos/${file.filename}`).
  - Call `authRepository.registerTenantAndOwner` to write the records.

#### [MODIFY] [auth.controller.ts](file:///d:/A1codes/Chatgptdevelopment/Projects/AI-CRM/modules/auth/controllers/auth.controller.ts)

- Modify `register` handler to pass `req.body` and `req.file` to `this.authService.register`.

#### [MODIFY] [auth.routes.ts](file:///d:/A1codes/Chatgptdevelopment/Projects/AI-CRM/modules/auth/auth.routes.ts)

- Import `uploadTenantLogo` middleware.
- Bind `uploadTenantLogo.single("logo")` to the `/register` POST endpoint to parse incoming logo files.

---

## Verification Plan

### Automated Steps
- Run `npm run check` to ensure all TypeScript compile type checks pass successfully.
- Trigger a mock registration via Postman to verify database persistence.
