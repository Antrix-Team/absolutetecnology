import { validationResult } from "express-validator";
import multer from "multer";

export const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const globalErrorMiddleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: err.message });
  } else if (err.message === "Unexpected end of form") {
    res.status(400).json({ message: "Imagen no encontrada" });
  } else {
    res.status(500).json({ message: err.message });
  }
};
