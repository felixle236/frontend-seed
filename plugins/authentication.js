export default ({redirect, store}, inject) => {
    const isAuthenticated = () => {
        return !!store.state.auth.profile;
    };

    const isRoles = (...roles) => {
        const role = store.state.auth.profile.role;
        return !!(role && roles.find(roleCode => roleCode === role.code));
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
