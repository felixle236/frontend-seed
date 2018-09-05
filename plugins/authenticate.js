export default ({redirect, store}, inject) => {
    const isAuthenticated = () => {
        const userAuth = store.state.userAuth;
        return userAuth && userAuth.accessToken && userAuth.tokenExpire && new Date(userAuth.tokenExpire) >= new Date();
    };

    const isRoles = (...roles) => {
        const userAuth = store.state.userAuth;
        return userAuth && userAuth.role && roles.find(roleCode => roleCode === userAuth.role.code) ? true : false;
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
