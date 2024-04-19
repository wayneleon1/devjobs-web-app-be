import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import router from "./routes";
import cors from "cors";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {
  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  // Register API routes
  app.use("/api/v1/devjobs", router);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
    console.log("Database connected");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
