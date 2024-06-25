import { Router } from "express";
import upload from "../../middlewares/uploadImage.js";
import verifyToken from "../../middlewares/tokenUserAccess.js";
import {
  CreateProduct,
  GetProduct,
  GetProducts,
  UpdateImageProduct,
  UpdateProduct,
} from "../../controllers/product/ProductController.js";

const productRouter = Router();

productRouter.get("/product", verifyToken, GetProducts);
productRouter.get("/product/:id", verifyToken, GetProduct);
productRouter.post(
  "/product",
  verifyToken,
  upload.single("image"),
  CreateProduct
);
productRouter.put("/product", verifyToken, UpdateProduct);
productRouter.put("/product/upload/:id", verifyToken, UpdateImageProduct);

export default productRouter;
