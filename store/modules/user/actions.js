import types from '../../mutation-types';

export default {
    async findUsers({commit}, conditions) {
        if (!conditions)
            conditions = {};

        const data = await this.$axios.$get(`/api/users?keyword=${conditions.keyword || ''}&skip=${conditions.skip || ''}&limit=${conditions.limit || ''}`);
        commit(types.USER.USERS, data.results);
        commit(types.USER.PAGINATION, data.pagination);
        return data;
    },
    async getUser({commit}, id) {
        const user = await this.$axios.$get(`/api/users/${id}`);
        commit(types.USER.USER, user);
        return user;
    }
};
