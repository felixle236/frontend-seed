import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.apiBase,
    timeout: 2000
});

function handleError(err) {
    if (err.response && err.response.data && err.response.data.error)
        return {error: err.response.data.error};
    return {error: err};
}

export default ({app, redirect, route, store}, inject) => {
    let setToken = (option) => {
        if (!option)
            option = {};
        if (!option.headers)
            option.headers = {};
        if (!option.headers.Authorization && !option.headers.authorization)
            option.headers.Authorization = store.state.authUser && store.state.authUser.accessToken;

        return option;
    };

    inject('axios', {
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
    });
};
