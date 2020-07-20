import {setCookie} from '../../../helpers/dataHelper';
import types from '../../mutation-types';

export default {
    async login({commit}, {email, password}) {
        commit(types.USER_AUTH.SIGNIN_MESSAGE, '');
        const result = await this.$axios.$post('/api/v1/auth/login', {email, password}).catch(err => {
            commit(types.USER_AUTH.SIGNIN_MESSAGE, err.message);
        });
        return storeUserAuthentication(commit, result.data);
    },
    logout({commit}) {
        storeUserAuthentication(commit);
    }
};

function storeUserAuthentication(commit, userAuth) {
    if (userAuth && userAuth.accessToken)
        setCookie('auth', userAuth, 24 * 60 * 60);
    else
        setCookie('auth', null, -1);

    commit(types.USER_AUTH.PROFILE, userAuth && userAuth.profile);
    commit(types.USER_AUTH.ACCESS_TOKEN, userAuth && userAuth.accessToken);
    return userAuth;
}
