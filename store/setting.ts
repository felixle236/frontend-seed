import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IRootState } from '.';

export const namespace = 'setting';

export interface ISettingState {
  darkMode: boolean
}

export const state = (): ISettingState => ({
    darkMode: false
});

export const getters: GetterTree<ISettingState, IRootState> = {
    darkMode: state => state.darkMode,
};

export const mutationType = {
    DARK_MODE: 'dark_mode'
};

export const mutations: MutationTree<ISettingState> = {
    [mutationType.DARK_MODE]: (state, mode: boolean) => {
        state.darkMode = mode;
    }
};

export const actions: ActionTree<ISettingState, IRootState> = {
    toggleDarkMode({ commit, state }) {
        commit(mutationType.DARK_MODE, !state.darkMode);
    }
};
