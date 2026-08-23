"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues,
            });
        }
        const data = result.data;
        if (data.body) {
            req.body = data.body;
        }
        if (data.params) {
            req.params = data.params;
        }
        if (data.query) {
            req.query = data.query;
        }
        next();
    };
}
//# sourceMappingURL=validate.middleware.js.map