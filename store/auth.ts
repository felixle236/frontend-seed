import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IRootState } from '.';
import { setCookie } from '~/utils/cookie';

export const namespace = 'auth';

export interface IUserProfile {
    id: string;
    roleId: string;
    firstName: string;
    lastName?: string;
    email: string;
    avatar?: string;
}

export interface IAuthState {
    accessToken?: string;
    userId?: string;
    roleId?: string;
    profile?: IUserProfile;
}

export const state = (): IAuthState => ({
    accessToken: undefined,
    userId: undefined,
    roleId: undefined,
    profile: undefined
});

export const getters: GetterTree<IAuthState, IRootState> = {
    accessToken: state => state.accessToken,
    userId: state => state.userId,
    roleId: state => state.roleId,
    profile: state => state.profile,
};

export const mutationType = {
    ACCESS_TOKEN: 'access_token',
    USER_ID: 'user_id',
    ROLE_ID: 'role_id',
    PROFILE: 'profile'
};

export const mutations: MutationTree<IAuthState> = {
    [mutationType.ACCESS_TOKEN]: (state, accessToken?: string) => {
        state.accessToken = accessToken;
    },
    [mutationType.USER_ID]: (state, userId?: string) => {
        state.userId = userId;
    },
    [mutationType.ROLE_ID]: (state, roleId?: string) => {
        state.roleId = roleId;
    },
    [mutationType.PROFILE]: (state, profile?: IUserProfile) => {
        state.profile = profile;
    }
};

export const actions: ActionTree<IAuthState, IRootState> = {
    updateProfile({ commit }, profile: IUserProfile) {
        commit(mutationType.PROFILE, profile);
    },
    updateAuthentication({ commit }, userAuth: {token: string, userId: string, roleId: string}) {
        commit(mutationType.ACCESS_TOKEN, userAuth.token);
        commit(mutationType.USER_ID, userAuth.userId);
        commit(mutationType.ROLE_ID, userAuth.roleId);

        if (process.client)
            setCookie('token', userAuth.token, 24 * 60 * 60);
    },
    clearAuthentication({ commit }) {
        commit(mutationType.ACCESS_TOKEN, undefined);
        commit(mutationType.USER_ID, undefined);
        commit(mutationType.ROLE_ID, undefined);
        commit(mutationType.PROFILE, undefined);

        if (process.client)
            setCookie('token', '', -1);
    }
};
