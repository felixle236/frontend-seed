export const state = () => ({
    authUserKey: '',
    authUser: null
});

export const mutations = {
    SET_AUTH_USER: function(state, authUser) {
        state.authUser = authUser;
        if (state.authUser)
            state.authUser.version = 1;
        if (process.browser)
            setCookie(state.authUserKey, state.authUser, 15);
    }
};

export const actions = {
    nuxtServerInit({commit, state}, {req}) {
        state.authUserKey = `${process.env.systemType}.authUser`;
        if (req.headers.cookie) {
            let authUser = getCookie(state.authUserKey, req.headers.cookie);
            if (authUser) {
                authUser = JSON.parse(authUser);
                if (authUser && authUser.version === 1)
                    state.authUser = authUser;
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
