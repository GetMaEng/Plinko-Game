// Bitcoin
export const isValidBitcoin = (address: string): boolean => {
  const legacy = /^1[1-9A-HJ-NP-Za-km-z]{25,34}$/;
  const p2sh   = /^3[1-9A-HJ-NP-Za-km-z]{25,34}$/;
  const bech32 = /^bc1[ac-hj-np-z02-9]{6,87}$/i;
  return legacy.test(address) || p2sh.test(address) || bech32.test(address);
};

// IBAN
export const isValidIBAN = (iban: string): boolean => {
  const val = iban.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(val)) return false;
  const rearranged = val.slice(4) + val.slice(0, 4);
  const numeric = rearranged.split('').map(c =>
    isNaN(Number(c)) ? (c.charCodeAt(0) - 55).toString() : c
  ).join('');
  let remainder = 0;
  for (const digit of numeric) {
    remainder = (remainder * 10 + parseInt(digit)) % 97;
  }
  return remainder === 1;
};

// ABA Routing number
export const isValidRouting = (routing: string): boolean => {
  if (!/^\d{9}$/.test(routing)) return false;
  const d = routing.split('').map(Number);
  const checksum = 3*(d[0]+d[3]+d[6]) + 7*(d[1]+d[4]+d[7]) + (d[2]+d[5]+d[8]);
  return checksum % 10 === 0;
};

// Luhn algorithm (credit card)
export const isValidLuhn = (num: string): boolean => {
  const digits = num.replace(/\D/g, '');
  let sum = 0, alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i]);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

export const detectCardNetwork = (num: string): string | null => {
  if (/^4/.test(num)) return 'Visa';
  if (/^5[1-5]/.test(num) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/.test(num)) return 'Mastercard';
  if (/^3[47]/.test(num)) return 'American Express';
  if (/^6(?:011|5)/.test(num)) return 'Discover';
  return null;
};