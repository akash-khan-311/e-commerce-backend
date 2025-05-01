import { Types } from "mongoose";
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

const getAllProductsFromDB = async () => {
  const result = await Product.find({});
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const objectId = new Types.ObjectId(id);
  const result = await Product.aggregate([{ $match: { _id: objectId } }]);
  return result;
};

const updateProductIntoDB = async (
  id: string,
  productData: Partial<TProduct>,
) => {
  const objectId = new Types.ObjectId(id);
  const existingProduct = await Product.findOne({ _id: objectId });
  if (!existingProduct) {
    throw new Error("Product not found");
  }
  if (productData.name) {
    const productExists = await Product.findOne({ name: productData.name });
    if (productExists) {
      throw new Error("Product with this name already exists.");
    }
  }
  const result = await Product.findOneAndUpdate(
    { _id: objectId },
    productData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const options = { isDeleted: true };
  const objectId = new Types.ObjectId(id);
  const deletedProduct = await Product.aggregate([
    { $match: { isDeleted: true } },
  ]);
  if (deletedProduct) {
    throw new Error("Product not found");
  }
  const result = await Product.updateOne({ _id: objectId }, options);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
