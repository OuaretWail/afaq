export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-DZ', {
        style: 'currency',
        currency: 'DZD',
    }).format(price);
};
