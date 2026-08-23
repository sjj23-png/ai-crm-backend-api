"use strict";
/**
 * ============================================================================
 * FILE ROLE: Backend Auth Controller (HTTP Layer)
 *
 * CONNECTED FILES:
 *  - Called by / Imported in: modules/auth/auth.routes.ts
 *  - Calls / Imports: modules/auth/services/auth.service.ts (AuthService), express (Request, Response)
 *
 * DATA FLOW:
 *  - Inputs: Express HTTP Request (req.body containing credentials/DTOs, req.headers for token)
 *  - Outputs: Express HTTP Response (res.status().json() containing tokens, user object, or error messages)
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    authService = new auth_service_1.AuthService();
    register = async (req, res) => {
        try {
            const result = await this.authService.register(req.body, req.file);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
    login = async (req, res) => {
        try {
            const result = await this.authService.login(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({
                message: error.message,
            });
        }
    };
    logout = async (req, res) => {
        try {
            const result = await this.authService.logout(req.user.id);
            return res.json(result);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
    me = async (req, res) => {
        try {
            const user = await this.authService.me(req.user.id);
            return res.json(user);
        }
        catch (error) {
            return res.status(404).json({
                message: error.message,
            });
        }
    };
    refreshToken = async (req, res) => {
        try {
            const result = await this.authService.refreshToken(req.body.refreshToken);
            return res.json(result);
        }
        catch (error) {
            return res.status(401).json({
                message: error.message,
            });
        }
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map