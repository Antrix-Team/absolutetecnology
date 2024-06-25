import { Router } from "express";
import uploadImageProduct from "../../middlewares/uploadImage.js";
import verifyToken from "../../middlewares/tokenUserAccess.js";

import { CreateProduct } from "../../controllers/product/CreateProductController.js";

import { 
  GetProduct,
  GetProducts,
  DeleteProduct

 } from "../../controllers/product/GetAndDeleteProductController.js";

import { 
  UpdateProduct,
  UpdateImageProduct  
} from "../../controllers/product/UpdateProductController.js";

const productRouter = Router();

productRouter.get("/products", verifyToken, GetProducts);
productRouter.get("/products/:id", verifyToken, GetProduct);
productRouter.post(
  "/productsadd",
  verifyToken,
  uploadImageProduct.single("image"),
  CreateProduct
);
productRouter.put("/products/:id", verifyToken, UpdateProduct);
productRouter.put(
  "/products/upload/:id",
  verifyToken,
  uploadImageProduct.single("image"),
  UpdateImageProduct
);

productRouter.delete("/products/:id", verifyToken, DeleteProduct);

export default productRouter;
