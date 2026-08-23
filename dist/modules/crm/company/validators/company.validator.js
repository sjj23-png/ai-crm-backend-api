"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanySchema = exports.createCompanySchema = void 0;
const create_company_dto_1 = require("../dto/create-company.dto");
exports.createCompanySchema = create_company_dto_1.CreateCompanySchema;
exports.updateCompanySchema = create_company_dto_1.CreateCompanySchema.partial();
//# sourceMappingURL=company.validator.js.map