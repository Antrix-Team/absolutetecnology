import { Router } from 'express';
import { body } from 'express-validator';
import verifyToken from '../../middlewares/tokenUserAccess.js';
import { CreateSubcategory } from '../../controllers/subcategory/CreateSubcategoryController.js';
import { GetSubcategories, GetSubcategory, DeleteSubcategory } from '../../controllers/subcategory/getAndDeleteSubcategory.js';
import { validationMiddleware } from '../../middlewares/validationMiddleware.js';
import CategoryModel from '../../models/category/categoryModel.js';

const subcategoryRouter = Router();

subcategoryRouter.post(
  '/subcategories',
  verifyToken, 
  body('subcategory').notEmpty().isString(), 
  body('description').notEmpty().isString(), 
  body('categoryId').notEmpty().isMongoId().custom(async (value) => {
    const category = await CategoryModel.findById(value);
    if (!category) {
      throw new Error('La categoría especificada no existe.');
    }
  }),
  validationMiddleware, 
  CreateSubcategory 
);

subcategoryRouter.get('/subcategories', verifyToken, GetSubcategories);
subcategoryRouter.get('/subcategories/:id', verifyToken, GetSubcategory);
subcategoryRouter.delete('/subcategories/:id', verifyToken, DeleteSubcategory);

export default subcategoryRouter;
