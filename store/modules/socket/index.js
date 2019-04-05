import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        currentRoom: null,
        contacts: [],
        messages: [],
    },
    getters,
    actions,
    mutations
};
