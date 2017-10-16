export const state = () => ({
    authUserKey: '',
    authUser: null
});

export const mutations = {
    SET_AUTH_USER: function(state, authUser) {
        state.authUser = authUser;
    }
};

export const actions = {
    nuxtServerInit({commit, state}, {req}) {
        state.authUserKey = `${process.env.systemType}.authUser`;

        if (req.headers.cookie) {
            let authUser = getCookie(state.authUserKey, req.headers.cookie);
            if (authUser) {
                authUser = JSON.parse(authUser);
                commit('SET_AUTH_USER', authUser);
            }
        }
    }
};

function getCookie(cookieName, stringCookie) {
    let strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie);
    if (!strCookie)
        return null;
    return unescape(strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, '') : '');
}
