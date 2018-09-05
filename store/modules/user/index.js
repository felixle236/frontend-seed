import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        userAuth: null,
        profile: null,
        list: [],
        pagination: null,
        detail: null,
    },
    getters,
    actions,
    mutations
};
