import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductByCategory,
  getSingleProduct
} from "../controllers/product.js";

const router = express.Router();

router.post("/create", addProduct);
router.get("/productByCategory/:catId", getProductByCategory);
router.get("/products", getAllProducts);
router.get("/productById/:productId", getSingleProduct);
export default router;
