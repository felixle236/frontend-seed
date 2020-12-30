import {Plugin} from '@nuxt/types';

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
        isAuthenticated: () => boolean,
        checkAuthentication: () => boolean,
        isRoles: (...roles: string[]) => boolean,
        checkRoles: (...roles: string[]) => boolean
    }
  }
}

const plugin: Plugin = ({store, redirect}, inject) => {
    const isAuthenticated = () => {
        return !!store.state.auth.userId;
    };
    const isRoles = (...roleIds: string[]) => {
        const roleId = store.state.auth.roleId;
        return !!(roleId && roleIds.find(id => id === roleId));
    };

    inject('auth', {
        isAuthenticated,
        checkAuthentication: () => {
            if (!isAuthenticated()) {
                redirect('/login');
                return false;
            }
            return true;
        },
        isRoles,
        checkRoles: (...roleIds: string[]) => {
            if (!isAuthenticated()) {
                redirect('/login');
                return false;
            }
            if (!isRoles(...roleIds)) {
                redirect('/');
                return false;
            }
            return true;
        }
    });
};

export default plugin;
