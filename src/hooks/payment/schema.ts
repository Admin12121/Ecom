import { z } from "zod"

export const CreateSalesSchema = z.object({
  transactionuid: z.number().int().positive({ message: "Transaction UID must be a positive integer" }),
  sub_total: z.number().positive({ message: "Sub total must be a positive number" }),
  shipping: z.number().optional(),
  discount: z.number().optional(),
  total_amt: z.number().positive({ message: "Total amount must be a positive number" }),
  redeemCode: z.string().optional(),
  redeem_amt: z.number().optional(),
  grand_total: z.number().optional(),
  email: z.string().email(), // Add email field
})
