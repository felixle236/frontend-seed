import types from './types';

export default {
    [types.USER.USERS](state, list) {
        state.users = list;
    },
    [types.USER.PAGINATION](state, pagination) {
        state.pagination = pagination;
    },
    [types.USER.USER](state, detail) {
        state.user = detail;
    }
};
