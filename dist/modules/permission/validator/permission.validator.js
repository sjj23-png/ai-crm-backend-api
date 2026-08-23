"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePermissionSchema = exports.getPermissionSchema = exports.updatePermissionSchema = exports.createPermissionSchema = void 0;
const zod_1 = require("zod");
exports.createPermissionSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(2).max(100),
        code: zod_1.z.string().trim().min(2).max(100),
        module: zod_1.z.string().trim().min(2).max(100),
        description: zod_1.z.string().max(500).optional(),
    }),
});
exports.updatePermissionSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(2).max(100).optional(),
        code: zod_1.z.string().trim().min(2).max(100).optional(),
        module: zod_1.z.string().trim().min(2).max(100).optional(),
        description: zod_1.z.string().max(500).optional(),
        status: zod_1.z.enum([
            "ACTIVE",
            "INACTIVE",
            "DELETED",
        ]).optional(),
    }),
});
exports.getPermissionSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }),
});
exports.deletePermissionSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }),
});
//# sourceMappingURL=permission.validator.js.map