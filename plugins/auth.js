export default ({app, redirect, route, store}, inject) => {
    let isAuthenticated = () => {
        let userAuth = store.state.userAuth;
        if (userAuth && userAuth.user && userAuth.user.token && userAuth.user.token.tokenExpire && userAuth.permission && userAuth.accessToken) {
            let expire = new Date(userAuth.user.token.tokenExpire);
            if (expire >= new Date())
                return true;
        }
        return false;
    };

    let isRoles = (...roles) => {
        let userAuth = store.state.userAuth;
        if (userAuth && userAuth.permission && userAuth.permission.roles) {
            for (let i = 0; i < userAuth.permission.roles.length; i++) {
                let role = userAuth.permission.roles[i];
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
