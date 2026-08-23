"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommunicationSchema = exports.createCommunicationSchema = void 0;
const zod_1 = require("zod");
const communication_enums_1 = require("../enums/communication.enums");
exports.createCommunicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        companyId: zod_1.z.string().optional(),
        contactId: zod_1.z.string().optional(),
        leadId: zod_1.z.string().optional(),
        dealId: zod_1.z.string().optional(),
        senderId: zod_1.z.string().optional(),
        channel: zod_1.z.nativeEnum(communication_enums_1.CommunicationChannel),
        direction: zod_1.z.nativeEnum(communication_enums_1.CommunicationDirection),
        subject: zod_1.z
            .string()
            .max(255)
            .optional(),
        message: zod_1.z
            .string()
            .min(1)
            .max(5000),
        externalId: zod_1.z
            .string()
            .optional(),
    }),
});
exports.updateCommunicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        subject: zod_1.z
            .string()
            .max(255)
            .optional(),
        message: zod_1.z
            .string()
            .max(5000)
            .optional(),
        status: zod_1.z
            .nativeEnum(communication_enums_1.CommunicationStatus)
            .optional(),
        externalId: zod_1.z
            .string()
            .optional(),
        sentAt: zod_1.z
            .date()
            .optional(),
        deliveredAt: zod_1.z
            .date()
            .optional(),
        readAt: zod_1.z
            .date()
            .optional(),
    }),
});
//# sourceMappingURL=communication.validator.js.map