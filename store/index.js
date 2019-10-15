import Vuex from 'vuex';
import {getCookie} from '../helpers/dataHelper';
import message from './modules/message';
import user from './modules/user';
import userAuth from './modules/userAuth';

export default function() {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {
            nuxtServerInit({state}, {req}) {
                state.userAuth.profile = null;
                state.userAuth.accessToken = null;
                state.userAuth.role = null;
                state.userAuth.claims = null;

                if (req.headers.cookie) {
                    const userAuth = getCookie('userAuth', req.headers.cookie);
                    if (userAuth) {
                        const data = JSON.parse(userAuth);
                        state.userAuth.profile = data.profile;
                        state.userAuth.accessToken = data.accessToken;
                        state.userAuth.role = data.role;
                        state.userAuth.claims = data.claims;
                    }
                }
            }
        },
        modules: {
            user,
            userAuth,
            message
        }
    });
};
