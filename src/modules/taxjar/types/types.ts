import * as z from "zod";

export const TaxResponseSchema = z.object({
  tax: z.object({
    amount_to_collect: z.number(),
    taxable_amount: z.number(),
    shipping: z.number(),
    freight_taxable: z.boolean(),
    breakdown: z
      .object({
        line_items: z.array(
          z.object({
            id: z.string(),
            combined_tax_rate: z.number(),
          })
        ),
        shipping: z
          .object({
            combined_tax_rate: z.number(),
          })
          .optional(),
      })
      .optional(),
  }),
});

export const TaxCategorySchema = z.object({
  description: z.string(),
  name: z.string(),
  product_tax_code: z.string(),
});

export type TaxResponse = z.infer<typeof TaxResponseSchema>;
export type TaxCategory = z.infer<typeof TaxCategorySchema>;
