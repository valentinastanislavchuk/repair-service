import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import * as service from "../src/services/request.service";

const prisma = new PrismaClient();

describe("Race condition test", () => {
  it("only one take should succeed", async () => {
    const master = await prisma.user.findFirst({
      where: { role: "master" }
    });

    const request = await prisma.request.create({
      data: {
        clientName: "Race",
        phone: "999",
        address: "Race",
        problemText: "Race",
        status: "assigned",
        assignedToId: master!.id
      }
    });

    const results = await Promise.all([
      service.take(request.id, master!.id),
      service.take(request.id, master!.id)
    ]);

    const successCount = results.filter(r => r === 1).length;
    expect(successCount).toBe(1);
  });
});

