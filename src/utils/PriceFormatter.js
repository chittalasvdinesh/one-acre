export const priceFormatter = (value) => {
    if (value >= 100) {
        const crores = (value / 100).toFixed(2);
        return `${crores} Cr`;
    }
    return `${value} Lakhs`;
};