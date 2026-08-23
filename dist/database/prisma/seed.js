"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_service_1 = __importDefault(require("../prisma.service"));
async function main() {
    console.log("Starting database seed...");
    // Seed data will be added later.
    console.log("Database seed completed.");
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma_service_1.default.$disconnect();
});
//# sourceMappingURL=seed.js.map