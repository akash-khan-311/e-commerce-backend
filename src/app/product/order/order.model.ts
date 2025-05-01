import mongoose from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Orders", orderSchema);
