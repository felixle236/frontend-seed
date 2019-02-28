import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        userAuth: null,
        profile: null,
        signinMessage: null,
        userList: [],
        userPagination: null,
        userDetail: null,
    },
    getters,
    actions,
    mutations
};
