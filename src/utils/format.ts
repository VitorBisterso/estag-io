export function formatMaskedCurrency(maskedCurrency: string | number) {
   const str = String(maskedCurrency);
   return (str.includes('R$') ? str.slice(3) : str)
      .replaceAll('.', '')
      .replaceAll(',', '.');
}

export function intlCurrencyFormatter() {
   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   });
}
