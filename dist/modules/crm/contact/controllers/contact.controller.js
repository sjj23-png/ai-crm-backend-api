"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("../services/contact.service");
class ContactController {
    service = new contact_service_1.ContactService();
    create = async (req, res) => {
        try {
            const result = await this.service.create({
                ...req.body,
                tenantId: req.user.tenantId,
            });
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
    getAll = async (req, res) => {
        const result = await this.service.getAll(req.user.tenantId);
        return res.json(result);
    };
    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.id);
            return res.json(result);
        }
        catch (error) {
            return res.status(404).json({
                message: error.message,
            });
        }
    };
    companyContacts = async (req, res) => {
        const result = await this.service.getCompanyContacts(req.params.companyId);
        return res.json(result);
    };
    update = async (req, res) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            return res.json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
    delete = async (req, res) => {
        const result = await this.service.delete(req.params.id);
        return res.json(result);
    };
}
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map