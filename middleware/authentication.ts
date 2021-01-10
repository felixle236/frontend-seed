import { Middleware } from '@nuxt/types';

const middleware: Middleware = ({ app, route, redirect }) => {
    if (!app.$auth.isAuthenticated())
        return redirect('/login?redirect=' + route.fullPath);
};

export default middleware;
