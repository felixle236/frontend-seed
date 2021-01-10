import { Plugin } from '@nuxt/types';
import { initializeAxios } from '~/utils/api';

const plugin: Plugin = ({ $axios, redirect, store }) => {
    $axios.onRequest(_config => {
        // Set baseURL (both client and server)
        $axios.setBaseURL(process.env.API_URL as string);

        // Change URL only for client
        if (process.client)
            $axios.setBaseURL(process.env.API_URL as string);

        // Change URL only for server
        if (process.server)
            $axios.setBaseURL(process.env.API_SSR_URL as string);

        if (store.state.auth && store.state.auth.accessToken)
            $axios.setToken(store.state.auth.accessToken, 'Bearer');
    });

    $axios.onError(error => {
        const code = error.response && error.response.status;

        if (!code || code >= 500)
            throw new Error('Sorry, something went wrong.');
        if (code === 401)
            return redirect('/login');

        throw error.response ? error.response.data : error;
    });

    initializeAxios($axios);
};

export default plugin;
