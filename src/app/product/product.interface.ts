import { Model } from "mongoose";

export type TVariant = {
  type: string;
  value: string;
};
export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  tags: string[];
  category: string;
  variants: TVariant[];
  inventory: TInventory;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};

export type productMethods = {
  // eslint-disable-next-line no-unused-vars
  isExists(name: string): Promise<TProduct | null>;
};

export type ProductModel = Model<
  TProduct,
  Record<string, never>,
  productMethods
>;
