import { Request, Response, NextFunction } from "express";

export const authMiddleware =
  (role?: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req.session as any).user;

    if (!user) return res.redirect("/login");

    if (role && user.role !== role) {
      return res.status(403).send("Forbidden");
    }

    next();
  };
