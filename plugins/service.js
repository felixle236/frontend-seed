import axios from 'axios';
import UserService from '~/services/userService';

const axiosInstance = axios.create({
    baseURL: process.env.apiBase,
    timeout: 8000
});

export default ({app, redirect, route, store}, inject) => {
    let axios = initAxiosMethods(axiosInstance);

    inject('services', {
        userService: new UserService(axios)
    });

    function setToken(option) {
        if (!option)
            option = {};
        if (!option.headers)
            option.headers = {};
        if (!option.headers.Authorization && !option.headers.authorization && store.state.userAuth && store.state.userAuth.token && store.state.userAuth.token.accessToken)
            option.headers.Authorization = store.state.userAuth.token.accessToken;

        return option;
    }

    function handleError(err) {
        if (err.response && err.response.status === 401) {
            store.commit('SET_USER_AUTH', null);
            return redirect('/login');
        }
        if (err.response && err.response.data && err.response.data.error)
            err = err.response.data.error;

        return {error: err};
    }

    function initAxiosMethods(axiosInstance) {
        return {
            get: (url, option) => {
                return new Promise((resolve, reject) => {
                    option = setToken(option);
                    axiosInstance.get(url, option).then(({data}) => resolve(data)).catch(err => resolve(handleError(err)));
                });
            },
            post: (url, data, option) => {
                return new Promise((resolve, reject) => {
                    option = setToken(option);
                    axiosInstance.post(url, data, option).then(({data}) => resolve(data)).catch(err => resolve(handleError(err)));
                });
            },
            put: (url, data, option) => {
                return new Promise((resolve, reject) => {
                    option = setToken(option);
                    axiosInstance.put(url, data, option).then(({data}) => resolve(data)).catch(err => resolve(handleError(err)));
                });
            },
            patch: (url, data, option) => {
                return new Promise((resolve, reject) => {
                    option = setToken(option);
                    axiosInstance.patch(url, data, option).then(({data}) => resolve(data)).catch(err => resolve(handleError(err)));
                });
            },
            delete: (url, option) => {
                return new Promise((resolve, reject) => {
                    option = setToken(option);
                    axiosInstance.delete(url, option).then(({data}) => resolve(data)).catch(err => resolve(handleError(err)));
                });
            }
        };
    }
};
