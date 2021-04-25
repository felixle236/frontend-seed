import { Plugin } from '@nuxt/types';
import { initializeAxios } from '~/utils/api';

const plugin: Plugin = ({ $axios, redirect, store }) => {
    $axios.onRequest(config => {
        if (store.state.auth && store.state.auth.accessToken)
            config.headers.common.authorization = 'Bearer ' + store.state.auth.accessToken;
    });

    $axios.onError(error => {
        const code = error.response && error.response.status;

        if (!code || code >= 500) {
            // eslint-disable-next-line no-console
            console.error(error);
            throw new Error('Sorry, something went wrong.');
        }
        if (code === 401)
            return redirect('/login');

        throw error.response ? error.response.data : error;
    });

    initializeAxios($axios);
};

export default plugin;
