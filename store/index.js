import Vuex from 'vuex';
import {getCookie} from '../helpers/dataHelper';
import socket from './modules/socket';
import user from './modules/user';

export default function() {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {
            nuxtServerInit({state}, {req}) {
                state.user.userAuth = null;
                if (req.headers.cookie) {
                    const userAuth = getCookie('userAuth', req.headers.cookie);
                    if (userAuth)
                        state.user.userAuth = JSON.parse(userAuth);
                }
            }
        },
        modules: {
            user,
            socket
        }
    });
};
