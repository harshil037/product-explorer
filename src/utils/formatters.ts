export function formatCurrency(amount: number): string {
  const exchangeRate = 83;
  const amountInINR = amount * exchangeRate;

  return `Rs. ${amountInINR.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

