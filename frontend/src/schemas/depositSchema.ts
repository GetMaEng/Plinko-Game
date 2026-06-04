import { z } from 'zod';
import { isValidBitcoin, isValidIBAN, isValidLuhn } from '../utils/paymentValidation';

export const depositSchema = z.object({
  amount: z.string().min(1, 'Amount is required').refine(val => Number(val) >= 1, {
    message: 'Amount must be at least $1',
  }),
  paymentMethod: z.enum(['bitcoin', 'bank', 'card']),
  address: z.string().optional(),
  iban: z.string().optional(),
  cardNumber: z.string().optional(),
}).superRefine((data, ctx) => {
  // Only validate the field that matches selected payment method
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

export type DepositSchema = z.infer<typeof depositSchema>;
export type DepositErrors = Partial<Record<keyof DepositSchema, string>>;