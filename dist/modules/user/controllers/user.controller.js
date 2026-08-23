"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    service = new user_service_1.UserService();
    create = async (req, res) => {
        try {
            const result = await this.service.create(req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };
    getAll = async (req, res) => {
        const users = await this.service.getAll(req.user.tenantId);
        return res.json(users);
    };
    getById = async (req, res) => {
        try {
            const user = await this.service.getById(req.params.id);
            return res.json(user);
        }
        catch (error) {
            return res.status(404).json({
                message: error.message
            });
        }
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
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map