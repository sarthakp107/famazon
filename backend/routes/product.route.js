import express from "express";

import { deleteProduct, getProducts, postProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/" , getProducts);
router.post("/" , postProducts );
router.delete("/:id", deleteProduct );
router.put("/:id" , updateProduct );

export default router;