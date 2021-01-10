import { Middleware } from '@nuxt/types';

const middleware: Middleware = ({ app, redirect }) => {
    if (app.$auth.isAuthenticated())
        return redirect('/');
};

export default middleware;
