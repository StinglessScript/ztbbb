
export function formatPrice(
  value = 0,
  currencyFormat = 'vi-VN',
  option = {
    style: 'currency',
    currency: 'VND',
  }
) {
  return new Intl.NumberFormat(currencyFormat, option).format(value)
}

export const formatCurrency = (value) => {
    return value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

