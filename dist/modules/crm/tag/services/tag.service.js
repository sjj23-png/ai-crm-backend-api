"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const tag_repository_1 = require("../repositories/tag.repository");
class TagService {
    repository = new tag_repository_1.TagRepository();
    async createTag(data) {
        const exists = await this.repository.findByName(data.tenantId, data.name);
        if (exists) {
            throw new Error("Tag already exists.");
        }
        return this.repository.create({
            ...data,
            publicId: "TAG-TODO"
        });
    }
    async getTags(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async updateTag(id, data) {
        return this.repository.update(id, data);
    }
    async deleteTag(id) {
        return this.repository.softDelete(id);
    }
}
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map