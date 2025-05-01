import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderService } from "./order.service";
import { Types } from "mongoose";

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body.order;
  try {
    const parsedOrderData = orderValidationSchema.parse(orderData);
    const convertedOrderData = {
      ...parsedOrderData,
      productId: new Types.ObjectId(parsedOrderData.productId),
    };
    const result = await OrderService.createOrderToDB(convertedOrderData);
    if (result) {
      res.send({
        success: true,
        message: "Order created successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};

export const OrderController = {
  createOrder,
};
