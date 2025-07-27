import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../prisma/client";
import { Regra } from "@prisma/client";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await prisma.usuario.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (user.regra !== Regra.admin) {
      return res.status(403).json({ error: "Apenas admins tem permissão para criar/atualizar usuários" });
    }

    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
