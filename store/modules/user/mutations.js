import types from './types';

export default {
    [types.USER_AUTHENTICATION](state, userAuth) {
        state.userAuth = userAuth;
    },
    [types.USER_PROFILE](state, profile) {
        if (state.userAuth)
            state.userAuth.profile = profile;
    },
    [types.USER_SIGNIN_MESSAGE](state, message) {
        state.signinMessage = message;
    },
    [types.USER_LIST](state, list) {
        state.userList = list;
    },
    [types.USER_PAGINATION](state, pagination) {
        state.userPagination = pagination;
    },
    [types.USER_DETAIL](state, detail) {
        state.userDetail = detail;
    }
};
