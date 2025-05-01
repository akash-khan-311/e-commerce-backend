import { Request, Response } from "express";
import { ProductService } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body.product;
    const validationProductData = productValidationSchema.parse(productData);
    const result = await ProductService.createProductIntoDB(
      validationProductData
    );

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
