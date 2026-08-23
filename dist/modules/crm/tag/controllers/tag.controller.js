"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const tag_service_1 = require("../services/tag.service");
class TagController {
    service = new tag_service_1.TagService();
    create = async (req, res) => {
        try {
            const tag = await this.service.createTag(req.body);
            return res.status(201).json(tag);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    };
    getAll = async (req, res) => {
        const tags = await this.service.getTags(req.user.tenantId);
        return res.json(tags);
    };
    update = async (req, res) => {
        const tag = await this.service.updateTag(req.params.id, req.body);
        return res.json(tag);
    };
    delete = async (req, res) => {
        const tag = await this.service.deleteTag(req.params.id);
        return res.json(tag);
    };
}
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map