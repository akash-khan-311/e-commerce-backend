import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const productExists = await product.isExists(productData.name);
  if (productExists) {
    throw new Error("Product with this name already exists.");
  }

  const result = await product.save();

  return result;
};

export const ProductService = {
  createProductIntoDB,
};
