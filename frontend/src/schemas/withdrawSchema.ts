import { z } from 'zod';
import { isValidBitcoin, isValidIBAN, isValidLuhn } from '../utils/paymentValidation';

export const withdrawSchema = z.object({
  amount: z.string()
    .min(1, 'Amount is required')
    .refine(val => Number(val) >= 10, {
      message: 'Minimum withdrawal is $10',
    }),
  paymentMethod: z.enum(['bitcoin', 'bank', 'card']),
  address: z.string().optional(),
  iban: z.string().optional(),
  cardNumber: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'bitcoin') {
    if (!data.address) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['address'], message: 'BTC address is required' });
    } else if (!isValidBitcoin(data.address)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['address'], message: 'Invalid Bitcoin address' });
    }
  }
  if (data.paymentMethod === 'bank') {
    if (!data.iban) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['iban'], message: 'IBAN is required' });
    } else if (!isValidIBAN(data.iban)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['iban'], message: 'Invalid IBAN format' });
    }
  }
  if (data.paymentMethod === 'card') {
    if (!data.cardNumber) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cardNumber'], message: 'Card number is required' });
    } else if (!isValidLuhn(data.cardNumber.replace(/\s/g, ''))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['cardNumber'], message: 'Invalid card number' });
    }
  }
});

export type WithdrawSchema = z.infer<typeof withdrawSchema>;
export type WithdrawErrors = Partial<Record<keyof WithdrawSchema, string>>;