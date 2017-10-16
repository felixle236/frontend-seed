import UserService from '~/services/userService';

export default ({app, redirect, route, store}, inject) => {
    inject('services', {
        userService: new UserService(app.$axios)
    });
};
