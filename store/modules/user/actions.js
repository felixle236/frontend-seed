import types from '../../mutation-types';

export default {
    async findUsers({commit}, conditions) {
        if (!conditions)
            conditions = {};

        const result = await this.$axios.$get(`/api/users?keyword=${conditions.keyword || ''}&skip=${conditions.skip || ''}&limit=${conditions.limit || ''}`);
        commit(types.USER.USERS, result.data.results);
        commit(types.USER.PAGINATION, result.data.pagination);
        return result.data;
    },
    async getUser({commit}, id) {
        const result = await this.$axios.$get(`/api/users/${id}`);
        commit(types.USER.USER, result.data);
        return result.data;
    }
};
