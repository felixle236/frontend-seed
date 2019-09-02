import Vuex from 'vuex';
import user from './modules/user';
import socket from './modules/socket';
import {getCookie} from '../helpers/dataHelper';

export default function() {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {
            nuxtServerInit({state}, {req}) {
                state.user.userAuth = null;
                if (req.headers.cookie) {
                    let userAuth = getCookie('userAuth', req.headers.cookie);
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
