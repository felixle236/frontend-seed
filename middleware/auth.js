export default function({store, redirect, isClient}) {
    if (!store.state.authUser)
        return redirect('/login');
};
