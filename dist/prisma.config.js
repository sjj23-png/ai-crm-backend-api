"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("prisma/config");
exports.default = (0, config_1.defineConfig)({
    // Prisma 7 ke liye engine "classic" set karna zaroori hai
    engine: "classic",
    schema: 'database/prisma/schema.prisma',
    datasource: {
        url: (0, config_1.env)('DATABASE_URL'),
    },
});
//# sourceMappingURL=prisma.config.js.map