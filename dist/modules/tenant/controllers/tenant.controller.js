"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
const tenant_service_1 = require("../services/tenant.service");
const create_tenant_dto_1 = require("../dto/create-tenant.dto");
class TenantController {
    service = new tenant_service_1.TenantService();
    create = async (req, res) => {
        try {
            const data = create_tenant_dto_1.CreateTenantSchema.parse(req.body);
            const tenant = await this.service.createTenant(data);
            return res.status(201).json({
                success: true,
                data: tenant,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };
    update = async (req, res) => {
        try {
            const tenant = await this.service.update(req.params.id, req.body);
            return res.json(tenant);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
    getAll = async (_, res) => {
        const tenants = await this.service.getAll();
        return res.json(tenants);
    };
    getById = async (req, res) => {
        try {
            const tenant = await this.service.getById(req.params.id);
            return res.json(tenant);
        }
        catch (error) {
            return res.status(404).json({
                message: error.message,
            });
        }
    };
    delete = async (req, res) => {
        try {
            const result = await this.service.delete(req.params.id);
            return res.json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
}
exports.TenantController = TenantController;
//# sourceMappingURL=tenant.controller.js.map