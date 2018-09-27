export default function({store, route, redirect}) {
    const pathUrl = route.path.toLowerCase();
    const notAuthenticationPages = ['/login', '/forgot-password', '/register', '/reset'];

    if (!store.state.user.userAuth && !notAuthenticationPages.find(path => pathUrl.startsWith(path)))
        return redirect('/login');
    else if (notAuthenticationPages.find(path => pathUrl.startsWith(path)))
        return redirect('/');
};
