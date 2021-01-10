import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { authService } from '~/services/auth';
import { meService } from '~/services/me';
import { namespace as authNamespace } from '~/store/auth';
import { getCookie } from '~/utils/cookie';

export interface IRootState {}

export const state = (): IRootState => ({
});

export const getters: GetterTree<IRootState, IRootState> = {
};

export const mutationType = {
};

export const mutations: MutationTree<IRootState> = {
};

export const actions: ActionTree<IRootState, IRootState> = {
    async nuxtServerInit({ dispatch }, { req }) {
        const token = getCookie('token', req.headers.cookie);
        if (token) {
            const authResult = await authService.authenticate(token).catch(err => {
                // eslint-disable-next-line no-console
                console.error(err);
                throw err;
            });
            dispatch(`${authNamespace}/updateAuthentication`, authResult.data);

            const profileResult = await meService.getProfile().catch(err => {
                // eslint-disable-next-line no-console
                console.error(err);
                throw err;
            });
            dispatch(`${authNamespace}/updateProfile`, profileResult.data);
        }
    }
};
