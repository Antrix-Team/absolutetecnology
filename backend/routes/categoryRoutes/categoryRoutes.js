import { Router } from "express";
import verifyToken from "../../middlewares/tokenUserAccess.js";
import { CreateCategory } from "../../controllers/category/CreateCategoryController.js";

const categoryRouter = Router();

categoryRouter.post("/categories", verifyToken, CreateCategory);

export default categoryRouter;
