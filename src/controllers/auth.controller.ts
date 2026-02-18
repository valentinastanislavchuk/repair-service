import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loginPage = (req: Request, res: Response) => {
  res.render("login");
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const user = await prisma.user.findFirst({
    where: { name, password },
  });

  if (!user) return res.send("Invalid credentials");

  (req.session as any).user = user;

  if (user.role === "dispatcher") return res.redirect("/dispatcher");
  return res.redirect("/master");
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
