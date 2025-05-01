import express from "express";
import { ProductRoutes } from "./app/product/product.route";
import bodyParser from "body-parser";
import { OrderRoutes } from "./app/product/order/order.route";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
// Application Routes
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/order", OrderRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Your Server Is Working" });
});

export default app;
