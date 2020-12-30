import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {RootState} from './index';

export const namespace = 'auth';

export interface UserProfile {
    id: string;
    roleId: string;
    firstName: string;
    lastName?: string;
    email: string;
    avatar?: string;
}

export interface AuthState {
    accessToken?: string;
    userId?: string;
    roleId?: string;
    profile?: UserProfile;
}

export const state = (): AuthState => ({
    accessToken: undefined,
    userId: undefined,
    roleId: undefined,
    profile: undefined
});

export const getters: GetterTree<AuthState, RootState> = {
    accessToken: state => state.accessToken,
    userId: state => state.userId,
    roleId: state => state.roleId,
    profile: state => state.profile,
};

export const MutationType = {
    ACCESS_TOKEN: 'access_token',
    USER_ID: 'user_id',
    ROLE_ID: 'role_id',
    PROFILE: 'profile'
};

export const mutations: MutationTree<AuthState> = {
    [MutationType.ACCESS_TOKEN]: (state, accessToken?: string) => {
        state.accessToken = accessToken;
    },
    [MutationType.USER_ID]: (state, userId?: string) => {
        state.userId = userId;
    },
    [MutationType.ROLE_ID]: (state, roleId?: string) => {
        state.roleId = roleId;
    },
    [MutationType.PROFILE]: (state, profile?: UserProfile) => {
        state.profile = profile;
    }
};

export const actions: ActionTree<AuthState, RootState> = {
    async authenticate({commit}, token) {
        commit(MutationType.ACCESS_TOKEN, token);
        if (token) {
            const {data} = await this.$axios.$post('/api/v1/auth', {token}).catch(err => {
                // eslint-disable-next-line no-console
                console.error(err);
                commit(MutationType.USER_ID, undefined);
                commit(MutationType.ROLE_ID, undefined);
                throw err;
            });
            commit(MutationType.USER_ID, data.userId);
            commit(MutationType.ROLE_ID, data.roleId);
            return true;
        }
        return false;
    },
    async getProfile({commit}) {
        const {data} = await this.$axios.$get('/api/v1/me').catch(err => {
            // eslint-disable-next-line no-console
            console.error(err);
            commit(MutationType.PROFILE, undefined);
            throw err;
        });
        commit(MutationType.PROFILE, data);
        return data;
    },
    clearAuthentication({commit}) {
        commit(MutationType.ACCESS_TOKEN, undefined);
        commit(MutationType.USER_ID, undefined);
        commit(MutationType.ROLE_ID, undefined);
        commit(MutationType.PROFILE, undefined);
    }
};
