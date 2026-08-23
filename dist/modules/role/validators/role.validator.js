"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPermissionSchema = exports.updateRoleSchema = exports.createRoleSchema = void 0;
const zod_1 = require("zod");
exports.createRoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(2).max(100),
        code: zod_1.z.string().trim().min(2).max(50),
        description: zod_1.z.string().max(500).optional(),
    })
});
exports.updateRoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(2).max(100).optional(),
        code: zod_1.z.string().trim().min(2).max(50).optional(),
        description: zod_1.z.string().max(500).optional(),
        status: zod_1.z.enum([
            "ACTIVE",
            "INACTIVE",
            "DELETED",
        ]).optional(),
    }),
});
exports.assignPermissionSchema = zod_1.z.object({
    body: zod_1.z.object({
        roleId: zod_1.z.string().cuid(),
        permissionIds: zod_1.z.array(zod_1.z.string().cuid()).min(1),
    }),
});
//# sourceMappingURL=role.validator.js.map