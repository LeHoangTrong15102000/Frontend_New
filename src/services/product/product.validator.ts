import { z } from 'zod';

export const productValidator = z.object({
    name: z.string().min(1, 'Name is required'),
    sku: z.string().min(1, 'SKU is required'),
    price: z.string().min(1, 'Price is required'),
});

export type ProductValidatorType = z.infer<typeof productValidator>;
