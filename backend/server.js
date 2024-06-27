import express from "express";
import routesUserAccess from "./routes/userRoutes/userAccessRoutes.js";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import mongodbConnect from "./database/mongodb.js";
import productRouter from "./routes/productRoutes/productRoutes.js";
import { globalErrorMiddleware } from "./middlewares/validationMiddleware.js";
import categoryRouter from "./routes/categoryRoutes/categoryRoutes.js";

dotenv.config();

const server = express();

mongodbConnect();

server.use(cors());

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use(express.json());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use("/api", routesUserAccess);
server.use("/api", productRouter);
server.use("/api", categoryRouter);

server.use(globalErrorMiddleware);

server.listen(PORT, () =>
  console.log(`RUN server in : http://localhost:${PORT}`)
);
