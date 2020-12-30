import {Middleware} from '@nuxt/types';

const middleware: Middleware = ({app, redirect}) => {
    if (!app.$auth.isAuthenticated())
        return redirect('/login');
};

export default middleware;
