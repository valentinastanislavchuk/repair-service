import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (data: any) => {
  return prisma.request.create({
    data,
  });
};

export const getAll = async (status?: string) => {
  return prisma.request.findMany({
    where: status ? { status: status as any } : {},
    include: { assignedTo: true },
  });
};

export const assign = async (id: number, masterId: number) => {
  return prisma.request.update({
    where: { id },
    data: {
      status: "assigned",
      assignedToId: masterId,
    },
  });
};

export const cancel = async (id: number) => {
  return prisma.request.update({
    where: { id },
    data: { status: "canceled" },
  });
};

export const take = async (id: number, masterId: number) => {
  const result = await prisma.$executeRaw`
    UPDATE "Request"
    SET status = 'in_progress'
    WHERE id = ${id}
      AND status = 'assigned'
      AND "assignedToId" = ${masterId}
  `;

  return result; // если 1 → успех, если 0 → конфликт
};

export const done = async (id: number) => {
  return prisma.request.update({
    where: { id },
    data: { status: "done" },
  });
};

export const getForMaster = async (masterId: number) => {
  return prisma.request.findMany({
    where: { assignedToId: masterId },
  });
};
