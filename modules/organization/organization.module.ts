import { Router } from "express";
import { authGuard } from "../auth/guards/auth.guard";

import { DepartmentController } from "./controllers/department.controller";
import { TeamController } from "./controllers/team.controller";


const router = Router();

const department =
new DepartmentController();

router.post(
"/departments",
authGuard,
department.create
);

router.get(
"/departments",
authGuard,
department.getAll
);

router.get(
"/departments/:id",
authGuard,
department.getById
);

router.delete(
"/departments/:id",
authGuard,
department.delete
);




// Teams
const team =
new TeamController();

router.post(
"/teams",
authGuard,
team.create
);

router.get(
"/teams",
authGuard,
team.getAll
);

router.get(
"/teams/:id",
authGuard,
team.getById
);

// Designations 
import { DesignationController } from "./controllers/designation.controller";

const designation =
new DesignationController();

router.post(
"/designations",
authGuard,
designation.create
);

router.get(
"/designations",
authGuard,
designation.getAll
);

router.get(
"/designations/:id",
authGuard,
designation.getById
);



import { OrganizationController } from "./controllers/organization.controller";

const userOrganization =
  new OrganizationController();

router.put(
  "/users/:userId/organization",
  authGuard,
  userOrganization.assign
);

router.get(
  "/users/:userId/hierarchy",
  authGuard,
  userOrganization.hierarchy
);

export default router;

/* 
🚩 SCHEMA MARKER (Update Later)

You'll need these Prisma models later:

Department
Team
Designation

with relations to:

Tenant
User  */