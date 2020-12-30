import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {RootState} from './index';

export const namespace = 'setting';

export interface SettingState {
  darkMode: boolean
}

export const state = (): SettingState => ({
    darkMode: false
});

export const getters: GetterTree<SettingState, RootState> = {
    darkMode: state => state.darkMode,
};

export const MutationType = {
    DARK_MODE: 'dark_mode'
};

export const mutations: MutationTree<SettingState> = {
    [MutationType.DARK_MODE]: (state, mode: boolean) => {
        state.darkMode = mode;
    }
};

export const actions: ActionTree<SettingState, RootState> = {
    toggleDarkMode({commit, state}) {
        commit(MutationType.DARK_MODE, !state.darkMode);
    }
};
