export default function({store, route, redirect}) {
    const pathUrl = route.path.toLowerCase().substr(1);
    const notAuthenticationPages = ['login', 'register', 'forgot-password', 'reset-password'];

    if (!store.state.user.userAuth && !notAuthenticationPages.find(path => pathUrl.startsWith(path)))
        return redirect('/login');
    else if (store.state.user.userAuth && notAuthenticationPages.find(path => pathUrl.startsWith(path)))
        return redirect('/');
};
