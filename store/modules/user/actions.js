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
        return storeUserAuthentication(commit, userAuth);
    },
    async signin({commit}, {email, password}) {
        commit(types.USER_SIGNIN_MESSAGE, '');
        const userAuth = await this.$axios.$post('/api/users/signin', {email, password}).catch(err => {
            commit(types.USER_SIGNIN_MESSAGE, err.message);
        });
        return storeUserAuthentication(commit, userAuth);
    },
    signout({commit}) {
        storeUserAuthentication(commit);
    }
};

function storeUserAuthentication(commit, userAuth) {
    if (userAuth && userAuth.expiresIn && userAuth.expiresIn > 0)
        setCookie('userAuth', userAuth, userAuth.expiresIn);
    else
        setCookie('userAuth', null, -1);

    commit(types.USER_AUTHENTICATION, userAuth);
    return userAuth;
}
