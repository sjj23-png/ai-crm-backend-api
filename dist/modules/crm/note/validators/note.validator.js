"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteSchema = exports.createNoteSchema = void 0;
const zod_1 = require("zod");
const create_note_dto_1 = require("../dto/create-note.dto");
const update_note_dto_1 = require("../dto/update-note.dto");
exports.createNoteSchema = zod_1.z.object({
    body: create_note_dto_1.CreateNoteSchema
});
exports.updateNoteSchema = zod_1.z.object({
    body: update_note_dto_1.UpdateNoteSchema
});
//# sourceMappingURL=note.validator.js.map