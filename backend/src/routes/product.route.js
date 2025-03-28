import express from "express"
import { createProduct, deleteProduct, getAllProducts, getSingleProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/",isAuthenticated,isAdmin,createProduct)
router.get("/",getAllProducts)
router.get("/:id",getSingleProduct)
router.delete("/:id",isAuthenticated,isAdmin,deleteProduct)

export default router;