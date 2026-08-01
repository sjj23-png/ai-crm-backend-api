import { Router } from "express";
import authRoutes from "../../../../modules/auth/auth.routes";


















import tenantModule from "../../../../modules/tenant/tenant.module";
import organizationModule from "../../../../modules/organization/organization.module";
import departmentModule from "../../../../modules/department/department.module";
import teamModule from "../../../../modules/team/team.module";

import userModule from "../../../../modules/user/user.module";
import roleModule from "../../../../modules/role/role.module";
import permissionModule from "../../../../modules/permission/permission.module";

import companyModule from "../../../../modules/crm/company/company.module";
import contactModule from "../../../../modules/crm/contact/contact.module";
import leadModule from "../../../../modules/crm/lead/lead.module";
import pipelineModule from "../../../../modules/crm/pipeline/pipeline.module";
import stageModule from "../../../../modules/crm/stage/stage.module";
import dealModule from "../../../../modules/crm/deal/deal.module";

import activityModule from "../../../../modules/crm/activity/activity.module";
import taskModule from "../../../../modules/crm/task/task.module";
import noteModule from "../../../../modules/crm/note/note.module";
import tagModule from "../../../../modules/crm/tag/tag.module";

import communicationModule from "../../../../modules/communication/communication.module";
import notificationModule from "../../../../modules/notification/notification.module";
const router = Router();
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running"
  });
});
router.use("/auth", authRoutes);
// router.use("/tenants", tenantModule);
// router.use("/organizations", organizationModule);
// router.use("/departments", departmentModule);
// router.use("/teams", teamModule);
// router.use("/users", userModule);
// router.use("/roles", roleModule);
// router.use("/permissions", permissionModule);
// router.use("/companies", companyModule);
// router.use("/contacts", contactModule);
// router.use("/leads", leadModule);
// router.use("/pipelines", pipelineModule);
// router.use("/stages", stageModule);
// router.use("/deals", dealModule);
// router.use("/activities", activityModule);
// router.use("/tasks", taskModule);
// router.use("/notes", noteModule);
// router.use("/tags", tagModule);
// router.use("/communications", communicationModule);
// router.use("/notifications", notificationModule);

































export default router;