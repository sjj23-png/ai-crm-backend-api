"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../../../../modules/auth/auth.routes"));
const tenant_module_1 = __importDefault(require("../../../../modules/tenant/tenant.module"));
const organization_module_1 = __importDefault(require("../../../../modules/organization/organization.module"));
const department_module_1 = __importDefault(require("../../../../modules/department/department.module"));
const team_module_1 = __importDefault(require("../../../../modules/team/team.module"));
const designation_module_1 = __importDefault(require("../../../../modules/designation/designation.module"));
const user_module_1 = __importDefault(require("../../../../modules/user/user.module"));
const role_module_1 = __importDefault(require("../../../../modules/role/role.module"));
const permission_module_1 = __importDefault(require("../../../../modules/permission/permission.module"));
const company_module_1 = __importDefault(require("../../../../modules/crm/company/company.module"));
const contact_module_1 = __importDefault(require("../../../../modules/crm/contact/contact.module"));
const lead_module_1 = __importDefault(require("../../../../modules/crm/lead/lead.module"));
const pipeline_module_1 = __importDefault(require("../../../../modules/crm/pipeline/pipeline.module"));
const stage_module_1 = __importDefault(require("../../../../modules/crm/stage/stage.module"));
const deal_module_1 = __importDefault(require("../../../../modules/crm/deal/deal.module"));
const activity_module_1 = __importDefault(require("../../../../modules/crm/activity/activity.module"));
const task_module_1 = __importDefault(require("../../../../modules/crm/task/task.module"));
const note_module_1 = __importDefault(require("../../../../modules/crm/note/note.module"));
const tag_module_1 = __importDefault(require("../../../../modules/crm/tag/tag.module"));
const communication_module_1 = __importDefault(require("../../../../modules/communication/communication.module"));
const notification_module_1 = __importDefault(require("../../../../modules/notification/notification.module"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Running"
    });
});
router.use("/auth", auth_routes_1.default);
router.use("/tenants", tenant_module_1.default);
router.use("/organizations", organization_module_1.default);
router.use("/departments", department_module_1.default);
router.use("/teams", team_module_1.default);
router.use("/designations", designation_module_1.default);
router.use("/users", user_module_1.default);
router.use("/roles", role_module_1.default);
router.use("/permissions", permission_module_1.default);
router.use("/companies", company_module_1.default);
router.use("/contacts", contact_module_1.default);
router.use("/leads", lead_module_1.default);
router.use("/pipelines", pipeline_module_1.default);
router.use("/stages", stage_module_1.default);
router.use("/deals", deal_module_1.default);
router.use("/activities", activity_module_1.default);
router.use("/tasks", task_module_1.default);
router.use("/notes", note_module_1.default);
router.use("/tags", tag_module_1.default);
router.use("/communications", communication_module_1.default);
router.use("/notifications", notification_module_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map