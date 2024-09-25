import { z } from "zod";
import { StripeCardElement, loadStripe } from "@stripe/stripe-js";

export const CreateSalesSchema = z.object({
  transactionuid: z.number().int().positive({ message: "Transaction UID must be a positive integer" }),
  sub_total: z.number().positive({ message: "Sub total must be a positive number" }).optional(),
  shipping: z.number().optional(),
  discount: z.number().optional(),
  total_amt: z.number().positive({ message: "Total amount must be a positive number" }),
  redeemCode: z.string().optional(),
  redeem_amt: z.number().optional(),
  grand_total: z.number().optional(),
  email: z.string().email(),
  cardElement: z.any(), // Ensure this is required
});