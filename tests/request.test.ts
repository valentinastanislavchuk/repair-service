import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../src/app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Create Request", () => {
  it("should create request with status new", async () => {
    const response = await request(app)
      .post("/requests")
      .send({
        clientName: "Test",
        phone: "123",
        address: "Test address",
        problemText: "Problem"
      });

    expect(response.status).toBe(302);

    const created = await prisma.request.findFirst({
      where: { clientName: "Test" }
    });

    expect(created?.status).toBe("new");
  });
});
