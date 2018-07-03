export const state = () => ({
    userAuthKey: 'userAuth',
    userAuth: null
});

export const mutations = {
    SET_USER_AUTH: function(state, userAuth) {
        state.userAuth = userAuth;
        if (state.userAuth)
            state.userAuth.version = 1;
        if (process.browser)
            setCookie(state.userAuthKey, state.userAuth, 15);
    }
};

export const actions = {
    nuxtServerInit({state}, {req}) {
        if (req.headers.cookie) {
            let userAuth = getCookie(state.userAuthKey, req.headers.cookie);
            if (userAuth) {
                userAuth = JSON.parse(userAuth);
                if (userAuth && userAuth.version === 1)
                    state.userAuth = userAuth;
            }
        }
    }
};

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + JSON.stringify(cvalue) + ';' + expires + ';path=/';
}

function getCookie(cookieName, stringCookie) {
    let strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie);
    if (!strCookie)
        return null;
    return unescape(strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, '') : '');
}
