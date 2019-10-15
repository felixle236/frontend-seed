export default function({$axios, redirect, store}) {
    $axios.onRequest(config => {
        if (store.state.userAuth && store.state.userAuth.accessToken)
            config.headers.common.authorization = store.state.userAuth.accessToken;
    });

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);

        if (code === 401)
            return redirect('/login');
        if (code >= 500)
            throw new Error('Sorry, something went wrong.');

        throw error.response ? error.response.data : error;
    });
};
