import { Request, Response } from "express";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body.product;
    console.log({ productData });
    const result = await ProductService.createProductIntoDB(productData);

    if (result) {
      res.send({
        success: true,
        message: "Product created successfully",
        data: result,
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

export const ProductController = {
  createProduct,
};
