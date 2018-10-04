import types from '../../mutation-types';
import {setCookie} from '../../../helpers/dataHelper';

export default {
    async findUsers({commit}, conditions) {
        if (!conditions)
            conditions = {};

        const data = await this.$axios.$get(`/api/users?keyword=${conditions.keyword || ''}&skip=${conditions.skip || ''}&limit=${conditions.limit || ''}`);
        commit(types.USER_LIST, data.results);
        commit(types.USER_PAGINATION, data.pagination);
        return data;
    },
    async getUser({commit}, id) {
        const user = await this.$axios.$get(`/api/users/${id}`);
        commit(types.USER_DETAIL, user);
        return user;
    },
    async signup({commit}, data) {
        const userAuth = await this.$axios.$post('/api/users/signup', data);
        storeUserAuthentication(commit, userAuth);
        return userAuth;
    },
    async signin({commit}, {email, password}) {
        const userAuth = await this.$axios.$post('/api/users/authenticate', {email, password});
        storeUserAuthentication(commit, userAuth);
        return userAuth;
    },
    signout({commit}) {
        storeUserAuthentication(commit);
    }
};

function storeUserAuthentication(commit, userAuth) {
    commit(types.USER_AUTHENTICATION, userAuth);

    if (userAuth)
        setCookie('userAuth', userAuth, 15);
    else
        setCookie('userAuth', null, -1);
}
