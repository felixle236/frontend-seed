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

export function setCookie(cname, cvalue, expireSecond) {
    const d = new Date();
    d.setTime(d.getTime() + (expireSecond * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + JSON.stringify(cvalue) + ';' + expires + ';path=/';
};

export function getCookie(cookieName, stringCookie) {
    const strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie);
    if (!strCookie)
        return null;
    return unescape(strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, '') : '');
};
