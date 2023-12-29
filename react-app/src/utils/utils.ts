const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatAsPrice = (price: number) => priceFormatter.format(price);

export const getToken = (tokenName: string) => localStorage.getItem(tokenName);
