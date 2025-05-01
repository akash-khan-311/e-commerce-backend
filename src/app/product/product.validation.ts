import { z } from "zod";

// Variant schema
const variantValidationSchema = z.object({
  type: z.string().min(1, "Variant type is required"),
  value: z.string().min(1, "Variant value is required"),
});

// Inventory schema
const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, "Quantity must be zero or more"),
  inStock: z.boolean(),
});

// Product schema
export const productValidationSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(15, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  variants: z
    .array(variantValidationSchema)
    .min(1, "At least one variant is required"),
  inventory: inventoryValidationSchema,
  isDeleted: z.boolean().optional().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default productValidationSchema;
