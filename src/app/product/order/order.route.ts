import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/create-order", OrderController.createOrder);
router.get("/all-orders", OrderController.getAllOrder);
router.get("/", OrderController.getSingleOrder);

export const OrderRoutes = router;
