import express from "express";
import routesUserAccess from "./routes/userRoutes/userAccessRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import mongodbConnect from "./database/mongodb.js";
import productRouter from "./routes/productRoutes/productRoutes.js";

dotenv.config();

const server = express();

mongodbConnect();

server.use(cors());

const PORT = process.env.PORT;

server.use(express.json());

server.use("/api", routesUserAccess);
server.use("/api", productRouter);

server.listen(PORT, () =>
  console.log(`RUN server in : http://localhost:${PORT}`)
);
