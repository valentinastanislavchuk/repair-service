import { Request, Response } from "express";
import * as service from "../services/request.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPage = (req: Request, res: Response) => {
  res.render("create");
};

export const createRequest = async (req: Request, res: Response) => {
  await service.create(req.body);
  res.redirect("/");
};

export const dispatcherPanel = async (req: Request, res: Response) => {
  const { status } = req.query;
  const requests = await service.getAll(status as string);
  const masters = await prisma.user.findMany({ where: { role: "master" } });

  res.render("dispatcher", { requests, masters });
};

export const assign = async (req: Request, res: Response) => {
  await service.assign(Number(req.params.id), Number(req.body.masterId));
  res.redirect("/dispatcher");
};

export const cancel = async (req: Request, res: Response) => {
  await service.cancel(Number(req.params.id));
  res.redirect("/dispatcher");
};

export const masterPanel = async (req: Request, res: Response) => {
  const user = (req.session as any).user;
  const requests = await service.getForMaster(user.id);
  res.render("master", { requests });
};

export const take = async (req: Request, res: Response) => {
  const user = (req.session as any).user;

  const updated = await service.take(Number(req.params.id), user.id);

  if (!updated) {
    return res.status(409).send("Заявка уже взята");
  }

  res.redirect("/master");
};

export const done = async (req: Request, res: Response) => {
  await service.done(Number(req.params.id));
  res.redirect("/master");
};
