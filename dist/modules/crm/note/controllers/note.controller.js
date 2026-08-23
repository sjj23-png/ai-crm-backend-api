"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const note_service_1 = require("../services/note.service");
class NoteController {
    service = new note_service_1.NoteService();
    create = async (req, res) => {
        try {
            const result = await this.service.create(req.body);
            return res
                .status(201)
                .json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({
                message: error.message
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
            return res
                .status(404)
                .json({
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
            return res
                .status(400)
                .json({
                message: error.message
            });
        }
    };
    delete = async (req, res) => {
        try {
            const result = await this.service.delete(req.params.id);
            return res.json(result);
        }
        catch (error) {
            return res
                .status(400)
                .json({
                message: error.message
            });
        }
    };
}
exports.NoteController = NoteController;
//# sourceMappingURL=note.controller.js.map