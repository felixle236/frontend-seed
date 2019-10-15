import {setCookie} from '../../../helpers/dataHelper';
import types from '../../mutation-types';

export default {
    async signup({commit}, data) {
        const userAuth = await this.$axios.$post('/api/auth/signup', data);
        return storeUserAuthentication(commit, userAuth);
    },
    async signin({commit}, {email, password}) {
        commit(types.USER_AUTH.SIGNIN_MESSAGE, '');
        const userAuth = await this.$axios.$post('/api/auth/signin', {email, password}).catch(err => {
            commit(types.USER_AUTH.SIGNIN_MESSAGE, err.message);
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

    commit(types.USER_AUTH.PROFILE, userAuth && userAuth.profile);
    commit(types.USER_AUTH.ACCESS_TOKEN, userAuth && userAuth.accessToken);
    commit(types.USER_AUTH.ROLE, userAuth && userAuth.role);
    commit(types.USER_AUTH.CLAIMS, userAuth && userAuth.claims);
    return userAuth;
}
