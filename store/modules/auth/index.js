import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        profile: null,
        accessToken: null,
        signinMessage: null
    }),
    getters,
    actions,
    mutations
};
