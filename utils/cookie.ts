
export function setCookie(cname: string, cvalue: string, expireSecond: number) {
    const d = new Date();
    d.setTime(d.getTime() + (expireSecond * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export function getCookie(cookieName: string, stringCookie: string) {
    const strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie);
    if (!strCookie)
        return undefined;
    return unescape(strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, '') : '');
};
