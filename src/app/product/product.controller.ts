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
    res.status(400).send({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  try {
    const result = await ProductService.getAllProductsFromDB(
      searchTerm as string
    );
    if (result) {
      res.send({
        success: true,
        message: "Products fetched successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await ProductService.getSingleProductFromDB(id);
    if (result) {
      res.send({
        success: true,
        message: "Product fetched successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedProductData = req.body.product;

    const result = await ProductService.updateProductIntoDB(
      id,
      updatedProductData
    );

    if (result) {
      res.send({
        success: true,
        message: "Product updated successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await ProductService.deleteProductFromDB(id);
    if (result) {
      res.status(200).send({
        success: true,
        message: "Product deleted successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};
export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
