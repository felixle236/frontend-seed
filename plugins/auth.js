export default ({app, redirect, route, store}, inject) => {
    let isAuthenticated = () => {
        let authUser = store.state.authUser;
        if (authUser && authUser.user && authUser.user.token && authUser.user.token.tokenExpire && authUser.permission && authUser.accessToken) {
            let expire = new Date(authUser.user.token.tokenExpire);
            if (expire >= new Date())
                return true;
        }
        return false;
    };

    let isRoles = (...roles) => {
        let authUser = store.state.authUser;
        if (authUser && authUser.permission && authUser.permission.roles) {
            for (let i = 0; i < authUser.permission.roles.length; i++) {
                let role = authUser.permission.roles[i];
                if (roles.find(roleName => roleName.toLowerCase() === role.name.toLowerCase()))
                    return true;
            }
        }
        return false;
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
        checkRoles: (...roles) => {
            if (!isAuthenticated()) {
                redirect('/login');
                return false;
            }
            if (!isRoles(roles)) {
                redirect('/');
                return false;
            }
            return true;
        }
    });
};
