"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForMaster = exports.done = exports.take = exports.cancel = exports.assign = exports.getAll = exports.create = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const create = async (data) => {
    return prisma.request.create({
        data,
    });
};
exports.create = create;
const getAll = async (status) => {
    return prisma.request.findMany({
        where: status ? { status: status } : {},
        include: { assignedTo: true },
    });
};
exports.getAll = getAll;
const assign = async (id, masterId) => {
    return prisma.request.update({
        where: { id },
        data: {
            status: "assigned",
            assignedToId: masterId,
        },
    });
};
exports.assign = assign;
const cancel = async (id) => {
    return prisma.request.update({
        where: { id },
        data: { status: "canceled" },
    });
};
exports.cancel = cancel;
const take = async (id, masterId) => {
    const result = await prisma.$executeRaw `
    UPDATE "Request"
    SET status = 'in_progress'
    WHERE id = ${id}
      AND status = 'assigned'
      AND "assignedToId" = ${masterId}
  `;
    return result; // если 1 → успех, если 0 → конфликт
};
exports.take = take;
const done = async (id) => {
    return prisma.request.update({
        where: { id },
        data: { status: "done" },
    });
};
exports.done = done;
const getForMaster = async (masterId) => {
    return prisma.request.findMany({
        where: { assignedToId: masterId },
    });
};
exports.getForMaster = getForMaster;
