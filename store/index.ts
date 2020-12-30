import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {namespace as actionNamespace} from '~/store/auth';
import {getCookie} from '~/utils/cookie';

export interface RootState {}

export const state = (): RootState => ({
});

export const getters: GetterTree<RootState, RootState> = {
};

export const MutationType = {
};

export const mutations: MutationTree<RootState> = {
};

export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({dispatch}, {req}) {
        const token = getCookie('token', req.headers.cookie);
        const userAuth = await dispatch(`${actionNamespace}/authenticate`, token);
        if (userAuth)
            await dispatch(`${actionNamespace}/getProfile`);
    }
};
