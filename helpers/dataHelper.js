export function convertToCurrency(value, option) {
    if (typeof value !== 'number')
        return '';

    if (!option)
        option = {};
    if (!option.format)
        option.format = 'en-US';
    if (!option.currency)
        option.currency = 'USD';

    return value.toLocaleString(option.format, {style: 'currency', currency: option.currency});
};
