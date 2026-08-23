"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const department_service_1 = require("../services/department.service");
class DepartmentController {
    service = new department_service_1.DepartmentService();
    create = async (req, res) => {
        const tenantId = req.user.tenantId;
        const result = await this.service.create(tenantId, req.body);
        return res
            .status(201)
            .json(result);
    };
    getAll = async (req, res) => {
        const tenantId = req.user.tenantId;
        const result = await this.service.getAll(tenantId);
        return res.json(result);
    };
    getById = async (req, res) => {
        const result = await this.service.getById(req.params.id);
        return res.json(result);
    };
    update = async (req, res) => {
        const result = await this.service.update(req.params.id, req.body);
        return res.json(result);
    };
    delete = async (req, res) => {
        await this.service.delete(req.params.id);
        return res.json({
            message: "Department deleted successfully."
        });
    };
}
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map