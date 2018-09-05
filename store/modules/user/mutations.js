import types from './types';

export default {
    [types.USER_AUTHENTICATION](state, userAuth) {
        state.userAuth = userAuth;
    },
    [types.USER_PROFILE](state, profile) {
        if (state.userAuth)
            state.userAuth.profile = profile;
    },
    [types.USER_LIST](state, list) {
        state.list = list;
    },
    [types.USER_PAGINATION](state, pagination) {
        state.pagination = pagination;
    },
    [types.USER_DETAIL](state, detail) {
        state.detail = detail;
    }
};
