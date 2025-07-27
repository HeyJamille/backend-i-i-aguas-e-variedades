// types/express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number; // ou string, conforme seu caso
    }
  }
}
