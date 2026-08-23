"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const note_repository_1 = require("../repositories/note.repository");
class NoteService {
    repository = new note_repository_1.NoteRepository();
    async create(dto) {
        return this.repository.create({
            ...dto,
            publicId: `NOT-${Date.now()}`
        });
    }
    async getAll(tenantId) {
        return this.repository.findAll(tenantId);
    }
    async getById(id) {
        const note = await this.repository.findById(id);
        if (!note) {
            throw new Error("Note not found.");
        }
        return note;
    }
    async update(id, dto) {
        await this.getById(id);
        return this.repository.update(id, dto);
    }
    async delete(id) {
        await this.getById(id);
        await this.repository.delete(id);
        return {
            message: "Note deleted successfully."
        };
    }
}
exports.NoteService = NoteService;
//# sourceMappingURL=note.service.js.map