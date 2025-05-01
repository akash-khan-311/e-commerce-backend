import express from "express";
import { ProductRoutes } from "./app/config/modules/product/product.route";

const app = express();
app.use(express.json());

// Application Routes
app.use("/api/v1/product", ProductRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Your Server Is Working" });
});

export default app;
