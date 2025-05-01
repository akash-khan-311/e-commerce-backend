import { Product } from "../product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model"; // Assuming you forgot to import this

const createOrderToDB = async (orderData: IOrder) => {
  const product = await Product.findById(orderData.productId);

  if (!product || product.isDeleted) {
    throw new Error("Product not found");
  }

  // Corrected condition: throw error if not in stock or quantity insufficient
  if (
    !product.inventory.inStock ||
    product.inventory.quantity < orderData.quantity
  ) {
    throw new Error("Product is out of stock or insufficient quantity");
  }

  // Decrease product quantity
  product.inventory.quantity -= orderData.quantity;

  // If quantity hits 0, set inStock to false
  if (product.inventory.quantity === 0) {
    product.inventory.inStock = false;
  }

  await product.save();

  // Create order
  const order = new Order(orderData);
  const result = await order.save();

  return result;
};

export const OrderService = {
  createOrderToDB,
};
