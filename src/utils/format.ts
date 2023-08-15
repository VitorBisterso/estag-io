// eslint-disable-next-line import/prefer-default-export
export function formatMaskedCurrency(maskedCurrency: string | number) {
   const str = String(maskedCurrency);
   return (str.includes('R$') ? str.slice(3) : str)
      .replaceAll('.', '')
      .replaceAll(',', '.');
}
