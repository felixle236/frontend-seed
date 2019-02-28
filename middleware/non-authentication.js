export default function({app, redirect}) {
    if (app.$auth.isAuthenticated())
        return redirect('/');
};
