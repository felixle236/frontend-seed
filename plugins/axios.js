export default function({$axios, redirect, store}) {
    $axios.onRequest(config => {
        if (store.state.userAuth && store.state.userAuth.token && store.state.userAuth.token.accessToken)
            config.headers.common.authorization = store.state.userAuth.token.accessToken;
    });
  
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code === 401)
            return redirect('/login');

        throw error.response.data;
    });
};