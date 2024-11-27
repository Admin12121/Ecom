import { z } from "zod";

export const CreateSalesSchema = z.object({
  transactionuid: z.string(),
  sub_total: z.number().positive({ message: "Sub total must be a positive number" }).optional(),
  shipping: z.number().optional(),
  discount: z.number().optional(),
  total_amt: z.number().positive({ message: "Total amount must be a positive number" }),
  email: z.string().email(),
  cardElement: z.any(),
});

export const redeemCodeSchema = z.object({
  code: z.string().min(1, "Redeem code is required"),
});