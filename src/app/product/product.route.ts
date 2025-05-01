import express from "express";
import { ProductController } from "./product.controller";
import { OrderController } from "./order/order.controller";
const router = express.Router();

router.post("/create-product", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.get("/all-products", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);
router.delete("/:id", ProductController.deleteProduct);
router.post("/order", OrderController.createOrder);

export const ProductRoutes = router;
