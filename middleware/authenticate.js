export default function({store, route, redirect}) {
    const pathUrl = route.path.toLowerCase().substr(1);
    const notAuthenticationPages = ['login', 'forgot-password', 'register', 'reset'];

    if (!store.state.user.userAuth && !notAuthenticationPages.find(path => pathUrl.startsWith(path)))
        return redirect('/login');
    else if (store.state.user.userAuth && notAuthenticationPages.find(path => pathUrl.startsWith(path)))
        return redirect('/');
};
