import { Router } from "express";
import upload from "../../middlewares/uploadImage.js";
import verifyToken from "../../middlewares/tokenUserAccess.js";
import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  GetProducts,
  UpdateImageProduct,
  UpdateProduct,
} from "../../controllers/product/ProductController.js";

const productRouter = Router();

productRouter.get("/products", verifyToken, GetProducts);
productRouter.get("/products/:id", verifyToken, GetProduct);
productRouter.post(
  "/products",
  verifyToken,
  upload.single("image"),
  CreateProduct
);
productRouter.put("/products/:id", verifyToken, UpdateProduct);
productRouter.put(
  "/products/upload/:id",
  verifyToken,
  upload.single("image"),
  UpdateImageProduct
);

productRouter.delete("/products/:id", verifyToken, DeleteProduct);

export default productRouter;
